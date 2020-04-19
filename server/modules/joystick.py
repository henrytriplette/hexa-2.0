#!/usr/bin/env python
# Handle joystick

from smbus2 import SMBus
from time import sleep

from modules import utility
import settings

global arduino_i2cAddress
global arduino_Register
global arduino_Data_Length
global bus

data = [0, 0, 0, 128, 128, 128, 128]

def init_joystick():
    print('init_joystick')

    global arduino_i2cAddress
    arduino_i2cAddress = settings.I2C_arduino_i2cAddress;

    # The Register is where we send our 1 to tell our slave to read or a 0 to send data to.
    global arduino_Register
    arduino_Register = settings.I2C_arduino_Register;

    # We need to identify the size of our message we are sending to the slave. So that we can send //the end of transmission bit.
    global arduino_Data_Length
    arduino_Data_Length = settings.I2C_arduino_Data_Length;

    global bus
    bus = SMBus(1)    # 0 = /dev/i2c-0 (port I2C0), 1 = /dev/i2c-1 (port I2C1)

def handle_play_joystick(joy_data):
    joy_data = utility.sanitizeJson(joy_data)

    # Pass the values
    data = [
        0,
        0,
        0,
        float(joy_data['left']['x']) - float(joy_data['left']['xTrim']),
        float(joy_data['left']['y']) - float(joy_data['left']['yTrim']),
        float(joy_data['right']['x']) - float(joy_data['right']['xTrim']),
        float(joy_data['right']['y']) - float(joy_data['right']['yTrim'])
    ]

    # Smooth out data values
    data[3] = int(round(data[3]))
    data[4] = int(round(data[4]))
    data[5] = int(round(data[5]))
    data[6] = int(round(data[6]))

    print(data)

    bus.write_i2c_block_data(arduino_i2cAddress, arduino_Register, data)

def handle_play_button(button_data):
    button_data = utility.sanitizeJson(button_data)

    # Check if button data exists in settings and retrieve the corresponding bit value
    if hasattr(settings, button_data['button']):

        # Pass the values
        data = [
            0,
            0,
            getattr(settings, button_data['button']),
            128,
            128,
            128,
            128
        ]

        print(data)

        bus.write_i2c_block_data(arduino_i2cAddress, arduino_Register, data)

if __name__=="__main__":
    pass
