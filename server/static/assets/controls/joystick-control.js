
var leftController = nipplejs.create({
    zone: document.getElementById('leftJoystick'),
    mode: 'semi',
    size: 256,
    catchDistance: 150,
    color: 'white',
    restJoystick: true,
    lockY: true
});

var rightController = nipplejs.create({
    zone: document.getElementById('rightJoystick'),
    mode: 'semi',
    size: 256,
    catchDistance: 150,
    color: 'white',
    restJoystick: true,
    lockX: true
});

bindNipples();

// Debug
var s = function(sel) {
  return document.querySelector(sel);
};
var sId = function(sel) {
  return document.getElementById(sel);
};
var d = function(sel) {
  return document.querySelector(sel);
};
var dId = function(sel) {
  return document.getElementById(sel);
};

var removeClass = function(el, clss) {
  el.className = el.className.replace(new RegExp('\\b' + clss + ' ?\\b', 'g'), '');
}

// Left debug
var elDebug = sId('debugLeft');
var elDump = elDebug.querySelector('.dump');
var els = {
  position: {
    x: elDebug.querySelector('.position .x .data'),
    y: elDebug.querySelector('.position .y .data')
  },
  force: elDebug.querySelector('.force .data'),
  pressure: elDebug.querySelector('.pressure .data'),
  distance: elDebug.querySelector('.distance .data'),
  angle: {
    radian: elDebug.querySelector('.angle .radian .data'),
    degree: elDebug.querySelector('.angle .degree .data')
  },
  direction: {
    x: elDebug.querySelector('.direction .x .data'),
    y: elDebug.querySelector('.direction .y .data'),
    angle: elDebug.querySelector('.direction .angle .data')
  }
};

// Right Debug
var dlDebug = dId('debugRight');
var dlDump = dlDebug.querySelector('.dump');
var dls = {
  position: {
    x: dlDebug.querySelector('.position .x .data'),
    y: dlDebug.querySelector('.position .y .data')
  },
  force: dlDebug.querySelector('.force .data'),
  pressure: dlDebug.querySelector('.pressure .data'),
  distance: dlDebug.querySelector('.distance .data'),
  angle: {
    radian: dlDebug.querySelector('.angle .radian .data'),
    degree: dlDebug.querySelector('.angle .degree .data')
  },
  direction: {
    x: dlDebug.querySelector('.direction .x .data'),
    y: dlDebug.querySelector('.direction .y .data'),
    angle: dlDebug.querySelector('.direction .angle .data')
  }
};

var l_left = false
var l_right = false
var l_forward = false
var l_backward = false
var l_distance = 0

var r_left = false
var r_right = false
var r_forward = false
var r_backward = false
var r_distance = 0

function bindNipples() {
  leftController.on('start end', function(evt, data) {

    l_right = false
    l_left = false
    l_forward = false
    l_backward = false
    l_distance = 0

    console.log('end left');
    sendJoystick(false)

    debug(data, els);
  }).on('move', function(evt, data) {

    if(data && data.direction && data.direction.angle) {
      console.log(data.direction.angle);

      if (data.direction.angle === "left") l_right = true, l_left = false;
      if (data.direction.angle === "right") l_left = true, l_right = false;
      if (data.direction.angle === "up") l_forward = true, l_backward = false;
      if (data.direction.angle === "down") l_forward = false, l_backward = true;
      l_distance = data.distance

      sendJoystick()
    }
    debug(data, els);
  }).on('dir:up plain:up dir:left plain:left dir:down ' +
        'plain:down dir:right plain:right',
        function(evt, data) {
    // dump(evt.type, els);
  }
       ).on('pressure', function(evt, data) {
    debug({
      pressure: data,
      els
    });
  });

  rightController.on('start end', function(evt, data) {

    r_right = false
    r_left = false
    r_forward = false
    r_backward = false
    r_distance = 0

    console.log('end right');
    sendJoystick(false)

    debug(data, dls);
  }).on('move', function(evt, data) {

    if(data && data.direction && data.direction.angle) {
      console.log(data.direction.angle);

      if (data.direction.angle === "left") r_right = true, r_left = false;
      if (data.direction.angle === "right") r_left = true, r_right = false;
      if (data.direction.angle === "up") r_forward = true, r_backward = false;
      if (data.direction.angle === "down") r_forward = false, r_backward = true;
      r_distance = data.distance

      sendJoystick()
    }

    debug(data, dls);
  }).on('dir:up plain:up dir:left plain:left dir:down ' +
        'plain:down dir:right plain:right',
        function(evt, data) {
    // dump(evt.type, dls);
  }
       ).on('pressure', function(evt, data) {
    debug({
      pressure: data,
      dls
    });
  });
}

// Print data into elements
function debug(obj, list) {
  function parseObj(sub, el) {
    for (var i in sub) {
      if (typeof sub[i] === 'object' && el) {
        parseObj(sub[i], el[i]);
      } else if (el && el[i]) {
        el[i].innerHTML = sub[i];
      }
    }
  }
  setTimeout(function() {
    parseObj(obj, list);
  }, 100);
}

