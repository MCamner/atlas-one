#!/bin/bash
set -e
APP_NAME="Atlas Studio v12 Mac"
mkdir -p dist/app
javac -d dist src/AtlasServer.java
jar --create --file dist/atlas-studio-v12.jar -C dist .
jpackage \
  --type app-image \
  --name "$APP_NAME" \
  --input dist \
  --main-jar atlas-studio-v12.jar \
  --main-class AtlasServer \
  --dest dist/app
