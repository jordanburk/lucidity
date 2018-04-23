# genesis

A 'lightweight' starterkit for Preact + unistore + Firebase. Firebase is a
heavy dependency and needs some investigation.

## get started

- install node & npm
- install yarn
- install firebase-tools # the firebase cli
- make a firebase project via the console
- `firebase init` # might not need to do this --- don't want to overwrite firebase.json
  - don't overwrite the index.js
  - no need for an alias (similar to a git branch)
- `yarn` # install dependencies
- `firebase setup:web` # display required configuration
- edit the creds in `utils/firebase` to match the above
- `yarn dev` # runs webpack, watching for code changes, to build the bundle
- `yarn start` # starts the firebase server, which will serve the latest bundle
- `yarn open`
- refresh whenever you make code changes

## structure

- Firebase lives in `utils/firebase`. Use it for all imports and exports
- `store` assimilates all initial state in `index.js`
- nothing is set in stone

## ps

This is not complete.