var nbEvents = 0;

// Dump data
function dump(evt, elementDump) {
  setTimeout(function() {
    if (elementDump.children.length > 4) {
      elementDump.removeChild(elDump.firstChild);
    }
    var newEvent = document.createElement('div');
    newEvent.innerHTML = '#' + nbEvents + ' : <span class="data">' +
      evt + '</span>';
    elementDump.appendChild(newEvent);
    nbEvents += 1;
  }, 100);
}

// Send Values
function sendJoystick(reset) {

  var left_distance = l_distance;
  var right_distance = r_distance;

  var left_updown = 128;
  var left_leftright = 128;
  var right_updown = 128;
  var right_leftright = 128;

  if(reset !== true) {
    // Left joystick
    if (l_right) {
      left_leftright = left_distance + 128;
      left_updown = 128;
    }
    if (l_left) {
      left_leftright = -left_distance + 128;
      left_updown = 128;
    }
    if (l_forward) {
      left_leftright = 128;
      left_updown = -left_distance + 128;
    }
    if (l_backward) {
      left_leftright = 128;
      left_updown = left_distance + 128;
    }

  // Right Joystick
    if (r_right) {
      right_leftright = right_distance + 128;
      right_updown = 128;
    }
    if (r_left) {
      right_leftright = -right_distance + 128;
      right_updown = 128;
    }
    if (r_forward) {
      right_leftright = 128;
      right_updown = -right_distance + 128;
    }
    if (r_backward) {
      right_leftright = 128;
      right_updown = right_distance + 128;
    }
  }

  var joystick = {
  	'left_updown': left_updown,
  	'left_leftright': left_leftright,
  	'right_updown': right_updown,
  	'right_leftright': right_leftright
  }

  fetch('/joystick?left_updown=' + left_updown +'&left_leftright=' + left_leftright +'&right_updown=' + right_updown +'&right_leftright=' + right_leftright).then(res => {});

}

// SERB_PAD_LEFT
function SERB_PAD_LEFT() {
  // console.log('SERB_PAD_LEFT');
  socket.emit('SERB_PAD_LEFT', 1);
}

// SERB_PAD_DOWN
function SERB_PAD_DOWN() {
  // console.log('SERB_PAD_DOWN');
  socket.emit('SERB_PAD_DOWN', 1);
}

// SERB_PAD_RIGHT
function SERB_PAD_RIGHT() {
  // console.log('SERB_PAD_RIGHT');
  socket.emit('SERB_PAD_RIGHT', 1);
}

// SERB_PAD_UP
function SERB_PAD_UP() {
  // console.log('SERB_PAD_UP');
  socket.emit('SERB_PAD_UP', 1);
}

// SERB_START
function SERB_START() {
  // console.log('SERB_START');
  socket.emit('SERB_START', 1);
}

// SERB_R3
function SERB_R3() {
  // console.log('SERB_R3');
  socket.emit('SERB_R3', 1);
}

// SERB_L3
function SERB_L3() {
  // console.log('SERB_L3');
  socket.emit('SERB_L3', 1);
}

// SERB_SELECT
function SERB_SELECT() {
  // console.log('SERB_SELECT');
  socket.emit('SERB_SELECT', 1);
}

// SERB_SQUARE
function SERB_SQUARE() {
  // console.log('SERB_SQUARE');
  socket.emit('SERB_SQUARE', 1);
}

// SERB_CROSS
function SERB_CROSS() {
  // console.log('SERB_CROSS');
  socket.emit('SERB_CROSS', 1);
}

// SERB_CIRCLE
function SERB_CIRCLE() {
  // console.log('SERB_CIRCLE');
  socket.emit('SERB_CIRCLE', 1);
}

// SERB_TRIANGLE
function SERB_TRIANGLE() {
  // console.log('SERB_TRIANGLE');
  socket.emit('SERB_TRIANGLE', 1);
}

// SERB_R1
function SERB_R1() {
  // console.log('SERB_R1');
  socket.emit('SERB_R1', 1);
}

// SERB_L1
function SERB_L1() {
  // console.log('SERB_L1');
  socket.emit('SERB_L1', 1);
}

// SERB_R2
function SERB_R2() {
  // console.log('SERB_R2');
  socket.emit('SERB_R2', 1);
}

// SERB_L2
function SERB_L2() {
  // console.log('SERB_L2');
  socket.emit('SERB_L2', 1);
}

// // SER_RX
// function SER_RX() {
//   // console.log('SER_RX');
//   socket.emit('SER_RX', 1);
// }

// // SER_RY
// function SER_RY() {
//   // console.log('SER_RY');
//   socket.emit('SER_RY', 1);
// }

// // SER_LX
// function SER_LX() {
//   // console.log('SER_LX');
//   socket.emit('SER_LX', 1);
// }

// // SER_LY
// function SER_LY() {
//   // console.log('SER_LY');
//   socket.emit('SER_LY', 1);
// }
