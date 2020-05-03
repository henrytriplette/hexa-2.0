o) Download latest Raspbian OS Stretch Lite version from:
https://www.raspberrypi.org/downloads/raspbian/

o) Burn iso to SD card using Etcher Portable
https://www.balena.io/etcher/

o) Add the following files to the BOOT microSD drive:
- Empty file named: ssh
- Wifi Manual configuration file: wpa_supplicant.conf
  More info: https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md
  If using Windows you need to make sure the text file uses Linux/Unix style line breaks. In Notepad++ do so using “Edit” > “EOL Conversion” > “UNIX/OSX Format”. “UNIX” is then shown in the status bar.

  This method to setup WiFi must be completed before you boot this card for the first time. This is the point at which the system checks for the wpa_supplicant.conf file. If you have already booted the card you will need to re-write with a fresh image and continue.

  To get a complete list of wifi network and passwords on Windows, in CMD write:
  Show list of saved wifi profiles
  ```
  netsh wlan show profile
  ```
  Show info and password
  ```
  netsh wlan show profiles name="INSERTNAMEHERE" key=clear
  ```

o) Scan for RaspberryPi on local network usiong NMAP
  - Download Zenmap GUI from: https://nmap.org/download.html

  Ping Scan with:
  ```
  nmap -sn 192.168.1.*
  ```

o) Connect via SSH using Putty:
  - Download: https://putty.org/

o) Use passwrd to change the default Pi user password
  ```
  passwd
  ```

o)  Use raspi configuration tool with:
  ```
  sudo raspi-config
  ```
  To:
  - Enable i2c
  - Enable camera
  - Change default raspberry hostname
  - Expand filesystem

o)  Enable user space access to I2C
  To enable userspace access to I2C open it with "sudo nano /etc/modules" and ensure that /etc/modules contains the following line:
  ```  
  i2c-dev
  ```
o)  Get the ARM version currently running:
  ```
  uname -m
  ```
  If the result returned starts with “armv6”, you are running a Raspberry Pi based on the older ARMv6 chipset and the next Node.js installation step will not work; otherwise, you are ready for the next step.

o) Install dependencies
  First update everything
  ```
  sudo apt-get update && sudo apt-get -y upgrade && sudo apt-get -y auto-remove && sudo reboot
  ```
  Then bgin:
  ```
  curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
  sudo apt-get install nodejs
  sudo apt-get install apache2 pigpio git
  ```
  To make sure it ran correctly, run
  ```
  node -v
  ```
  It should return the current Node.js version.

o) Install mjpg-streamer for RaspberryPi Camera
  ```
  sudo apt-get install cmake libjpeg8-dev
  cd
  git clone https://github.com/jacksonliam/mjpg-streamer.git ~/mjpg-streamer
  cd mjpg-streamer/mjpg-streamer-experimental
  make clean all
  sudo mkdir /opt/mjpg-streamer
  sudo mv * /opt/mjpg-streamer
  ```

o) Install Motion for PS3 Eye
  ```
  sudo apt-get install motion -y
  ```
  Type in the command ```lsusb``` and enter. You should see the name of your camera. If it is NOT there, then there is some problem in your camera or the camera is not supported in 'motion'.
  Then configure using:
  ```
  sudo nano /etc/motion/motion.conf
  ```

  You have to change some settings in the .conf file. It might be difficult sometimes to find the settings but use 'ctrl + w' to find it. So follow the steps:
  ```
  Set 'log_level' to 4
  Set 'framerate' to 15.
  Keep 'Stream_port' to 9001
  'Stream_quality' should be 50.
  Change 'Stream_localhost' to OFF.
  Change 'webcontrol_localhost' to OFF.
  Set 'quality' to 50.
  Set 'width' & 'height' to 640 & 480.
  Set 'post_capture' to 0.
  Set 'rotate' to 180.
  ```
  Press ctrl + x to exit. Type y to save and enter to conform.

  To enable motion as a daemon:
  ```
  Make sure 'daemon' is ON.
  ```

  Again type in the command
  ```
  sudo nano /etc/default/motion
  ```

  Set  ```start_motion_daemon ``` to yes. Save and exit.
  Restart the motion software. To do it type in the command ```sudo service motion restart``` and press enter.
  Again type in the command ```sudo motion``` and press enter. Now your server is ready.

o) Install Flite for voice output and synthesis
  ```
  sudo apt-get install festival -y
  sudo apt-get install flite -y
  ```

  Additional voices?
  ```
  cd
  git clone http://github.com/festvox/flite
  cd flite
  ./configure
  make
  make get_voices
  ```
  To get a list of the installed voices use:
  ```
  flite -lv
  ```
  To play a specific voice from the list, use the -voice parameter in the command
  ```
  flite -voice slt "I'm now speaking kal's voice. By the way, please call me Dr. Hawking."
  ```

o) Check python3 version
  ```
  python3 -V
  ```

o) Install gpiozero
  ```
  sudo apt install python3-gpiozero
  ```

o) Install pip and virtualenv
  ```
  sudo apt install python3-pip
  sudo pip3 install virtualenv
  ```

o) Create virtualenv
  ```
  virtualenv -p python3 venv
  ```

o) Activate virtualenv
  ```
  source venv/bin/activate
  ```

  When the command completes, your current terminal program will be configured to use your virtual environment for activities related to Python 3. Given that, install the Python dependencies for your GPIO Zero project into your virtual environment:
  ```
  pip install -r requirements.txt
  ```

o) Install atlas for Snowboy Support
  Install dependencies:
  ```
  sudo apt-get -y install python-pyaudio python3-pyaudio sox libmagic-dev libatlas-base-dev libsox-fmt-all
  ```
  Install PortAudio’s Python bindings:
  ```
  sudo pip install pyaudio
  sudo pip install requests
  ```
  Create **~/.asoundrc** with correct hw settings. use `aplay -l` & `arecord -l` to find out hw cards. "**card 0, device 0**" is "**hw:0,0**"
  ```
  sudo nano ~/.asoundrc
  ```

  With the following content:
  ```
  pcm.!default {
    type asym
     playback.pcm {
       type plug
       slave.pcm "hw:0,0"
     }
     capture.pcm {
       type plug
       slave.pcm "hw:1,0"
     }
  }
  ```
  To check whether you can record via your microphone, open a terminal and run:
  ```
  rec temp.wav
  ```

  Use `speaker-test -c 2` to test audio out
  Use `arecord -d 3 test.wav` to record a 3 second test clip. Use `aplay test.wav` to verify

  If you need to tweak some alsa settings, use *alsamixer* & then run the following to keep the settings
  ```
  sudo alsactl store
  ```
  Also http://docs.kitt.ai/snowboy/#set-up-audio

????????????????????????????????????????????
  sudo chmod +x ./GassistPi/audio-drivers/USB-MIC-JACK/scripts/usb-mic-onboard-jack.sh  
  sudo ./GassistPi/audio-drivers/USB-MIC-JACK/scripts/usb-mic-onboard-jack.sh  
  speaker-test  
????????????????????????????????????????????

o) Copy folder on /home/pi/hexa/, cd inside and run
  ```
  sudo npm install
  ```

o) Need ROOT to RUN PROPERLY.
  ```
  sudo node main.js
  ```

o) Make Hexa run on boot:
  ```
  su pi -c 'node /home/pi/hexa/main.js < /dev/null &'
  ```

o)
o)
o)
o)
o)
o)
o)
o)
