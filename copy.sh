umount /mnt/orangepi
sshfs -o allow_other,default_permissions root@192.168.1.93:/ /mnt/orangepi
GOARCH=arm64 GOOS=linux go build -ldflags "-s -w" -buildvcs=false -o app .
cp app /mnt/orangepi/root/.gam-app/maldan-gam-app-memoman-v0.0.5