#!/usr/bin/env python
# Handle all toggle

from gpiozero import LED

from modules import utility
import settings

toggleSERB_TOGGLE_BEC = False
toggleSERB_TOGGLE_GIMBAL = False
toggleSERB_TOGGLE_LIGHT = False
toggleSERB_TOGGLE_LASER = False

def init_toggle():
    # Start with the pins off
    toggleSERB_TOGGLE_BEC = LED(settings.SERB_TOGGLE_BEC, initial_value=True)
    toggleSERB_TOGGLE_GIMBAL = LED(settings.SERB_TOGGLE_GIMBAL, initial_value=True)
    toggleSERB_TOGGLE_LIGHT = LED(settings.SERB_TOGGLE_LIGHT, initial_value=True)
    toggleSERB_TOGGLE_LASER = LED(settings.SERB_TOGGLE_LASER, initial_value=True)

def handle_toggle_change(read_toggle):
    toggle_data = utility.sanitizeJson(read_toggle)

    if toggle_data['element'] == 'SERB_TOGGLE_BEC':
        print(settings.SERB_TOGGLE_BEC, toggle_data['value'])
        toggleSERB_TOGGLE_BEC.toggle()
    elif toggle_data['element'] == 'SERB_TOGGLE_GIMBAL':
        print(settings.SERB_TOGGLE_GIMBAL, toggle_data['value'])
        toggleSERB_TOGGLE_GIMBAL.toggle()
    elif toggle_data['element'] == 'SERB_TOGGLE_LIGHT':
        print(settings.SERB_TOGGLE_LIGHT, toggle_data['value'])
        toggleSERB_TOGGLE_LIGHT.toggle()
    elif toggle_data['element'] == 'SERB_TOGGLE_LASER':
        print(settings.SERB_TOGGLE_LASER, toggle_data['value'])
        toggleSERB_TOGGLE_LASER.toggle()
    else:
        print('Unknown toggle command received')

if __name__=="__main__":
    pass
