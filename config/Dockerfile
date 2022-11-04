# build & run with docker

FROM nginx:latest

# override default configuration
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./security-headers.conf /etc/nginx/security-headers.conf

# using nginx envsubst for environment-variables inside the configuration.
# the DOLLAR env-var is used as a workaround to still be able to use the $ character
#ENV DOLLAR $
#COPY ./default.conf.template /etc/nginx/templates/

# support running as arbitrary user which belogs to the root group
RUN chmod -R g=u /var/cache/nginx /var/log/nginx /etc/nginx && \
    chmod g=u /var/run

# copy the web-application
COPY ./dist /usr/share/nginx/html

#EXPOSE 8080