
Built-in pull-up resistors are only available on the Pi’s I2C pins (Pins 3 (SDA) and 5 (SCL)
the I2C pins are pins A4 (SDA) and A5 (SCL),

Most of the following steps are already integrated into the default smbus install/i2c enable

### Raspberry Pi I2C

o) Step 0: Launch Raspberry Pi Config
```
sudo raspi-config
```

Select 8 Advanced Options and then  A7 I2C – Enable/Disable automatic loading. A prompt will appear asking Would you like the ARM I2C interface to be enabled?, select Yes, exit the utility.
Reboot your Raspberry Pi followed by the steps below to install the prerequisite software and drivers.

o) Step 1: Reboot the Raspberry Pi using following command
```
sudo reboot
```

o) Step 2: Next you need to update your Raspberry Pi to ensure all the latest packages are installed:
```
sudo apt-get update
sudo apt-get upgrade
sudo apt-get dist-upgrade
```
o) Step 3:  Once you have logged into your Raspberry Pi from the command line, run the following command to install SMBus and Python Dev:
```
sudo apt-get install python-smbus python3-smbus python-dev python3-dev
```
o) Step 4:  From the command line, run the following command to install i2c-tools:
```
sudo apt-get install i2c-tools
```
o) Step 5: For recent versions of the Raspberry Pi (3.18 kernel or later) you will need to update the /boot/config.txt file.  Open the file with nano using the command:
```
sudo nano /boot/config.txt
```
Add the following text to the bottom of the file:
```
dtparam=i2c1=on
dtparam=i2c_arm=on
```
Save your changes and exit the nano editor.

o) Step 6: Set the Raspberry Pi to start I2C automatically at boot by editing /etc/modules :
```
sudo nano /etc/modules
```
Use your cursor keys to move to the last line and add a new line and then add:
```
i2c-dev
```
Save your changes and exit the nano editor.

o) Step 8: To avoid having to run the I2C tools at root, add the ‘pi’ user to the I2C group:
```
sudo adduser pi i2c
```
o) Step 9: Next reboot the Raspberry Pi:
```
sudo reboot
```
