#!/bin/bash

sudo apt-get install cups libcups2-dev
sudo usermod -a -G lpadmin pi
tar -xvzf starcupsdrv-src-3.7.0.tar.gz
cd starcupsdrv
sudo make
sudo make install