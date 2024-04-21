#! /bin/bash

echo -e "Start running the script..."
cd ../../

echo -e "Start building the app for windows platform..."
sudo rm -rf build/bin/midgard.exe build/bin/midgard-amd64-installer.exe
wails build --clean --platform windows/amd64 -nsis -upx

echo -e "Fix bin folder permission"
sudo chmod -R 777 build/bin

echo -e "End running the script!"
