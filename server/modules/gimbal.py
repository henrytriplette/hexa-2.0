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
    gimbalX = AngularServo(settings.PWM_GIMBAL_X, min_angle=settings.PWM_GIMBAL_X_min_angle, max_angle=settings.PWM_GIMBAL_X_max_angle)
    gimbalX.angle = settings.PWM_GIMBAL_X_start_angle
    gimbalY = AngularServo(settings.PWM_GIMBAL_Y, min_angle=settings.PWM_GIMBAL_Y_min_angle, max_angle=settings.PWM_GIMBAL_Y_max_angle)
    gimbalY.angle = settings.PWM_GIMBAL_Y_start_angle

    gimbalReset = Servo(settings.PWM_GIMBAL_RESET)

def handle_play_gimbal(gimbal_data):
    gimbal_data = utility.sanitizeJson(gimbal_data)

    xTravel = utility.convertRange(gimbal_data['x'], [gimbal_data['xMin'], gimbal_data['xMax']], [settings.PWM_GIMBAL_X_min_angle, settings.PWM_GIMBAL_X_max_angle])
    # print( xTravel )
    gimbalX.angle = round(xTravel)

    yTravel = utility.convertRange(gimbal_data['y'], [gimbal_data['yMin'], gimbal_data['yMax']], [settings.PWM_GIMBAL_Y_min_angle, settings.PWM_GIMBAL_Y_max_angle])
    # print( yTravel )
    gimbalY.angle = round(yTravel)

def handle_recalibrate_gimbal():
    print('handle_recalibrate_gimbal')
    gimbalX.angle = settings.PWM_GIMBAL_X_start_angle
    gimbalY.angle = settings.PWM_GIMBAL_Y_start_angle

    gimbalReset.min()
    gimbalReset.max()
    sleep(0.1)
    gimbalReset.min()

if __name__=="__main__":
    pass
