#!/bin/bash
echo "Deployment START"
chown cloud.cloud -R /root/www
echo "move www"
mv /root/www /home/cloud/docker/
echo "Stop docker"
su -c "docker-compose -f /home/cloud/docker/docker-compose.yml stop" cloud
echo "remove old folder"
rm -rf /home/cloud/docker/suhr
echo "rename www"
mv /home/cloud/docker/www /home/cloud/docker/suhr
echo "adjust rights"
chown cloud.cloud -R /home/cloud/docker/suhr
echo "Start docker"
su -c "docker-compose -f /home/cloud/docker/docker-compose.yml up -d" cloud
rm /root/www.tar.bz
echo "Deployment END"