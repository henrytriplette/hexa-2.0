export class HERAui {

    /**
     * Constructor
     * @param {*} clientTranslator
     */
    constructor(socket) {

      // Connect
      socket.on('connect', () => {
          socket.emit('client_connected', { client_connected: true });
      });

      // Disconnect
      socket.on('disconnect', () => {
        console.log('Lost connection to the server');
        socket.open();
      });

      // Server is up and running
      socket.on('server_connected', (msg) => {
        console.log(JSON.parse(msg));
      });

      // Server is up and running
      socket.on('server_log', (msg) => {
        jQuery('#serverOutput').append('<span>' + msg + '</span>')
      });

    }

}
