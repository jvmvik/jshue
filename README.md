# JSHue
## Web application for Hue 

This application enables to control the Philips Hue HUB.

It's pretty simple open source application that demonstrate how to implement a pure ES6 / HTML5 application.

The template was designed with Semantic UI.

Docker
---
This project can run on Docker on server hosted at home.
or for debug purpose docker provide a efficient way to distribute a web application.

$>cd docker
$>docker build -t shue .
$>docker run shue
$>open localhost:9000

IoT projects 
---

This application can be hosted on a Raspberry PI or accessed over a local network. It will let anybody control the light within the network without having to install Philips Hue software.

I believe this simple design refer as "compute at the edge" makes sense for connected device accross a local network. This application does not required any dependency to a cloud resource.

To install on Raspberry PI, there is large number of OS or HTTP web server available.

I would recommend Alpine RPI that runs only on RAM. So, it is really fast operating system.

And light HTTP server is probably the best option in term of speed.

see: docker/Dockerfile for example of configuration for lighthttp