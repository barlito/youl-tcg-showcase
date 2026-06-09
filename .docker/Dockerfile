FROM nginx:1.29-alpine

COPY .docker/nginx/default.conf /etc/nginx/conf.d/default.conf

COPY index.html index.css /usr/share/nginx/html/
COPY css /usr/share/nginx/html/css
COPY js /usr/share/nginx/html/js
COPY img /usr/share/nginx/html/img
COPY public /usr/share/nginx/html/public
