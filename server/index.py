from flask import Flask, render_template
from flask_socketio import SocketIO, send, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@socketio.on('client_log')
def handle_message(message):
    print('client message: ' + message)

@socketio.on('client_connected')
def handle_client_connected(json):
    print('client_connected: ' + str(json))
    emit('server_connected', '{ "server_connected": true }')
    emit('server_log', 'server_connected: true')

if __name__ == '__main__':
    socketio.run(app)
