#!/bin/bash
read -p "Enter the commit message : " commitMessage
yarn build
git add .
git commit -m "$commitMessage"
git push