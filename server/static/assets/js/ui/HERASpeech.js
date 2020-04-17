export class HERASpeech {

    /**
     * Constructor
     * @param {*} clientTranslator
     */
    constructor(socket) {

      this.socket = socket

      this.audioFileList = [];
      this.audioFilefilteredList = [];
      this.audioFilemaxDisplayLimit = 25;

      // Load Text2Speech defaults
      socket.on('loadSpeech', (speechList) => {

        if(speechList) {
          for (var speechLine in speechList) {
            if (speechList.hasOwnProperty(speechLine)) {

              var $option = $('<option>');
              $option
                .val(speechLine)
                .text(speechList[speechLine]);
              jQuery('#speechText2SpeechDefaults').append($option);
            }
          }
        }
      });

      if (document.getElementById('speechText2SpeechLine') != null ) {
          document.getElementById('speechText2SpeechLine').addEventListener('click',  this.uiSpeechLine.bind(this));
      }

      socket.on('loadAudio', (audioList) => {
        var audioListJson = JSON.parse(audioList)

        for (var audioFile in audioListJson) {
          if (audioListJson.hasOwnProperty(audioFile)) {
            var item = {
              name: audioFile,
              path: audioListJson[audioFile],
              category: 'audio'
            };
            this.audioFileList.push(item);
          }
        }

        this.getFilteredItems();
      });

      if (document.getElementById('speechAudioFileListSearch') != null ) {
          document.getElementById('speechAudioFileListSearch').addEventListener('keyup',  this.getFilteredItems.bind(this));
      }

    }

    getFilteredItems() {
      this.audioFilefilteredList = this.audioFileList.filter(this.textMatch);
      this.generateList(this);
    }

    textMatch(item) {
      var searchTerm = jQuery('#speechAudioFileListSearch').val().toLowerCase(),
          itemText = (item.name + item.path + item.category).toLowerCase();
      return itemText.indexOf(searchTerm) !== -1;
    }

    generateList(input) {
      var frag = document.createDocumentFragment();
      for (var i = 0; i < this.audioFilefilteredList.length; i++) {
        if (i < this.audioFilemaxDisplayLimit) {
          var item = this.audioFilefilteredList[i],
              li = this.generateListItem(item);
          frag.appendChild(li);
        }
        else break;
      }

      jQuery('.speechAudioFile').off();

      jQuery('#speechAudioFileList').html('').append(frag);

      jQuery(".speechAudioFile").each(function(index, element) {
          jQuery(element).on( "click", function(evt) {
            evt.preventDefault();
            var filepath = jQuery(this).data('filepath');
            var filename = jQuery(this).data('filename');
            if (filepath && filename) {
              input.sendPlayAudio(filepath, filename)
            }
          });
      });
      // generateCountMessage();
    }

    sendPlayAudio(filepath, filename) {
      jQuery('#serverOutput').append('<span class="blue"> Play:' + filename + '</span>')
      this.socket.emit('playAudio', JSON.stringify({ filepath: filepath, filename: filename}));
    }

    generateListItem(item) {
        var li = document.createElement('li');

        jQuery(li).append('<div class="uk-card-header">' +
					'<div class="uk-grid-small uk-flex uk-flex-middle uk-grid" data-uk-grid="">' +
						'<div class="uk-width-expand uk-first-column">' +
							'<h5 class="uk-margin-remove-bottom">'+item.name+'</h5>' +
							'<p class="uk-text-meta uk-margin-remove uk-text-small uk-text-muted">'+item.path+'</p>' +
						'</div>' +
						'<div class="uk-width-auto">' +
							'<div class="uk-inline">' +
								'<a href="#" class="speechAudioFile" data-filepath="'+item.path+'" data-filename="'+item.name+'"><i class="fas fa-volume-up"></i></a>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>');

      return li;
    }


    uiSpeechLine () {
      var line = jQuery( "#speechText2SpeechDefaults option:selected" ).text();
      if (line == 'Custom') {
        line = jQuery('#speechText2SpeechTextarea').val()
      }

      jQuery('#serverOutput').append('<span class="blue">Hera Says: ' + line + '</span>');
      this.socket.emit('playSpeech', line );
    }

}
