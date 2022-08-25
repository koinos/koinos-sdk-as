#! /bin/bash

ls -la /opt/as
ls -la /opt/as/project

# copy sources in to project
mkdir -p /tmp/as/project && cp -r /opt/as/project/* /tmp/as/project
cd /src
ls -la
find . -name \*.proto -exec cp {} /tmp/as/project/assembly/proto/ \;
find . -name \*.ts    -exec cp {} /tmp/as/project/assembly/ \;

# build contract
cd /tmp/as/project
ls -la
ls -la assembly
ls -la assembly/proto
yarn install
yarn build:release

# copy build artifacts

if [ $? -eq 0 ]; then
   cp build/release/contract.wasm /src

   ls -la abi
   if [ -e abi/contract.abi ]; then
      cp abi/contract.abi /stc
   fi
fi

# cleanup
cd ~
rm -rf /tmp/project/as
