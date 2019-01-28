Demonstration of a family tree built with [vx](https://github.com/hshoff/vx) which combines [d3]() with reusable [React](https://github.com/facebook/react) Components.

# Features

1. Multiple Partners with no link to ancestors
1. Loading node details on clicking on it (WIP)
1. Showing member avatars inside the node
1. Differentiating female & other genders
1. Starting the tree with parent(s) of source node/member

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run server`

Runs an [http-server](https://github.com/indexzero/http-server) to serve the static files inside `src` directory (currently [d3-single-spouse.html](./src/d3-single-spouse.html)).

### `npm run deploy`

It deploys the code to [now.sh](https://zeit.co/now) and run the build on [vk-ft.now.sh](https://vk-ft.now.sh)
