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
        'y': 0,
        'xTrim': 0,
        'yTrim': 0,
        'xMax': 100,
        'xMin': -100,
        'yMax': 100,
        'yMin': -100
      }

      if (document.getElementById('gimbalTrimX') != null ) {
          document.getElementById('gimbalTrimX').addEventListener('change',  this.trimGimbalX.bind(this));
      }

      if (document.getElementById('gimbalTrimY') != null ) {
          document.getElementById('gimbalTrimY').addEventListener('change',  this.trimGimbalY.bind(this));
      }

      if (document.getElementById('gimbalTrimReset') != null ) {
          document.getElementById('gimbalTrimReset').addEventListener('click',  this.gimbalTrimReset.bind(this));
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
      // console.log('destroyGimbalController');
      this.gimbalController.destroy();
    }

    createGimbalController() {
      // console.log('createGimbalController');

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
            var force = 100; // 0.08 * data.force; // Just disable the force parameter

            var x = (parseFloat(Math.cos(data.angle.radian) * force) + window.gimbalAxis.xTrim).toFixed(1);
            var y = (parseFloat(Math.sin(data.angle.radian) * force) + window.gimbalAxis.yTrim).toFixed(1);

            // Avoid exeeding max and min value on axis
            if (window.gimbalAxis.xMin < x && x < window.gimbalAxis.xMax) {
              window.gimbalAxis.x = x;
            } else {
              if (x > 0) {
                window.gimbalAxis.x = window.gimbalAxis.xMax
              } else {
                window.gimbalAxis.x = window.gimbalAxis.xMin
              }
            }

            if (window.gimbalAxis.yMin < y && y < window.gimbalAxis.yMax) {
              window.gimbalAxis.y = y;
            } else {
              if (y > 0) {
                window.gimbalAxis.y = window.gimbalAxis.yMax
              } else {
                window.gimbalAxis.y = window.gimbalAxis.yMin
              }
            }

            // Display values
            jQuery('#gimbalValueX').html((parseFloat(Math.cos(data.angle.radian) * force)).toFixed(1));
            jQuery('#gimbalValueY').html((parseFloat(Math.sin(data.angle.radian) * force)).toFixed(1));

            let displayValueX = (convertRange( window.gimbalAxis.x, [ -100, 100 ], [ 0, 100 ] )).toFixed(1);
            jQuery('#gimbalXdisplay progress').val(displayValueX)
            jQuery('#gimbalXdisplay small').html('(' + window.gimbalAxis.x + ')')

            let displayValueY = (convertRange( window.gimbalAxis.y, [ -100, 100 ], [ 0, 100 ] )).toFixed(1);
            jQuery('#gimbalYdisplay progress').val(displayValueY)
            jQuery('#gimbalYdisplay small').html('(' + window.gimbalAxis.y + ')')


          } else if(event.type === "start") {
            // pressed = true;

          } else if(event.type === "end") {
            // pressed = false;

            jQuery('#gimbalValueX').html("0.0")
            jQuery('#gimbalValueY').html("0.0")

            TweenMax.to(window.gimbalAxis, 5, {

              x: window.gimbalAxis.xTrim,
              y: window.gimbalAxis.yTrim,

              onUpdate:function() {

                let displayValueX = (convertRange( window.gimbalAxis.x, [ -100, 100 ], [ 0, 100 ] )).toFixed(1);
                jQuery('#gimbalXdisplay progress').val(displayValueX)
                jQuery('#gimbalXdisplay small').html('(' + (window.gimbalAxis.x).toFixed(1) + ')')

                let displayValueY = (convertRange( window.gimbalAxis.y, [ -100, 100 ], [ 0, 100 ] )).toFixed(1);
                jQuery('#gimbalYdisplay progress').val(displayValueY)
                jQuery('#gimbalYdisplay small').html('(' + (window.gimbalAxis.y).toFixed(1) + ')')

              }
            });

          }
        })

    }

    trimGimbalX () {
      window.gimbalAxis.xTrim = parseFloat(jQuery('#gimbalTrimX').val())

      jQuery('#gimbalTrimXdisplay small').html('(' + window.gimbalAxis.xTrim + ')')

      let displayValue = convertRange( window.gimbalAxis.xTrim, [ -100, 100 ], [ 0, 100 ] );
      jQuery('#gimbalTrimXdisplay progress').val(displayValue)
    }

    trimGimbalY () {
      window.gimbalAxis.yTrim = parseFloat(jQuery('#gimbalTrimY').val())

      jQuery('#gimbalTrimYdisplay small').html('(' + window.gimbalAxis.yTrim + ')')

      let displayValue = convertRange( window.gimbalAxis.yTrim, [ -100, 100 ], [ 0, 100 ] );
      jQuery('#gimbalTrimYdisplay progress').val(displayValue)
    }


    gimbalTrimReset () {

      window.gimbalAxis.xTrim = 0;
      window.gimbalAxis.yTrim = 0;

      jQuery('#gimbalTrimX').val(0).change()
      jQuery('#gimbalTrimY').val(0).change()

      jQuery('#gimbalTrimXdisplay small').html('(0)')
      jQuery('#gimbalTrimXdisplay progress').val('50')

      jQuery('#gimbalTrimYdisplay small').html('(0)')
      jQuery('#gimbalTrimYdisplay progress').val('50')

    }

}
