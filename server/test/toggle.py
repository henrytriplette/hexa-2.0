
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)

GPIO.setup(17, GPIO.OUT)
GPIO.setup(18, GPIO.OUT)
GPIO.setup(23, GPIO.OUT)
GPIO.setup(24, GPIO.OUT)

# Set everything OFF
GPIO.output(17, 1)
GPIO.output(18, 1)
GPIO.output(23, 1)
GPIO.output(24, 1)

time.sleep(2)

# On
GPIO.output(17, 0)
time.sleep(2)
GPIO.output(17, 1)

# On
GPIO.output(18, 0)
time.sleep(2)
GPIO.output(18, 1)

# On
GPIO.output(23, 0)
time.sleep(2)
GPIO.output(23, 1)

# On
GPIO.output(24, 0)
time.sleep(2)
GPIO.output(24, 1)


GPIO.cleanup()
