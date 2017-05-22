image=iot/shue
port=9000

all: build run

build:
	docker build -f docker/Dockerfile -t $(image) .
run:
	docker run --rm  -p $(port):$(port) $(image)

debug:
	docker run -i -t $(image) /bin/sh 