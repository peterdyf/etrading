MYSQL charset
ALTER DATABASE xiaoqi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

sudo chown root /Users/DiYifei/Library/LaunchDaemons/com.xiaoqi.etrading.plist
sudo chgrp wheel /Users/DiYifei/Library/LaunchDaemons/com.xiaoqi.etrading.plist
sudo launchctl load -w /Users/DiYifei/Library/LaunchDaemons/com.xiaoqi.etrading.plist
sudo launchctl unload -w /Users/DiYifei/Library/LaunchDaemons/com.xiaoqi.etrading.plist
