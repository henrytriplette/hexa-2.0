#!/usr/bin/env python
# Handle all globals variables

def init():

    # -----------------------------------------------------------------------------
    # Setting GPIO allocation
    global SERB_TOGGLE_BEC
    SERB_TOGGLE_BEC = 17

    global SERB_TOGGLE_GIMBAL
    SERB_TOGGLE_GIMBAL = 18

    global SERB_TOGGLE_LIGHT
    SERB_TOGGLE_LIGHT = 23

    global SERB_TOGGLE_LASER
    SERB_TOGGLE_LASER = 24

    # Setting Gimbal allocation
    global PWM_GIMBAL_X
    PWM_GIMBAL_X = 27

    global PWM_GIMBAL_Y
    PWM_GIMBAL_Y = 22

    # global PWM_GIMBAL_Z
    # PWM_GIMBAL_Z = 18

    global PWM_GIMBAL_RESET
    PWM_GIMBAL_RESET = 25

    global PWM_GIMBAL_X_min_angle
    PWM_GIMBAL_X_min_angle = -42

    global PWM_GIMBAL_X_max_angle
    PWM_GIMBAL_X_max_angle = 42

    global PWM_GIMBAL_X_start_angle
    PWM_GIMBAL_X_start_angle = 0.0

    global PWM_GIMBAL_Y_min_angle
    PWM_GIMBAL_Y_min_angle = -42

    global PWM_GIMBAL_Y_max_angle
    PWM_GIMBAL_Y_max_angle = 42

    global PWM_GIMBAL_Y_start_angle
    PWM_GIMBAL_Y_start_angle = 0.0

    global I2C_arduino_i2cAddress
    I2C_arduino_i2cAddress = 4

    # The Register is where we send our 1 to tell our slave to read or a 0 to send data to.
    global I2C_arduino_Register
    I2C_arduino_Register = 0

    # We need to identify the size of our message we are sending to the slave. So that we can send #the end of transmission bit.
    global I2C_arduino_Data_Length
    I2C_arduino_Data_Length = 7

    # Hexapod Control
    global SERB_START
    SERB_START = 1 #   bit3 - Start Button test
    global SERB_SELECT
    SERB_SELECT = 2 #   bit0 - Select Button test

    global SERB_L3
    SERB_L3 = 3 #   bit1 - L3 Button test
    global SERB_L1
    SERB_L1 = 4 #  bit2 - L1 Button test
    global SERB_L2
    SERB_L2 = 5 #  bit0 - L2 Button test

    global SERB_R3
    SERB_R3 = 6 #   bit2 - R3 Button test (Horn)
    global SERB_R1
    SERB_R1 = 7 #  bit3 - R1 Button test
    global SERB_R2
    SERB_R2 = 8 #  bit1 - R2 Button test

    global SERB_PAD_UP
    SERB_PAD_UP = 9 #   bit4 - Up Button test
    global SERB_PAD_DOWN
    SERB_PAD_DOWN = 10 #   bit6 - Down Button test
    global SERB_PAD_LEFT
    SERB_PAD_LEFT = 11 #   bit7 - Left Button test
    global SERB_PAD_RIGHT
    SERB_PAD_RIGHT = 12 #   bit5 - Right Button test

    global SERB_TRIANGLE
    SERB_TRIANGLE = 13 # bit4 - Triangle Button test
    global SERB_CIRCLE
    SERB_CIRCLE = 14 # bit5 - Circle Button test
    global SERB_CROSS
    SERB_CROSS = 15 # bit6 - Cross Button test
    global SERB_SQUARE
    SERB_SQUARE = 16 # bit7 - Square Button test

    global SER_RX
    SER_RX = 6 # DualShock(3) - Right stick Left/right
    global SER_RY
    SER_RY = 5 # DualShock(4) - Right Stick Up/Down
    global SER_LX
    SER_LX = 4 # DualShock(5) - Left Stick Left/right
    global SER_LY
    SER_LY = 3 # DualShock(6) - Left Stick Up/Down
