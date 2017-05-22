# JSHue
## Web application for Hue 

This application enables to control the Philips Hue HUB.

It's pretty simple open source application that demonstrate how to implement a pure ES6 / HTML5 application.

The template was designed with Semantic UI.

Docker
---
This project can run on Docker on server hosted at home.
or for development purpose docker provide a efficient way to test a web application.

# Manually
```bash
$>cd docker 
$>docker build -t shue . 
$>docker run -p 9000:9000 shue 
$>open localhost:9000
```

# Automated Makefile
```bash
$>make build run
$>open localhost:9000
```

Of course, you must install Docker on your system first.

IoT projects 
---

This application can be hosted on a Raspberry PI or accessed over a local network. It will let anybody control the light within the network without having to install Philips Hue software.

I believe this simple design refer as "compute at the edge" makes sense for connected device accross a local network. This application does not required any dependency to a cloud resource.

To install on Raspberry PI, there is large number of OS or HTTP web server available.
To serve the static pages, light HTTP server is probably the best option in term of speed.
see: docker/Dockerfile for example of configuration for lighthttp

I would recommend Alpine RPI that runs only on RAM. So, it is really fast Operating System
 and it works beautifully well on Docker.
 
Because Alpine runs on RAM there is no persistency if you reboot. 
To fix that you must persist the application directory.

Here is a quick tutorial to keep you going.
```bash
$>su
$>mkdir /app/jshue
# Copy application files from this repository
# Mark directory to be persisted if lbu commit is executed
# Note: Memory usage increase based on the file size
$>lbu include /app
# Save the /app directory content and configuration files under /etc
$>lbu commit 

# Configure light http to point to server this directory
# see: docker/lighthttp.conf
# Reboot lighthttp
$>rc-service lighthttp restart
# Save configuration
$>lbu commit
```
Now you should be able to connect to the IP address of the raspberry PI 
 and initialize the connection with the Hue HUB.
 
