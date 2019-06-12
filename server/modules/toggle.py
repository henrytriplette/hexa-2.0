#!/usr/bin/env python
# Handle all toggle

from modules import utility

import settings

def handle_toggle_change(read_toggle):
    toggle_data = utility.sanitizeJson(read_toggle)

    if toggle_data['element'] == 'SERB_TOGGLE_BEC':
        print('BEC is now:', toggle_data['value'])
    elif toggle_data['element'] == 'SERB_TOGGLE_GIMBAL':
        print('Gimbal is now:', toggle_data['value'])
    elif toggle_data['element'] == 'SERB_TOGGLE_LIGHT':
        print('Light is now:', toggle_data['value'])
    elif toggle_data['element'] == 'SERB_TOGGLE_LASER':
        print('Laser is now:', toggle_data['value'])
    else:
        print('Unknown toggle command received')

if __name__=="__main__":
    pass
