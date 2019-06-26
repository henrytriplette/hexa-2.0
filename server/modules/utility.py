#!/usr/bin/env python
# Handle utility and miscellanea

import os
import json

from flask import Flask, render_template
from flask_socketio import SocketIO, send, emit

import settings

# Load a Json file and send his contents via event
def loadAndSendContent(jsonFile, emitName):
    print('Loading:', jsonFile)
    with open(jsonFile) as f:
        d = json.load(f)
        emit(emitName, d)

# List files in filePath and return them as Json object via event
def loadAndSendFiles(filePath, emitName):
    data = {}

    for root, dirs, files in os.walk(filePath):
        for filename in files:
            local_path = os.path.join(root, filename)
            data[filename] = local_path.replace("\\", "/") #Helps keep constant filebath on Win

    json_data = json.dumps(data)
    emit(emitName, json_data)

# Simple Json cleanup utility
def sanitizeJson(input):
    output = str(input).replace("'", "\"")
    return json.loads(output)

# Convert value from range 1 to corresponding value in range 2
# Usage: x = convertRange( 10, [0, 20], [0, 200]), x = 100.0
def convertRange( value, r1, r2 ):
    return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
