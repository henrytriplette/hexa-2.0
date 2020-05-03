

# Tutorial
# https://maker.pro/raspberry-pi/projects/hexapod-walker-raspberry-pi

# http://www.olliw.eu/storm32bgc-wiki/Pins_and_Connectors
# http://www.olliw.eu/storm32bgc-wiki/Ports_and_Pins_by_Function#RC2

# Input example
# {'x': -0.8800528888889119, 'y': -0.8726158222222438, 'xTrim': 0, 'yTrim': 0, 'xMax': 100, 'xMin': -100, 'yMax': 100, 'yMin': -100, '_gsTweenID': 't2'}


from gpiozero import Servo, AngularServo
from time import sleep

# class gpiozero.AngularServo(pin, *, initial_angle=0, min_angle=-90, max_angle=90, min_pulse_width=1/1000, max_pulse_width=2/1000, frame_width=20/1000, pin_factory=None)
# From: https://gpiozero.readthedocs.io/en/stable/api_output.html#angularservo

x = AngularServo(27, min_angle=-50, max_angle=50)
x.angle = 0.0

y = AngularServo(22, min_angle=-20, max_angle=20)
y.angle = 0.0

reset = Servo(25)

sleep(2)
x.angle = -45 # right
sleep(10)
x.angle = 0
sleep(2)
x.angle = 45 # left
sleep(10)
x.angle = 0

sleep(2)
y.angle = -25 # up
sleep(10)
y.angle = 0
sleep(2)
y.angle = 20 # down
sleep(10)
y.angle = 0

# reset.min()
# reset.max()
# sleep(1)
# reset.min()
