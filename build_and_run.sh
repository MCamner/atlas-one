#!/bin/bash
set -e
mkdir -p dist
javac -d dist src/AtlasServer.java
java -cp dist AtlasServer
