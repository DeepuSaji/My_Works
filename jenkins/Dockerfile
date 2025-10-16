FROM jenkins/jenkins:lts

USER root

RUN apt-get update && apt-get install -y git curl sudo && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean

RUN apt-get update && apt-get install -y docker.io && apt-get clean

EXPOSE 8081 50000