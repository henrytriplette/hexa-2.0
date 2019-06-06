export class HERAGimbal {

    /**
     * Constructor
     * @param {*} clientTranslator
     */
    constructor(socket) {

      this.socket = socket
      this.gimbalContainerVisibility = false;
      this.gimbalController = false;

      window.gimbalAxis = {
        'x': 0,
        'y': 0
      }

      this.bindGimbalButtons(this);
    }

    bindGimbalButtons(input) {
      jQuery(".gimbalDisplayButton").each(function(index, element) {

          jQuery(element).on( "click", function() {

            input.gimbalContainerVisibility = !input.gimbalContainerVisibility;

            if (input.gimbalContainerVisibility == true) {
              jQuery('#controls-gimbal-content').removeClass('uk-hidden');
              input.createGimbalController()
            } else {
              jQuery('#controls-gimbal-content').addClass('uk-hidden');
              input.destroyGimbalController()
            }
          });
      });
    }

    destroyGimbalController() {
      console.log('destroyGimbalController');
      this.gimbalController.destroy();
    }

    createGimbalController() {
      console.log('createGimbalController');

      this.gimbalController = nipplejs.create({
          zone: document.getElementById('gimbalJoystick'),
          mode: 'static',
          position: {left: '50%', top: '50%'},
          size: 256,
          catchDistance: 150,
          color: 'white',
          restJoystick: true,
          // lockY: true
      });

      this.bindGimbalNipple();
    }

    bindGimbalNipple() {

      this.gimbalController
        .on('move start end', function(event, data, parent) {

          if(event.type === "move") {
            var force = 0.08 * data.force;

            window.gimbalAxis.x += Math.cos(data.angle.radian) * force;
            window.gimbalAxis.y += Math.sin(data.angle.radian) * force;

            // window.gimbalAxis.x = convertRange( x, [ -1, 1 ], [ -100, 100 ] );
            // window.gimbalAxis.y = convertRange( y, [ -1, 1 ], [ -100, 100 ] );

            console.log('window.gimbalAxis.x', window.gimbalAxis.x);
            console.log('window.gimbalAxis.y', window.gimbalAxis.y);

          } else if(event.type === "start") {
            // pressed = true;

          } else if(event.type === "end") {
            // pressed = false;

          }
        })

    }

}
