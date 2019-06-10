export class HERAJoystick {

    /**
     * Constructor
     * @param {*} clientTranslator
     */
    constructor(socket) {

      this.socket = socket

      this.leftController = nipplejs.create({
          zone: document.getElementById('leftJoystick'),
          mode: 'semi',
          size: 256,
          catchDistance: 150,
          color: 'white',
          restJoystick: true,
          // lockY: true
      });

      this.rightController = nipplejs.create({
          zone: document.getElementById('rightJoystick'),
          mode: 'semi',
          size: 256,
          catchDistance: 150,
          color: 'white',
          restJoystick: true,
          // lockX: true
      });

      this.bindNipples();

      this.bindButtons(this);

    }

    bindButtons(input) {
      jQuery(".socketEmitButton").each(function(index, element) {
          jQuery(element).on( "click", function() {
            input.socketEmitButton(jQuery(element));
          });
      });
    }

    socketEmitButton (buttonElement) {
      var socketToEmit = jQuery(buttonElement).data('socket');
      if (socketToEmit != null) {
        jQuery('#serverOutput').append('<span class="yellow">' + socketToEmit + ':' + socketToEmit + '</span>')
      }
    }

    bindNipples () {

      this.leftController
        .on('start end', function(evt, data) {

          console.log('-- end left --');
          console.log('data', data);

      })
      .on('move', function(evt, data) {

        if(data && data.direction && data.direction.angle) {
          console.log('data', data);
        }

      })
      .on('dir:up plain:up dir:left plain:left dir:down plain:down dir:right plain:right', function(evt, data) {
        console.log('dir', data);
      })

      .on('pressure', function(evt, data) {
        console.log('pressure', data);
      });

      this.rightController
        .on('start end', function(evt, data) {

          console.log('-- end right --');
          console.log('data', data);

      })
      .on('move', function(evt, data) {

        if(data && data.direction && data.direction.angle) {
          console.log('data', data);
        }

      })
      .on('dir:up plain:up dir:left plain:left dir:down plain:down dir:right plain:right', function(evt, data) {
        console.log('dir', data);
      })

      .on('pressure', function(evt, data) {
        console.log('pressure', data);
      });

    }


}
