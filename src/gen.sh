#!/bin/bash
#!/bin/bash
# Delete all containers
docker rm $(docker ps -a -q)
# Delete all images
docker rmi $(docker images -q)
docker build tph5595:v1 .
rm index.h*
rm *.class
javac *.java
java getIt
for i in `cat urls.txt`
do
	wget $i
done 
