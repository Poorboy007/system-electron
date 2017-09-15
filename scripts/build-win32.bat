set PLATFORM=%1%
set ARCH=%2%
set APP_NAME="System-EL"

set ignore_list="dist|scripts|\.idea|.*\.md|.*\.yml|node_modules/nodejieba"

electron-packager . "%APP_NAME%" --platform=%PLATFORM% --arch=%ARCH% --version=1.6.2  --app-version=1.5.0 --asar --icon=assets\icon.png --overwrite --out=.\dist --ignore=%ignore_list%