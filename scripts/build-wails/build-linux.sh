#! /bin/bash

echo -e "Start running the script..."
cd ../../

echo -e "Start building the app for linux platform..."
wails build --clean --platform linux -upx

echo -e "Fix bin folder permission"
sudo chmod -R 777 build/bin

echo -e "End running the script!"
