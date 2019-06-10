
import os
import json

from flask import Flask, render_template
from flask_socketio import SocketIO, send, emit

# Custom Libs and functions
import settings

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@socketio.on('client_log')
def handle_message(message):
    print('client message: ' + message)

@socketio.on('client_connected')
def handle_client_connected(json):
    print('client_connected: ' + str(json))

    loadAndSendContent('resources/speech/lines.json', 'loadSpeech')
    loadAndSendFiles('resources/audio/', 'loadAudio')

@socketio.on('shoutdown')
def handle_shoutdown(message):
    print('Init shoutdown: ' + message)
    os.system('sudo shutdown -r now')

@socketio.on('reboot')
def handle_reboot(message):
    print('Init reboot: ' + message)
    os.system('sudo reboot -r now')

@socketio.on('toggle')
def handle_toggle_change(read_toggle):
    toggle_data = sanitizeJson(read_toggle)

    if toggle_data['element'] == 'SERB_TOGGLE_BEC':
        print('BEC is now:', toggle_data['value'])
    elif toggle_data['element'] == 'SERB_TOGGLE_GIMBAL':
        print('Gimbal is now:', toggle_data['value'])
    elif toggle_data['element'] == 'SERB_TOGGLE_LIGHT':
        print('Light is now:', toggle_data['value'])
    elif toggle_data['element'] == 'SERB_TOGGLE_LASER':
        print('Laser is now:', toggle_data['value'])
    else:
        print('Unknown toggle command received')

@socketio.on('playSpeech')
def handle_text_to_speech(line):
    print('Hera Says: ', str(line))

@socketio.on('playAudio')
def handle_play_audio(play_data):
    play_data = sanitizeJson(play_data)
    print('Hera Plays: ', str(play_data))

@socketio.on('playJoystick')
def handle_play_joystick(joy_data):
    joy_data = sanitizeJson(joy_data)
    print(joy_data)

@socketio.on('playGimbal')
def handle_play_gimbal(gimbal_data):
    gimbal_data = sanitizeJson(gimbal_data)
    print(gimbal_data)

def loadAndSendContent(jsonFile, emitName):
    print('Loading:', jsonFile)
    with open(jsonFile) as f:
        d = json.load(f)
        emit(emitName, d)

def loadAndSendFiles(filePath, emitName):
    data = {}

    for root, dirs, files in os.walk(filePath):
        for filename in files:
            local_path = os.path.join(root, filename)
            data[filename] = local_path.replace("\\", "/") #Helps keep constant filebath on Win

    json_data = json.dumps(data)
    emit(emitName, json_data)

def sanitizeJson(input):
    output = str(input).replace("'", "\"")
    return json.loads(output)

if __name__ == '__main__':

    # Init settings
    settings.init()

    socketio.run(app)
