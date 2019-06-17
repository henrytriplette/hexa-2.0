export class HERAFaceTracking {

    /**
     * Constructor
     * @param {*} clientTranslator
     */
    constructor(socket) {

      this.socket = socket

      const TINY_FACE_DETECTOR = 'tiny_face_detector'

      this.selectedFaceDetector = TINY_FACE_DETECTOR
      this.withBoxes = true
      this.timer = null
      this.interval = 1000

      this.host = window.location.hostname;
      this.imgFace = 'http://' + this.host + ':9000/?action=snapshot';
      this.hFaceTracking = false;

      // Init Loading Facetracking resources
      this.faceApiInit()

      // Bind button toggle
      this.bindFaceTrackingToggle(this);
    }

    isFaceDetectionModelLoaded() {
      return !!this.getCurrentFaceDetectionNet()
    }

    getCurrentFaceDetectionNet() {
        return window.faceapi.nets.tinyFaceDetector
    }

    resizeCanvasAndResults(dimensions, canvas, results) {
      const { width, height } = dimensions instanceof HTMLVideoElement
        ? window.faceapi.getMediaDimensions(dimensions)
        : dimensions
      canvas.width = width
      canvas.height = height

      // resize detections (and landmarks) in case displayed image is smaller than
      // original size
      return window.faceapi.resizeResults(results, { width, height })
    }

    drawLandmarks(dimensions, canvas, results, withBoxes = true) {
      const resizedResults = this.resizeCanvasAndResults(dimensions, canvas, results)

      if (withBoxes) {
        window.faceapi.draw.drawDetections(canvas, resizedResults.map(det => det.detection))
      }

      const faceLandmarks = resizedResults.map(det => det.landmarks)
      const drawLandmarksOptions = {
        lineWidth: 2,
        drawLines: true,
        color: 'green'
      }
      window.faceapi.draw.drawFaceLandmarks(canvas, faceLandmarks, drawLandmarksOptions)
    }

    drawExpressions(dimensions, canvas, results, thresh, withBoxes = true) {
      const resizedResults = this.resizeCanvasAndResults(dimensions, canvas, results)

      if (withBoxes) {
        window.faceapi.draw.drawDetections(canvas, resizedResults.map(det => det.detection), { withScore: false })
      }

      window.faceapi.draw.drawFaceExpressions(canvas, resizedResults.map(({ detection, expressions }) => ({ position: detection.box, expressions })))
    }

    async run() {

      if (!this.isFaceDetectionModelLoaded()) {
        return
      }

      // Fetch Image
      const image = await window.faceapi.fetchImage(this.imgFace)
      // console.log(image instanceof HTMLImageElement) // true

      // displaying the fetched image content
      const myImg = document.getElementById('livecam_faceTracking')
      myImg.src = image.src

       const input = jQuery('#livecam_faceTracking').get(0)
       const options = new window.faceapi.TinyFaceDetectorOptions({ inputSize: 256, scoreThreshold : 0.25 })

       const results = await window.faceapi.detectAllFaces(input, options).withFaceLandmarks()

       const canvas = jQuery('#overlay').get(0)
       window.faceapi.matchDimensions(canvas, input)
       const resizedResults = window.faceapi.resizeResults(results, input)

       window.faceapi.draw.drawDetections(canvas, resizedResults)
       window.faceapi.draw.drawFaceLandmarks(canvas, resizedResults)
       // window.faceapi.draw.drawDetections(canvas, faceapi.resizeResults(results, input))
    }

    async faceApiInit() {
      await window.faceapi.loadTinyFaceDetectorModel('assets/js/face-api/models')
      await window.faceapi.loadFaceLandmarkModel('assets/js/face-api/models')
      await window.faceapi.loadFaceLandmarkTinyModel('assets/js/face-api/models')
      await window.faceapi.loadFaceRecognitionModel('assets/js/face-api/models')
      await window.faceapi.loadFaceExpressionModel('assets/js/face-api/models')

      // run()
    }

    // Handle FaceTracking
    bindFaceTrackingToggle(input) {
      jQuery(".toggleFaceTrackingCheckbox").each(function(index, element) {

          jQuery(element).on( "change", function() {
            if (this.checked == true) {
              // Turn on FaceTracking
              if (input.timer !== null) return;
              input.timer = setInterval(function () {
                jQuery('#overlay').removeClass('paused')
                input.run()
              }, input.interval);
            } else {
              // Turn off FaceTracking
              jQuery('#overlay').addClass('paused')
              clearInterval(input.timer);
              input.timer = null
            }
          });
      });
    }

    handleFaceTracking(element) {

      if (element.srcElement.checked == true) {
        jQuery('#serverOutput').append('<span class="yellow">Facetracking Initialized</span>')
    		// Turn on FaceTracking
        if (this.timer !== null) return;
        this.timer = setInterval(function (element) {
          jQuery('#overlay').removeClass('paused')
          // this.run()
          console.log('element', element);
          // console.log('element', element);
        }, this.interval);

      } else {
        jQuery('#serverOutput').append('<span class="yellow">Facetracking Stopped</span>')
    		// Turn off FaceTracking
        jQuery('#overlay').addClass('paused')
        clearInterval(this.timer);
        this.timer = null

      }
    }
}
