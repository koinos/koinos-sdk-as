FROM ubuntu:jammy as builder
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
    apt clean

ADD ./docker/ /opt/koinos-sdk/as

ADD ./package.json /tmp/package.json
RUN /opt/koinos-sdk/as/build_helpers/configure_project.sh && \
    cp -R /tmp/koinos-proto/koinos /opt/koinos-sdk/as/project/ && \
    cp -R /tmp/koinos-proto/koinos /opt/koinos-sdk/as/project/ && \
    rm -rf /opt/koinos-sdk/as/docker/build_helpers

FROM ubuntu:jammy
ENV DEBIAN_FRONTEND noninteractive

RUN apt update && \
    apt install -y \
        curl \
        gnupg

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -

RUN apt update && \
    apt install -y \
        yarn \
        nodejs && \
    apt clean

COPY --from=builder /opt /opt

ENTRYPOINT [ "/opt/koinos-sdk/as/scripts/build.sh" ]
