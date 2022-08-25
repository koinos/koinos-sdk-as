#! /bin/bash

cd /opt/koinos-sdk/as/project
version=`cat /tmp/package.json | jq '.version'`
yarn add --dev @koinos/sdk-as@${version:1:-1}
yarn install
