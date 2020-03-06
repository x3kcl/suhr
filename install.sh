#!/bin/bash
echo "Deployment START"
chown cloud.cloud -R /root/www
mv /root/www /home/cloud/docker/
rm -rf /home/cloud/docker/suhr
rm /root/www.tar.bz
mv /home/cloud/docker/www /home/cloud/docker/suhr
chown cloud.cloud -R /home/cloud/docker/suhr
echo "Stop docker"
su -c "docker-compose -f /home/cloud/docker/docker-compose.yml stop" cloud
echo "Start docker"
su -c "docker-compose -f /home/cloud/docker/docker-compose.yml up -d" cloud
echo "Deployment END"