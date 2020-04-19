#!/usr/bin/env python
# Handle joystick

from smbus2 import SMBus
from time import sleep

arduino_i2cAddress = 0x04
arduino_Register = 0
arduino_Data_Length = 7

with SMBus(1) as bus:
    # Write a block of 8 bytes to address 80 from offset 0
    data = [0, 0, 1, 128, 128, 128, 128]
    bus.write_i2c_block_data(arduino_i2cAddress, 0, data)
    print(data)
# bus.write_i2c_block_data(arduino_i2cAddress, arduino_Register, data)
# bus.close()
