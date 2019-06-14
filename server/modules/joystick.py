#!/usr/bin/env python
# Handle joystick

from modules import utility

import settings

def init_joystick():
    print('init_joystick')

def handle_play_joystick(joy_data):
    joy_data = utility.sanitizeJson(joy_data)
    print(joy_data)

def handle_play_button(button_data):
    button_data = utility.sanitizeJson(button_data)
    print(button_data)

if __name__=="__main__":
    pass
