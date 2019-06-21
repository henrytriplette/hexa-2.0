# Follow docs\server\raspberry-pi-I2C.md before!
# https://github.com/kplindegaard/smbus2

import sys

from smbus2 import SMBus
from time import sleep

arduino_i2cAddress = 4;
# The Register is where we send our 1 to tell our slave to read or a 0 to send data to.
arduino_Register = 0;
# We need to identify the size of our message we are sending to the slave. So that we can send //the end of transmission bit.
arduino_Data_Length = 7;

if __name__=="__main__":
    bus = SMBus(1)    # 0 = /dev/i2c-0 (port I2C0), 1 = /dev/i2c-1 (port I2C1)

    while True:
        values = []
        try:
            value = int(str(input("Enter 0 - 255:")).strip())
        except Exception as e:
            raise sys.exit(e)
            # continue
        # bus.write_byte(arduino_i2cAddress, value)

        # Write a block of 7 bytes to address [arduino_i2cAddress] from offset [arduino_Register]
        data = [1, 2, 3, 4, 5, 6, 7]
        bus.write_i2c_block_data(arduino_i2cAddress, arduino_Register, data)

        sleep(0.05)
