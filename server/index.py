
import os
import json

from flask import Flask, render_template
from flask_socketio import SocketIO, send, emit

# Custom settings
import settings

# Custom modules
from modules import gimbal
from modules import hexapod
from modules import joystick
from modules import speech
from modules import toggle

from modules import utility

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, logger = False)

@socketio.on('client_log')
def handle_message(message):
    print('client message: ' + message)

@socketio.on('client_connected')
def handle_client_connected(json):
    print('client_connected: ' + str(json))

    utility.loadAndSendContent('resources/speech/lines.json', 'loadSpeech')
    utility.loadAndSendFiles('resources/audio/', 'loadAudio')

@socketio.on('shoutdown')
def handle_shoutdown(message):
    print('Init shoutdown: ' + message)
    os.system('sudo shutdown -r now')

@socketio.on('reboot')
def handle_reboot(message):
    print('Init reboot: ' + message)
    os.system('sudo reboot -r now')

socketio.on_event('toggle', toggle.handle_toggle_change, namespace='/')

socketio.on_event('playSpeech', speech.handle_text_to_speech, namespace='/')
socketio.on_event('playAudio', speech.handle_play_audio, namespace='/')

socketio.on_event('playJoystick', joystick.handle_play_joystick, namespace='/')
socketio.on_event('playButton', joystick.handle_play_button, namespace='/')


socketio.on_event('playGimbal', gimbal.handle_play_gimbal, namespace='/')

if __name__ == '__main__':

    # Init settings
    settings.init()

    socketio.run(app)
