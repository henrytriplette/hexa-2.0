#!/usr/bin/env python
# Handle gimbal

from modules import utility

import settings

def handle_play_gimbal(gimbal_data):
    gimbal_data = utility.sanitizeJson(gimbal_data)
    print(gimbal_data)

if __name__=="__main__":
    pass
