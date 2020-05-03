function get (el) {
	if (typeof el == 'string') {
		return document.getElementById(el);
	}
	return el;
}

var lastvalX;
var lastvalY;
var lastvalZ;

setInterval(function(){
	var posX = get('sliderX').value * -1;
	if (lastvalX !== posX) {
		lastvalX = posX;
		get('liveX').value = posX;
		fetch('/gimbal?pos=' + posX + '&axis=' + 'X').then(res => {});
	}

  var posY = get('sliderY').value * -1;
	if (lastvalY !== posY) {
		lastvalY = posY;
		get('liveY').value = posY;
		fetch('/gimbal?pos=' + posY + '&axis=' + 'Y').then(res => {});
	}

},200);

// Handle laser
var hLaser = false
function handleLaserClick(cb) {
  if (cb.checked) {
		// Turn on laser
		hLaser = 1;
  } else {
		// Turn off laser
		hLaser = 0;
  }
  socket.emit('laser', hLaser);
}

var hLight = false
function handleLightClick(cb) {
  if (cb.checked) {
		// Turn on laser
		hLight = 1;
  } else {
		// Turn off laser
		hLight = 0;
  }
  socket.emit('light', hLight);
}

var hGimbal = false
function handleGimbalClick(cb) {
  if (cb.checked) {
		// Turn on laser
		hGimbal = 1;
  } else {
		// Turn off laser
		hGimbal = 0;
  }
  socket.emit('gimbal', hGimbal);
}

var hServo = false
function handleServoClick(cb) {
  if (cb.checked) {
		// Turn on laser
		hServo = 1;
  } else {
		// Turn off laser
		hServo = 0;
  }
  socket.emit('servo', hServo);
}

// Handle capture picture
function handlePhoto() {
	socket.emit('takephoto', 1);
}

// Handle Reset Gimbal
function handleResetGimbal() {
	document.getElementById('sliderX').value = 0
	document.getElementById('sliderY').value = 0

	document.getElementById('liveX').value = 0
	document.getElementById('liveY').value = 0

	socket.emit('gimbalreset', 1);
}
