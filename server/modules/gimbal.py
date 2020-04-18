#!/usr/bin/env python
# Handle gimbal

from gpiozero import Servo, AngularServo
from time import sleep

from modules import utility
import settings

global gimbalX
global gimbalY
global gimbal>
global gimbalReset

def init_gimbal():
    global gimbalX
    gimbalX = AngularServo(settings.PWM_GIMBAL_X, min_angle=settings.PWM_GIMBAL_X_min_angle, max_angle=settings.PWM_GIMBAL_X_max_angle)
    gimbalX.angle = settings.PWM_GIMBAL_X_start_angle

    global gimbalZ
    gimbalZ = AngularServo(settings.PWM_GIMBAL_Z, min_angle=settings.PWM_GIMBAL_Z_min_angle, max_angle=settings.PWM_GIMBAL_Z_max_angle)
    gimbalZ.angle = settings.PWM_GIMBAL_Z_start_angle

    global gimbalY
    gimbalY = AngularServo(settings.PWM_GIMBAL_Y, min_angle=settings.PWM_GIMBAL_Y_min_angle, max_angle=settings.PWM_GIMBAL_Y_max_angle)
    gimbalY.angle = settings.PWM_GIMBAL_Y_start_angle

    global gimbalReset
    gimbalReset = Servo(settings.PWM_GIMBAL_RESET)

def handle_play_gimbal(gimbal_data):
    gimbal_data = utility.sanitizeJson(gimbal_data)

    xTravel = utility.convertRange(gimbal_data['x'], [gimbal_data['xMin'], gimbal_data['xMax']], [settings.PWM_GIMBAL_X_min_angle, settings.PWM_GIMBAL_X_max_angle])
    # print( xTravel )
    gimbalX.angle = round(xTravel)

    yTravel = utility.convertRange(gimbal_data['y'], [gimbal_data['yMin'], gimbal_data['yMax']], [settings.PWM_GIMBAL_Y_min_angle, settings.PWM_GIMBAL_Y_max_angle])
    # print( yTravel )
    gimbalY.angle = round(yTravel)

    zTravel = utility.convertRange(gimbal_data['z'], [gimbal_data['zMin'], gimbal_data['zMax']], [settings.PWM_GIMBAL_Z_min_angle, settings.PWM_GIMBAL_Z_max_angle])
    # print( zTravel )
    gimbalZ.angle = round(zTravel)

def handle_recalibrate_gimbal(self):
    print('handle_recalibrate_gimbal')

    gimbalX.angle = settings.PWM_GIMBAL_X_start_angle
    gimbalY.angle = settings.PWM_GIMBAL_Y_start_angle
    gimbalZ.angle = settings.PWM_GIMBAL_Z_start_angle

    gimbalReset.min()
    gimbalReset.max()
    sleep(0.1)
    gimbalReset.min()

if __name__=="__main__":
    pass
