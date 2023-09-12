#! /bin/bash

# copy sources in to project
mkdir -p /tmp/project && cp -r /opt/koinos-sdk/as/project/* /tmp/project
cd /src
mkdir -p /tmp/project/assembly/proto
find . -name \*.proto -exec cp {} /tmp/project/assembly/proto/ \;
find . -name \*.ts    -exec cp {} /tmp/project/assembly/ \;

# build contract
cd /tmp/project
yarn install
yarn build:release

# copy build artifacts
if [ $? -eq 0 ]; then
   mkdir -p /src/build

   USER=`stat -c "%u" /src/*.ts | head -n 1`
   GROUP=`stat -c "%g" /src/*.ts | head -n 1`

   cp -f build/release/contract.wasm /src/build
   chown $USER:$GROUP /src/build/contract.wasm

   if [ -e abi/*.abi ]; then
      cp -f abi/*.abi /src/build
      chown $USER:$GROUP /src/build/*.abi
   fi

   if [ -e abi/*-abi.json ]; then
      cp -f abi/*-abi.json /src/build
      chown $USER:$GROUP /src//build/*-abi.json
   fi
fi

# cleanup
cd ~
rm -rf /tmp/project/as
