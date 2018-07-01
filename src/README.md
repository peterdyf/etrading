MYSQL charset
ALTER DATABASE xiaoqi CHARACTER SET utf8 COLLATE utf8_unicode_ci;

sudo launchctl load -w /Library/LaunchDaemons/com.xiaoqi.etrading.plist
sudo launchctl unload -w /Library/LaunchDaemons/com.xiaoqi.etrading.plist
