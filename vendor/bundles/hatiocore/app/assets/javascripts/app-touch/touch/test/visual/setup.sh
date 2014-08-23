#!/bin/sh
cd `dirname $0`
cd ../../
compass compile -f resources/sass/
./build-touch-charts.sh `pwd`/../../charts
