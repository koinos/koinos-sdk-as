FROM ubuntu:focal
ENV DEBIAN_FRONTEND noninteractive

ENV KOINOS_PROTO_VERSION v0.4.0

RUN apt update && \
    apt install -y \
        curl \
        gnupg \
        jq \
        git

RUN cd /tmp && \
    git clone https://github.com/koinos/koinos-proto --branch $KOINOS_PROTO_VERSION


RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -

RUN apt update && \
    apt install -y \
        yarn \
        nodejs && \
    apt remove git -y && \
    apt clean

ADD ./docker/ /opt/as

ADD ./package.json /tmp/package.json
RUN /opt/as/build_helpers/configure_project.sh && \
    cp -R /tmp/koinos-proto/koinos /opt/as/project/ && \
    cp -R /tmp/koinos-proto/koinos /opt/as/project/ && \
    rm -rf /tmp/koinos-proto && \
    rm /tmp/package.json && \
    rm -rf /opt/as/build_helpers

ENTRYPOINT [ "/opt/as/scripts/build.sh" ]
