export class HERAToggle {

    /**
     * Constructor
     * @param {*} clientTranslator
     */
    constructor(socket) {

      this.socket = socket


      this.bindToggleButtons(this);

    }

    bindToggleButtons(input) {
      jQuery(".toggleRelayButton").each(function(index, element) {

          jQuery(element).on( "change", function() {

            var data = jQuery(this).data('relay');
            if (data) {
              input.sendToggleController(data, this.checked)
            }

          });
      });
    }

    sendToggleController(data, checked) {
      jQuery('#serverOutput').append('<span class="blue">' + data + ':' + checked + '</span>')
      this.socket.emit('toggle', JSON.stringify({ element: data, value: checked}));
    }

}
