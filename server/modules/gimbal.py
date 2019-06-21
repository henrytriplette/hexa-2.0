#!/usr/bin/env python
# Handle gimbal

from gpiozero import Servo, AngularServo
from time import sleep

from modules import utility
import settings

gimbalX = False
gimbalY = False
gimbalReset = False

def init_gimbal():
    gimbalX = AngularServo(settings.PWM_GIMBAL_X, min_angle=-42, max_angle=42)
    gimbalX.angle = 0.0
    gimbalY = AngularServo(settings.PWM_GIMBAL_Y, min_angle=-42, max_angle=42)
    gimbalY.angle = 0.0

    gimbalReset = Servo(settings.PWM_GIMBAL_RESET)

def handle_play_gimbal(gimbal_data):
    gimbal_data = utility.sanitizeJson(gimbal_data)

    xTravel = round(gimbal_data['x']/10);
    # print( xTravel )
    gimbalX.angle = xTravel


    yTravel = round(gimbal_data['y']/10);
    # print( yTravel )
    gimbalY.angle = yTravel

def handle_recalibrate_gimbal():
    # print('handle_recalibrate_gimbal')
    gimbalX.angle = 0
    gimbalY.angle = 0

    gimbalReset.min()
    gimbalReset.max()
    sleep(0.5)
    gimbalReset.min()

if __name__=="__main__":
    pass
