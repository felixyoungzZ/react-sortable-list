#!/bin/bash

rm -rf dist && yarn build && \
cd dist && git init && git add . \
&& git commit -m "chore(*): deploy github pages" && \
git remote add origin git@github.com:felixyoungzZ/react-sortable-list.git && \
git push --force origin master:gh-pages