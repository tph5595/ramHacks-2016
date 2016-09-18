#!/bin/bash
docker build tph5595:v1 .
rm index.h*
rm *.class
javac *.java
java getIt
for i in `cat urls.txt`
do
	wget $i
done 
