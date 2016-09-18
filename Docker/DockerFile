#RamHacks-2016 Amazom echo schedualer
FROM ubuntu:14.04
MAINTAINER Taylor Henderson <tph5595@verizon.net>
RUN apt-get -y update 
RUN apt-get -y upgrade
RUN apt-get -y install git python
RUN git clone http://github.com/tph5595/ramHacks-2016.git; exit 0
RUN cd ramHacks-2016/Regex/
RUN echo 'python -m SimpleHTTPServer 8090' >> /etc/rc.local
