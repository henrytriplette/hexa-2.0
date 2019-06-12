#!/usr/bin/env python
# Handle all speech

from modules import utility

import settings

def handle_text_to_speech(line):
    print('Hera Says: ', str(line))

def handle_play_audio(play_data):
    play_data = utility.sanitizeJson(play_data)
    print('Hera Plays: ', str(play_data))

if __name__=="__main__":
    pass
