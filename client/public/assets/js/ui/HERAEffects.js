export class HERAEffects {

    /**
     * Constructor
     * @param {*} clientTranslator
     */
    constructor(socket) {

      this.socket = socket

      // set the starting position of the cursor outside of the screen
      this.clientX = -100;
      this.clientY = -100;
      this.innerCursor = document.querySelector(".cursor--small");

      this.lastX = 0;
      this.lastY = 0;
      this.isStuck = false;
      this.showCursor = false;
      this.group;
      this.stuckX;
      this.stuckY;
      this.fillOuterCursor;

      this.initCursor();
      this.initCanvas();
    }

    initCursor() {

      jQuery('body').addClass('noCursor darkTheme');

      // add listener to track the current mouse position
      document.addEventListener("mousemove", e => {
        this.clientX = e.clientX;
        this.clientY = e.clientY;
      });

      // transform the innerCursor to the current mouse position
      // use requestAnimationFrame() for smooth performance
      const render = () => {
        // innerCursor.style.transform = `translate(${clientX}px, ${clientY}px)`;
        // if you are already using TweenMax in your project, you might as well
        // use TweenMax.set() instead
        TweenMax.set(this.innerCursor, {
          x: this.clientX,
          y: this.clientY
        });

        requestAnimationFrame(render);
      };
      requestAnimationFrame(render);
    }

    initCanvas() {
      const canvas = document.querySelector(".cursor--canvas");
      const shapeBounds = {
        width: 75,
        height: 75
      };
      paper.setup(canvas);
      const strokeColor = "rgba(255, 0, 0, 0.5)";
      const strokeWidth = 1;
      const segments = 8;
      const radius = 15;

      // we'll need these later for the noisy circle
      const noiseScale = 150; // speed
      const noiseRange = 4; // range of distortion
      let isNoisy = false; // state

      // the base shape for the noisy circle
      const polygon = new paper.Path.RegularPolygon(
        new paper.Point(0, 0),
        segments,
        radius
      );
      polygon.strokeColor = strokeColor;
      polygon.strokeWidth = strokeWidth;
      polygon.smooth();
      this.group = new paper.Group([polygon]);
      this.group.applyMatrix = false;

      // const noiseObjects = polygon.segments.map(() => new SimplexNoise());
      let bigCoordinates = [];

      // function for linear interpolation of values
      const lerp = (a, b, n) => {
        return (1 - n) * a + n * b;
      };

      // function to map a value from one range to another range
      const map = (value, in_min, in_max, out_min, out_max) => {
        return (
          ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
        );
      };

      // the draw loop of Paper.js
      // (60fps with requestAnimationFrame under the hood)
      paper.view.onFrame = event => {
        // using linear interpolation, the circle will move 0.2 (20%)
        // of the distance between its current position and the mouse
        // coordinates per Frame
        this.lastX = lerp(this.lastX, this.clientX, 0.2);
        this.lastY = lerp(this.lastY, this.clientY, 0.2);
        this.group.position = new paper.Point(this.lastX, this.lastY);
      }
    }

}
