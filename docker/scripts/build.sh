#! /bin/bash

# copy sources in to project
mkdir -p /tmp/as/project && cp -r /opt/as/project/* /tmp/as/project
cd /src
mkdir -p /tmp/as/project/assembly/proto
find . -name \*.proto -exec cp {} /tmp/as/project/assembly/proto/ \;
find . -name \*.ts    -exec cp {} /tmp/as/project/assembly/ \;

# build contract
cd /tmp/as/project
yarn install
yarn build:release

# copy build artifacts
if [ $? -eq 0 ]; then
   USER=`stat -c "%u" /src/*.ts | head -n 1`
   GROUP=`stat -c "%g" /src/*.ts | head -n 1`

   cp -f build/release/contract.wasm /src
   chown $USER:$GROUP /src/contract.wasm

   if [ -e abi/*.abi ]; then
      cp -f abi/*.abi /src
      chown $USER:$GROUP /src/*.abi
   fi

   if [ -e abi/*-abi.json ]; then
      cp -f abi/*-abi.json /src
      chown $USER:$GROUP /src/*-abi.json
   fi
fi

# cleanup
cd ~
rm -rf /tmp/project/as
