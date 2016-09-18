#!/bin/bash
docker build tph5595:v1 .
rm index.h*
rm *.txt
rm *.class
javac *.java
java getIt The*.html
for i in `cat urls.txt`
do
	wget $i
	java Parse $i index.html
	rm index.html
done 
