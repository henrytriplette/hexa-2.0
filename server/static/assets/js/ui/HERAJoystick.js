export class HERAJoystick {

    /**
     * Constructor
     * @param {*} clientTranslator
     */
    constructor(socket) {

      this.socket = socket;

      this.timeline = new TimelineMax({
        repeat:-1,
        repeatDelay: 0.25,
        onRepeat:function() {
          // console.log('playJoystick', window.controllerAxis);
          socket.emit('playJoystick', JSON.stringify(window.controllerAxis));
        }
      }).pause();

      window.controllerAxis = {
        left: {
          'x': 128,
          'y': 128,
          'xTrim': 0,
          'yTrim': 0,
          'xMax': 256,
          'xMin': 0,
          'yMax': 256,
          'yMin': 0
        },
        right: {
          'x': 128,
          'y': 128,
          'xTrim': 0,
          'yTrim': 0,
          'xMax': 256,
          'xMin': 0,
          'yMax': 256,
          'yMin': 0
        }
      }

      this.leftController = nipplejs.create({
          zone: document.getElementById('leftJoystick'),
          mode: 'static',
          position: {left: '50%', top: '50%'},
          size: 256,
          catchDistance: 150,
          color: 'white',
          restJoystick: true,
          // lockY: true
      });

      this.rightController = nipplejs.create({
          zone: document.getElementById('rightJoystick'),
          mode: 'static',
          position: {left: '50%', top: '50%'},
          size: 256,
          catchDistance: 150,
          color: 'white',
          restJoystick: true,
          // lockX: true
      });

      this.bindNipples(this);

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
        this.socket.emit('playButton', JSON.stringify({ button: socketToEmit }));
      }
    }

    bindNipples (input) {

      this.leftController
      .on('move start end', function(event, data, parent) {

        if(event.type === "move") {
          var force = 100; // 0.08 * data.force; // Just disable the force parameter

          var x = (parseFloat(Math.cos(data.angle.radian) * force) + window.controllerAxis.left.xTrim).toFixed(1);
          var y = (parseFloat(Math.sin(data.angle.radian) * force) + window.controllerAxis.left.yTrim).toFixed(1);

          window.controllerAxis.left.x = (convertRange( x, [ -100, 100 ], [ 0, 256 ] )).toFixed();
          window.controllerAxis.left.y = (convertRange( y, [ -100, 100 ], [ 0, 256 ] )).toFixed();

          // Display values
          jQuery('#leftValueX').html(window.controllerAxis.left.x);
          jQuery('#leftValueY').html(window.controllerAxis.left.y);

        } else if(event.type === "start") {
          // pressed = true;
          input.timeline.play();

        } else if(event.type === "end") {

          TweenMax.to(window.controllerAxis.left, 1.5, {

            x: 128,
            y: 128,

            onUpdate:function() {
              // Display values
              jQuery('#leftValueX').html(window.controllerAxis.left.x);
              jQuery('#leftValueY').html(window.controllerAxis.left.y);
            },

            onComplete:function() {
              input.timeline.pause();
            }
          });

        }
      })

      this.rightController
      .on('move start end', function(event, data, parent) {

        if(event.type === "move") {
          var force = 100; // 0.08 * data.force; // Just disable the force parameter

          var x = (parseFloat(Math.cos(data.angle.radian) * force) + window.controllerAxis.right.xTrim).toFixed(1);
          var y = (parseFloat(Math.sin(data.angle.radian) * force) + window.controllerAxis.right.yTrim).toFixed(1);

          window.controllerAxis.right.x = (convertRange( x, [ -100, 100 ], [ 0, 256 ] )).toFixed(0);
          window.controllerAxis.right.y = (convertRange( y, [ -100, 100 ], [ 0, 256 ] )).toFixed(0);

          // Display values
          jQuery('#rightValueX').html(window.controllerAxis.right.x);
          jQuery('#rightValueY').html(window.controllerAxis.right.y);

        } else if(event.type === "start") {
          // pressed = true;
          input.timeline.play();
        } else if(event.type === "end") {

          TweenMax.to(window.controllerAxis.right, 1.5, {

            x: 128,
            y: 128,

            onUpdate:function() {
              // Display values
              jQuery('#rightValueX').html(window.controllerAxis.right.x); // .toFixed());
              jQuery('#rightValueY').html(window.controllerAxis.right.y); // .toFixed());
            },

            onComplete:function() {
              input.timeline.pause();
            }
          });

        }
      })

    }


}
