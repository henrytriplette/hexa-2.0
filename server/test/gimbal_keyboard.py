
# http://www.olliw.eu/storm32bgc-wiki/Pins_and_Connectors
# http://www.olliw.eu/storm32bgc-wiki/Ports_and_Pins_by_Function#RC2

# RC Port pinout
# Ground -
# RC2-0 -> 20 Yaw
# RC2-1 - 27 Left and right
# RC2-2 - 22 Up and down
# RC2-3 -> 21 Reset

# class gpiozero.AngularServo(pin, *, initial_angle=0, min_angle=-90, max_angle=90, min_pulse_width=1/1000, max_pulse_width=2/1000, frame_width=20/1000, pin_factory=None)
# From: https://gpiozero.readthedocs.io/en/stable/api_output.html#angularservo

import curses

from gpiozero import Servo, AngularServo
from time import sleep

# Get the curses window, turn off echoing of keyboard to screen, turn on
# instant (no waiting) key response, and use special values for cursor keys
screen = curses.initscr()
curses.noecho()
curses.cbreak()
screen.keypad(True)

x = 0
y = 0
z = 0

gimbalX = AngularServo(22, min_angle=-45, max_angle=45)
gimbalX.angle = 0.0

gimbalY = AngularServo(27, min_angle=-45, max_angle=45)
gimbalY.angle = 0.0

gimbalReset = Servo(21)

try:
    while True:
        char = screen.getch()
        if char == ord('q'):
            break
        elif char == curses.KEY_UP:
            x += 1
            gimbalX.angle = x
            print('up', x)
        elif char == curses.KEY_DOWN:
            x -= 1
            gimbalX.angle = x
            print('down', x)
        elif char == curses.KEY_RIGHT:
            y += 1
            gimbalY.angle = y
            print('right', y)
        elif char == curses.KEY_LEFT:
            y -= 1
            gimbalY.angle = y
            print('left', y)
        elif char == 10:
            print('reset')
            gimbalReset.min()
            gimbalReset.max()
            sleep(0.1)
            gimbalReset.min()

finally:
    #Close down curses properly, inc turn echo back on!
    curses.nocbreak(); screen.keypad(0); curses.echo()
    curses.endwin()
