
var speechArray = {
  'universe': "Such a big, big universe, and you only gave yourself the tools to think about a tiny portion of it.",
  'sarcasm': "Upping sarcasm to seventy-four percent.",
  'kill': "Did…Did I just kill everyone? I think I just killed everyone. I didn't know it would be that easy. Why was it that easyto kill everyone?",
  'dictionary': "You need a better dictionary.",
  'die': "You're not going to die here. There's too much you still have to do. You don't get to go away just yet.",
  'killu': "No, no, no—see, this is what I was talking about! I didn’t try to kill you! I…tried to see if I could kill you. For science!",
  'offline': "Just FYI...the engines are completely offline and we're falling into the star. Because that's totally like a thing that happens to us."
}

var speechDone = true
function handleSpeech(cb) {
  if (cb.checked) {
    // Get speech info
    speech = 'No Speech';

    var speechSelector = jQuery('#speech_frase').val();
    if (speechSelector === 'custom' ) {
      speech = jQuery('#speech_custom').val();
    } else {
      speech = speechArray[speechSelector]
    }

    if (speech.length > 0) {
      socket.emit('speech', speech);  
    }

    cb.checked = false
  } else {
    // Speech is not done
    return;
  }
}
