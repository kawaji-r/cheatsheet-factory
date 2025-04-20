#! /bin/bash
pushd $(dirname "$0")
cd ..

npm run build
export GOOGLE_APPLICATION_CREDENTIALS="../firebase-adminsdk.json"
firebase deploy

popd

