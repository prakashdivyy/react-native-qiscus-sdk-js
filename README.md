# react-native-qiscus-sdk

## install package from [npm](https://www.npmjs.com/)

`git clone https://github.com/theredfoxfire/react-native-qiscus-sdk.git`

## example of usage

### Copy `QiscusSDK` folder, `configQiscus.js`, `package.json` file then paste into your project root directory

### Go to project directory remove `node_modules` directory and run `npm install`


### File config `configQiscus.js` will look like

```
// configQiscus.js

export const userAuth = {
  email: 'fikri@qiscus.com',
  password: 'password',
  displayName: 'fikri',
}

```

### Your code insdie index.ios.js / index.android.js will look like
```

import { AppRegistry } from 'react-native';
import setup from './QiscusSDK/js/setup';

AppRegistry.registerComponent('YourProjectName', setup);

```

#### Run `react-native run-android / react-native run-ios`

## TO DO:

Publish lib into NPM
