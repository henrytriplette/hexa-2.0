#!/usr/bin/env python
# Handle all toggle

# from periphery import GPIO

from modules import utility

import settings

def handle_toggle_change(read_toggle):
    toggle_data = utility.sanitizeJson(read_toggle)

    if toggle_data['element'] == 'SERB_TOGGLE_BEC':
        toggleGpio(settings.SERB_TOGGLE_BEC, toggle_data['value'])
    elif toggle_data['element'] == 'SERB_TOGGLE_GIMBAL':
        toggleGpio(settings.SERB_TOGGLE_GIMBAL, toggle_data['value'])
    elif toggle_data['element'] == 'SERB_TOGGLE_LIGHT':
        toggleGpio(settings.SERB_TOGGLE_LIGHT, toggle_data['value'])
    elif toggle_data['element'] == 'SERB_TOGGLE_LASER':
        toggleGpio(settings.SERB_TOGGLE_LASER, toggle_data['value'])
    else:
        print('Unknown toggle command received')

def toggleGpio(pin, toggleStatus):
    print(pin, toggleStatus)
    # Open GPIO pin with output direction
    gpio_out = GPIO(pin, "out")
    gpio_out.write(toggleStatus)
    gpio_out.close()

if __name__=="__main__":
    pass
