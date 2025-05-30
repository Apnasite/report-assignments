# Use the official lightweight NGINX image
FROM nginx:alpine

# Remove the default NGINX web content
RUN rm -rf /usr/share/nginx/html/*

# Copy your repo's SubmittedAssignments folder to the NGINX html folder
COPY SubmittedAssignments /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]