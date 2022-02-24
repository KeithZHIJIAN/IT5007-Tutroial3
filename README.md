### If node is set up, ignore this part
```
nvm install 10
nvm alias default 10
node --version
npm --version
npm install -g npm@6
npm init
npm install express
npm uninstall express
npm install express@4
```

### Generally you will need to set up Babel first
```
npm install --save-dev @babel/core@7 @babel/cli@7
node_modules/.bin/babel --version
npx babel --version
npm install --save-dev @babel/preset-react@7
```

### Then use these instructions to compile and run
```
npx babel src --presets @babel/react --out-dir public
npm start
```
