#RamHacks-2016 Amazon echo scheduler
FROM ubuntu:14.04
MAINTAINER Taylor Henderson <tph5595@verizon.net>
RUN apt-get -y update && apt-get install -y git
RUN git clone http://github.com/tph5595/ramHacks-2016.git
RUN cd ramHacks-2016/Regex/
RUN echo 'python -m SimpleHTTPServer 8090' >> /etc/rc.local
RUN apt-get install -y nodejs npm
RUN ln -s /usr/bin/nodejs /usr/bin/node
RUN echo 'node server.js' >> /etc/rc.local
RUN apt-get install -y python
RUN echo 'python gen.py' >> /etc/rc.local
