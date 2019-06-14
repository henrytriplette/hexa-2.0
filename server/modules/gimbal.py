#!/usr/bin/env python
# Handle gimbal

# from periphery import PWM

from modules import utility

import settings

CENTER = 1500
SERVO_TRAVEL = 600
FULL_TRAVEL = 250

def handle_play_gimbal(gimbal_data):
    gimbal_data = utility.sanitizeJson(gimbal_data)
    print(gimbal_data)

if __name__=="__main__":
    pass


# Open PWM channel 0, pin 10
pwm = PWM(0, 10)

# Set frequency to 50Hz
pwm.frequency = 50

# Set duty cycle to 75%
pwm.duty_cycle = 0.75

pwm.enable()

# Change duty cycle to 50%
pwm.duty_cycle = 0.50

pwm.close()
