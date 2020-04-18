
# http://www.olliw.eu/storm32bgc-wiki/Pins_and_Connectors
# http://www.olliw.eu/storm32bgc-wiki/Ports_and_Pins_by_Function#RC2

# RC Port
# Ground -
# RC2-0 -> 20 Yaw
# RC2-1 - 27 Left and right
# RC2-2 - 22 Up and down
# RC2-3 -> 21 Reset

from gpiozero import Servo, AngularServo
from time import sleep

# class gpiozero.AngularServo(pin, *, initial_angle=0, min_angle=-90, max_angle=90, min_pulse_width=1/1000, max_pulse_width=2/1000, frame_width=20/1000, pin_factory=None)
# From: https://gpiozero.readthedocs.io/en/stable/api_output.html#angularservo

# x 45 -45 ??
x = AngularServo(27, min_angle=-45, max_angle=45)
x.angle = 0.0

# y 10 -30 ??
y = AngularServo(22, min_angle=-45, max_angle=45)
y.angle = 0.0

gimbalReset = Servo(21)

# sleep(1)
# gimbalReset.min()
# gimbalReset.max()
# sleep(0.1)
# gimbalReset.min()

while True:
    input_x = float(input("X? "))
    input_y = float(input("Y? "))

    x.angle = input_x
    y.angle = input_y

    sleep(1)
