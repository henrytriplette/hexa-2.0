export class HERAui {

    /**
     * Constructor
     * @param {*} clientTranslator
     */
    constructor(socket) {

      this.socket = socket

      // Connect
      socket.on('connect', () => {
          socket.emit('client_connected', JSON.stringify({ client_connected: true }));
          UIkit.notification({message: 'Connected with server', pos: 'top-right', status: 'success'})
          jQuery('#serverOutput').append('<span class="green">Connected with server</span>')
      });

      // Disconnect
      socket.on('disconnect', () => {
        UIkit.notification({message: 'Connection Lost. Attempting to reconnect', pos: 'top-right', status: 'danger'})
        jQuery('#serverOutput').append('<span class="red">Connection Lost. Attempting to reconnect</span>')

        socket.open();
      });

      // Server is up and running
      socket.on('server_connected', (msg) => {
        console.log(JSON.parse(msg));
      });

      // Server is up and running
      socket.on('server_log', (msg) => {
        jQuery('#serverOutput').append('<span class="gray">' + msg + '</span>')
      });

      if (document.getElementById('button-ui-shoutdown') != null ) {
          document.getElementById('button-ui-shoutdown').addEventListener('click',  this.uiShoutdown.bind(this));
      }

      if (document.getElementById('button-ui-reboot') != null ) {
          document.getElementById('button-ui-reboot').addEventListener('click',  this.uiReboot.bind(this));
      }

    }

    uiShoutdown () {
      UIkit.notification({message: 'Shutting down...\nPlease wait 20s before turning the power off.', status: 'warning'})
      jQuery('#serverOutput').append('<span class="red">' + msg + '</span>')
      this.socket.emit('shoutdown', '{ shoutdown: true }');
    }

    uiReboot () {
      UIkit.notification({message: 'Rebooting now...\nPlease wait 20s before trying to reconnect.', status: 'warning'})
      jQuery('#serverOutput').append('<span class="red">' + msg + '</span>')
      this.socket.emit('reboot', '{ reboot: true }');
    }

}
