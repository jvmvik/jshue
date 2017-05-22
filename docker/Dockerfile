FROM alpine:edge
ENV LANG C.UTF-8

RUN apk add --update --no-cache \
	lighttpd \
	lighttpd-mod_auth \
    && rm -rf /var/cache/apk/*

RUN touch /etc/lighttpd/lighttpd.conf

# Service user name
ENV username lighttpd

#RUN addgroup ${name}
#RUN adduser -s /sbin/nologin -g ${name} ${name}

RUN mkdir -p /run
RUN chown ${username}:${username} /run

USER ${username}

WORKDIR /app/shue

COPY  docker/lighttpd.conf /etc/lighttpd/

COPY index.html /app/shue
COPY semantic/dist /app/shue/semantic/dist
COPY http.js /app/shue
COPY app.js /app/shue

EXPOSE 9000

CMD ["lighttpd", "-D", "-f","/etc/lighttpd/lighttpd.conf"]