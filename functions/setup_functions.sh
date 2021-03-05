### Run from ./McHugo/ directory.

#copy package.json file to root directory
cp ./functions/package.json ./


### To test locally, you will need Node.js and the Netlify CLI, see installation instructions at
#- https://nodejs.org/fr/download/package-manager/
#- https://docs.netlify.com/cli/get-started/


#Install the Netlify CLI
npm install netlify-cli -g

#Install node packages locally
npm install

#Deploy on local server
netlify dev

#Deploy draft on netlify server
netlify build
netlify deploy

#Deploy draft to production
netlify deploy --prod
