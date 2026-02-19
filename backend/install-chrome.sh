#!/bin/bash
# Install Chrome for Puppeteer on Render

# Download and install Chrome
npx puppeteer browsers install chrome

# Or alternatively, install via apt if available
# apt-get update && apt-get install -y chromium-browser

echo "Chrome installation complete"
