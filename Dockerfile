FROM ubuntu:focal
ENV DEBIAN_FRONTEND noninteractive

RUN apt update && \
    apt install -y \
        curl \
        gnupg \
        jq

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -

RUN apt update && \
    apt install -y \
        yarn \
        nodejs && \
    apt clean

ADD ./docker/ /opt/as

ADD ./package.json /tmp/package.json
RUN /opt/as/build_helpers/configure_project.sh && \
    rm /tmp/package.json && \
    rm -rf /opt/as/build_helpers

ENTRYPOINT [ "/opt/as/scripts/build.sh" ]
