#!/usr/bin/env python
# Handle gimbal

from gpiozero import Servo, AngularServo
from time import sleep

from modules import utility
import settings

global gimbalX
global gimbalXangle
gimbalXangle = 0

global gimbalY
global gimbalYangle
gimbalYangle = 0

global gimbalZ
global gimbalZangle
gimbalZangle = 0

global gimbalReset

def init_gimbal():
    global gimbalX
    gimbalX = AngularServo(settings.PWM_GIMBAL_X, min_angle=settings.PWM_GIMBAL_X_min_angle, max_angle=settings.PWM_GIMBAL_X_max_angle)
    gimbalX.angle = 0.0

    global gimbalY
    gimbalY = AngularServo(settings.PWM_GIMBAL_Y, min_angle=settings.PWM_GIMBAL_Y_min_angle, max_angle=settings.PWM_GIMBAL_Y_max_angle)
    gimbalY.angle = 0.0

    global gimbalZ
    gimbalZ = AngularServo(settings.PWM_GIMBAL_Z, min_angle=settings.PWM_GIMBAL_Z_min_angle, max_angle=settings.PWM_GIMBAL_Z_max_angle)
    gimbalZ.angle = 0.0

    global gimbalReset
    gimbalReset = Servo(settings.PWM_GIMBAL_RESET)

def handle_play_gimbal(gimbal_data):

    global gimbalX
    global gimbalXangle

    global gimbalY
    global gimbalYangle

    global gimbalZ
    global gimbalZangle


    deadBand = settings.PWM_GIMBAL_deadband
    gimbal_data = utility.sanitizeJson(gimbal_data)
    print(gimbal_data)

    if float(gimbal_data['x']) > deadBand:
        if gimbalXangle <= settings.PWM_GIMBAL_X_max_angle:
            gimbalXangle += 1
        else:
            gimbalXangle = settings.PWM_GIMBAL_X_max_angle
        gimbalX.angle = gimbalXangle

    elif float(gimbal_data['x']) < -deadBand:
        if gimbalXangle >= settings.PWM_GIMBAL_X_min_angle:
            gimbalXangle -= 1
        else:
            gimbalXangle = settings.PWM_GIMBAL_X_min_angle
        gimbalX.angle = gimbalXangle

    if float(gimbal_data['y']) > deadBand:
        if gimbalYangle <= settings.PWM_GIMBAL_Y_max_angle:
            gimbalYangle += 1
        else:
            gimbalYangle = settings.PWM_GIMBAL_Y_max_angle
        gimbalY.angle = gimbalYangle
    elif float(gimbal_data['y']) < -deadBand:
        if gimbalYangle >= settings.PWM_GIMBAL_Y_min_angle:
            gimbalYangle -= 1
        else:
            gimbalYangle = settings.PWM_GIMBAL_Y_min_angle
        gimbalY.angle = gimbalYangle



    # xTravel = utility.convertRange(gimbal_data['x'], [gimbal_data['xMin'], gimbal_data['xMax']], [settings.PWM_GIMBAL_X_min_angle, settings.PWM_GIMBAL_X_max_angle])
    # if round(xTravel) != gimbalX_prev:
    #     print( 'xTravel', round(xTravel) )
    #     # gimbalX.angle = round(xTravel)
    #     gimbalX_prev = round(xTravel)
    #
    # yTravel = utility.convertRange(gimbal_data['y'], [gimbal_data['yMin'], gimbal_data['yMax']], [settings.PWM_GIMBAL_Y_min_angle, settings.PWM_GIMBAL_Y_max_angle])
    # if round(yTravel) != gimbalY_prev:
    #     print( 'yTravel', round(yTravel) )
    #     # gimbalY.angle = round(yTravel)
    #     gimbalY_prev = round(yTravel)

def handle_recalibrate_gimbal(self):

    global gimbalXangle
    gimbalXangle = 0

    global gimbalYangle
    gimbalYangle = 0

    global gimbalZangle
    gimbalZangle = 0

    gimbalX.angle = 0.0
    gimbalY.angle = 0.0
    gimbalZ.angle = 0.0

    gimbalReset.min()
    gimbalReset.max()
    sleep(0.1)
    gimbalReset.min()

if __name__=="__main__":
    pass
