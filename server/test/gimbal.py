
from gpiozero import Servo, AngularServo
from time import sleep

# class gpiozero.AngularServo(pin, *, initial_angle=0, min_angle=-90, max_angle=90, min_pulse_width=1/1000, max_pulse_width=2/1000, frame_width=20/1000, pin_factory=None)
# From: https://gpiozero.readthedocs.io/en/stable/api_output.html#angularservo

x = AngularServo(27, min_angle=-42, max_angle=42)
x.angle = 0.0

y = AngularServo(22, min_angle=-42, max_angle=42)
y.angle = 0.0

reset = Servo(25)

sleep(2)
x.angle = 15
sleep(2)
x.angle = -15
sleep(2)
x.angle = 0

sleep(2)
y.angle = 15
sleep(2)
y.angle = -15
sleep(2)
y.angle = 0

reset.min()
reset.max()
sleep(1)
reset.min()
