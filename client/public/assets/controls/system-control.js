
// Handle video start
function handleStartVideo() {
		socket.emit('video', 1);

		host = window.location.hostname;
		img = 'http://' + host + ':9000/?action=stream';
		jQuery('#livecam').attr('src',img)

		img_2 = 'http://' + host + ':9001/?action=stream';
		jQuery('#livecam_2').attr('src',img)
}

// Handle Reboot
function handleReboot() {
    if(confirm("This will reboot the Pi.\nAre you sure?")){
		alert('Rebooting now...\nPlease wait 20s before trying to reconnect.');
		socket.emit('reboot', 1);
	}
}

// Handle Shoutdown
function handlePowerOff() {
    if(confirm("This will shutdown the Pi.\nAre you sure?")){
		alert('Shutting down...\nPlease wait 20s before turning the power off.');
		socket.emit('power', 1);
	}
}

// Handle gallery
function handleGallery() {
	fetch('/gallery')
    .then(function(response) {
      return response.json()
    })
    .then(function(responseJson) {
			var picsJson = responseJson
			var htmlGallery = '';
			if (picsJson.length > 0) {
				for (var i = 0; i < picsJson.length; i++) {
					var url = picsJson[i];
					htmlGallery += '<a href="photo/' + picsJson[i] + '"><img src="photo/' + picsJson[i] + '" /></a>'
				}
				jQuery('#lightgallery').html(htmlGallery).lightGallery()
			} else {
				jQuery('#lightgallery').html('')
			}
    })

}

function galleryClear() {
	if(confirm("This will delete all the photos.\nAre you sure?")){
		socket.emit('galleryclear', 1);
		jQuery('#lightgallery').html('')
	}
}
