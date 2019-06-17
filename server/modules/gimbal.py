#!/usr/bin/env python
# Handle gimbal

# Tutorial
# https://maker.pro/raspberry-pi/projects/hexapod-walker-raspberry-pi

# Input example
# {'x': -0.8800528888889119, 'y': -0.8726158222222438, 'xTrim': 0, 'yTrim': 0, 'xMax': 100, 'xMin': -100, 'yMax': 100, 'yMin': -100, '_gsTweenID': 't2'}

import pigpio

from modules import utility

import settings

 pi = pigpio.pi()

CENTER = 1500
SERVO_TRAVEL = 600
FULL_TRAVEL = 250

def init_gimbal():
    print('init_gimbal')

def handle_play_gimbal(gimbal_data):
    gimbal_data = utility.sanitizeJson(gimbal_data)

    xTravel = CENTER + round((gimbal_data['x']/FULL_TRAVEL) * SERVO_TRAVEL);
    # print( xTravel )
    pi.set_servo_pulsewidth( settings.PWM_GIMBAL_X , xTravel );

    yTravel = CENTER + round((gimbal_data['y']/FULL_TRAVEL) * SERVO_TRAVEL);
    # print( yTravel )
    pi.set_servo_pulsewidth( settings.PWM_GIMBAL_Y , yTravel );

def handle_recalibrate_gimbal():
    # print('handle_recalibrate_gimbal')
    pi.set_servo_pulsewidth( settings.PWM_GIMBAL_RESET , 800)
    pi.set_servo_pulsewidth( settings.PWM_GIMBAL_RESET , 2100 );
    pi.set_servo_pulsewidth( settings.PWM_GIMBAL_RESET , 800)

if __name__=="__main__":
    pass
