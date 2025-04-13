#! /bin/bash
pushd $(dirname "$0")
cd ..

npm run build
firebase deploy

popd

