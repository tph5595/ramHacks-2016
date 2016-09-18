#!/bin/bash
rm index.h*
rm *.class
javac *.java
java getIt
for i in `cat urls.txt`
do
	wget $i
done 
