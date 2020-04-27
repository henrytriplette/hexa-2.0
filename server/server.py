#!/usr/bin/env python
import os
import json

from threading import Lock
from flask import Flask, render_template, session, request, \
    copy_current_request_context
from flask_socketio import SocketIO, emit, join_room, leave_room, \
    close_room, rooms, disconnect

# Custom settings
import settings

# Custom modules
from modules import gimbal
from modules import toggle
from modules import hexapod
from modules import joystick
from modules import speech
from modules import utility

# Set this variable to "threading", "eventlet" or "gevent" to test the
# different async modes, or leave it set to None for the application to choose
# the best option based on installed packages.
async_mode = None

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, async_mode=async_mode)

host = '0.0.0.0'

thread = None
thread_lock = Lock()

@app.route('/')
def index():
    return render_template('home.html', async_mode=socketio.async_mode)

@socketio.on('client_log', namespace='/hera')
def handle_message(message):
    print('client message: ' + message)

@socketio.on('client_connected', namespace='/hera')
def handle_client_connected(json):
    print('client_connected: ' + str(json))

    utility.loadAndSendContent(os.path.dirname(__file__) + '/resources/speech/lines.json', 'loadSpeech')
    utility.loadAndSendFiles(os.path.dirname(__file__) + '/resources/audio/', 'loadAudio')

@socketio.on('shoutdown', namespace='/hera')
def handle_shoutdown(message):
    print('Init shoutdown: ' + message)
    os.system('sudo shutdown -r now')

@socketio.on('reboot', namespace='/hera')
def handle_reboot(message):
    print('Init reboot: ' + message)
    os.system('sudo reboot -r now')


socketio.on_event('camStart', hexapod.handle_camera_start, namespace='/hera')

socketio.on_event('toggle', toggle.handle_toggle_change, namespace='/hera')

socketio.on_event('playSpeech', speech.handle_text_to_speech, namespace='/hera')
socketio.on_event('playAudio', speech.handle_play_audio, namespace='/hera')

socketio.on_event('playJoystick', joystick.handle_play_joystick, namespace='/hera')
socketio.on_event('playButton', joystick.handle_play_button, namespace='/hera')

socketio.on_event('playGimbal', gimbal.handle_play_gimbal, namespace='/hera')
socketio.on_event('recalibrateGimbal', gimbal.handle_recalibrate_gimbal, namespace='/hera')

if __name__ == '__main__':

    # Init settings
    settings.init()

    # Init and reserve Relais Pins [GPIO]
    toggle.init_toggle()

    # Init and reserve Gimbal Pins [PWM]
    gimbal.init_gimbal()

    # Init and reserve Joystik Pins [I2C]
    joystick.init_joystick()

    socketio.run(app, host, debug=False)
