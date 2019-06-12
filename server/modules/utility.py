#!/usr/bin/env python
# Handle utility and miscellanea

import os
import json

from flask import Flask, render_template
from flask_socketio import SocketIO, send, emit

import settings

def loadAndSendContent(jsonFile, emitName):
    print('Loading:', jsonFile)
    with open(jsonFile) as f:
        d = json.load(f)
        emit(emitName, d)

def loadAndSendFiles(filePath, emitName):
    data = {}

    for root, dirs, files in os.walk(filePath):
        for filename in files:
            local_path = os.path.join(root, filename)
            data[filename] = local_path.replace("\\", "/") #Helps keep constant filebath on Win

    json_data = json.dumps(data)
    emit(emitName, json_data)

def sanitizeJson(input):
    output = str(input).replace("'", "\"")
    return json.loads(output)
