#!/bin/sh
UNAME="$(uname)"
if [ $UNAME = "Darwin" ]; then
    OS="mac"
else
    OS="linux"
fi
CURRENT_DIR="$(dirname $0)"
cd $CURRENT_DIR/
hammerjs ./build-data.js > ../data.js
