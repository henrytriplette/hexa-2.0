from gpiozero import Servo, AngularServo
from time import sleep

# class gpiozero.AngularServo(pin, *, initial_angle=0, min_angle=-90, max_angle=90, min_pulse_width=1/1000, max_pulse_width=2/1000, frame_width=20/1000, pin_factory=None)
# From: https://gpiozero.readthedocs.io/en/stable/api_output.html#angularservo

# x 45 -45 ??
x = AngularServo(27, min_angle=-50, max_angle=50)
x.angle = 0.0

# y 10 -30 ??
y = AngularServo(22, min_angle=-30, max_angle=10)
y.angle = -10

reset = Servo(25)

while True:
    input_x = float(input("X? "))
    input_y = float(input("Y? "))

    x.angle = input_x
    y.angle = input_y

    sleep(1)
