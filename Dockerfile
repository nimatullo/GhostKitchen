FROM node as react_build
WORKDIR /app
COPY /frontend-react-user /app/user/
RUN npm install --silent --prefix /app/user/
RUN npm run build --prefix /app/user/

COPY /frontend-react-owner /app/owner
RUN npm install --silent --prefix /app/owner
RUn npm run build --prefix /app/owner

## NGINX ##
FROM nginx:1.16.0-alpine
COPY --from=react_build /app/user/build /usr/share/nginx/html/user
COPY --from=react_build /app/owner/build /usr/share/nginx/html/owner
RUN rm /etc/nginx/conf.d/default.conf
COPY /frontend-react-user/nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]