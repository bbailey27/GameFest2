# Live Site

https://bbailey27.github.io/GameFest2/

# Purpose

The original purpose of this site is to facilitate random table assignments for a multi-round game tournament. The tool is an algorithm for assigning people to tables of varying size, and ensuring that various goals are met when rotating people between tables. Using the controls, you can optimize to avoid participants playing with the same people too often or staying at the same table for multiple rounds. You can choose to generate a certain number of random assignments and keep the best one for your chosen goals (e.g. moving tables, seeing different people). Or you can choose to run it until specific constraints are met (e.g. the maximum number of times 2 players can be assigned to the same table). Please note that your specific setup will affect the level of optimization possible (e.g. if you have larger tables, it's much harder for everyone to avoid playing with someone twice).

The output is a Text file. Each person's entry includes their assigned tables for each round as well as the assigned game (if entered).

---

# Create React App Docs

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
