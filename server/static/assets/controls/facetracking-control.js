////////////////////////// A few helper functions ///////////////////////////////////////////

const TINY_FACE_DETECTOR = 'tiny_face_detector'

let selectedFaceDetector = TINY_FACE_DETECTOR
let withBoxes = true
let timer = null
let interval = 1000

let host = window.location.hostname;
let imgFace = 'http://' + host + ':9000/?action=snapshot';

function isFaceDetectionModelLoaded() {
  return !!getCurrentFaceDetectionNet().params
}

function getCurrentFaceDetectionNet() {
    return faceapi.nets.tinyFaceDetector
}

function resizeCanvasAndResults(dimensions, canvas, results) {
  const { width, height } = dimensions instanceof HTMLVideoElement
    ? faceapi.getMediaDimensions(dimensions)
    : dimensions
  canvas.width = width
  canvas.height = height

  // resize detections (and landmarks) in case displayed image is smaller than
  // original size
  return faceapi.resizeResults(results, { width, height })
}

function drawLandmarks(dimensions, canvas, results, withBoxes = true) {
  const resizedResults = resizeCanvasAndResults(dimensions, canvas, results)

  if (withBoxes) {
    faceapi.drawDetection(canvas, resizedResults.map(det => det.detection))
  }

  const faceLandmarks = resizedResults.map(det => det.landmarks)
  const drawLandmarksOptions = {
    lineWidth: 2,
    drawLines: true,
    color: 'green'
  }
  faceapi.drawLandmarks(canvas, faceLandmarks, drawLandmarksOptions)
}

function drawExpressions(dimensions, canvas, results, thresh, withBoxes = true) {
  const resizedResults = resizeCanvasAndResults(dimensions, canvas, results)

  if (withBoxes) {
    faceapi.drawDetection(canvas, resizedResults.map(det => det.detection), { withScore: false })
  }

  faceapi.drawFaceExpressions(canvas, resizedResults.map(({ detection, expressions }) => ({ position: detection.box, expressions })))
}

////////////////////////// The 2 Main functions ///////////////////////////////////////////

async function run() {

  if (!isFaceDetectionModelLoaded()) {
    return
  }

  // Fetch Image
  const image = await faceapi.fetchImage(imgFace)
  // console.log(image instanceof HTMLImageElement) // true

  // displaying the fetched image content
  const myImg = document.getElementById('livecam_faceTracking')
  myImg.src = image.src

   const input = document.getElementById('livecam_faceTracking')
   const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 256, scoreThreshold : 0.3 })

   const results = await faceapi.detectAllFaces(input, options).withFaceLandmarks()

   drawLandmarks(input, jQuery('#overlay').get(0), results, withBoxes)
}

async function faceApiInit() {
  await faceapi.loadTinyFaceDetectorModel('assets/js/face-api/models')
  await faceapi.loadFaceLandmarkModel('assets/js/face-api/models')
  await faceapi.loadFaceLandmarkTinyModel('assets/js/face-api/models')
  await faceapi.loadFaceRecognitionModel('assets/js/face-api/models')
  await faceapi.loadFaceExpressionModel('assets/js/face-api/models')

  // run()
}

// Handle FaceTracking
var hFaceTracking = false
function handleFaceTracking(cb) {
  if (cb.checked) {
		// Turn on FaceTracking
    if (timer !== null) return;
    timer = setInterval(function () {
      jQuery('#overlay').removeClass('paused')
      run()
    }, interval);

  } else {
		// Turn off FaceTracking
    jQuery('#overlay').addClass('paused')
    clearInterval(timer);
    timer = null

  }
}
