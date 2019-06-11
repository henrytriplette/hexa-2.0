Relay board:

To do correct connection, remove GND and 5V line.
Maintain rest of connections.
3v3 to VCC and GPIO to IN1 to IN4.
Get another 5V PSU, or from same PSU that power RPi, but before micro USB connection.
From extra PSU, Connect GND (0V) to GND and 5V to JD-VCC. Make this connection before to RPi, with extra PSU on, check voltage between GND and VCC on 6pin header, must be ZERO volts. If you read 5V, some wrong on documentation that I read to make this text.
Now, connect GPIO pins to RPi.
Remember, relay are activated by low level logic.
3v3, high level, relay deactivated.
0V, low level, relay activated.

sudo apt-get install python-rpi.gpio python3-rpi.gpio

https://www.youtube.com/watch?v=b6ZagKRnRdM&list=PLYsmShE55_Eo_Pcc6GLP4xRGETEj_fvPV&index=2&t=4s
