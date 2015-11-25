#!/usr/bin/env bash

# Validate all the assets and compile them
grunt

# Wait for 3 seconds
ping 127.0.0.1 -n 3 > nul

# Add all the files
git add .

# Add a comment
git commit -m "New commit - No comments provided"

# Push the changes
git push origin master