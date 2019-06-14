#!/usr/bin/env python
# Handle all hexapod related values
import os

import settings

def handle_camera_start(camera_data):
    print('Start Camera')
    os.system('sudo bash resources/shell/camera_stream.sh')
    os.system('sudo bash resources/shell/camera_stream_ps3.sh')

if __name__=="__main__":
    pass
