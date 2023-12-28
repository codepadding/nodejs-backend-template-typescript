# build image
sudo docker build . -t codepadding/node-web-app:v0.0.1
# run Conatiner
sudo docker run -p 3000:3000 -d codepadding/node-web-app
sudo docker run -p 5000:3000 -d codepadding/node-web-app


# Show list of docker image
sudo docker image ls
or
sudo docker images



# List Docker Containers
sudo docker ps
sudo docker ps -a
docker container ls -a


V1.3
