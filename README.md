# react-native-qiscus-sdk

## install package from [npm](https://www.npmjs.com/)

`git clone https://github.com/theredfoxfire/react-native-qiscus-sdk.git`

## example of usage

### Copy `QiscusSDK` folder, `configQiscus.js` file then paste into your project root directory

### Add following dependencies into your `package.json file`

```
"dependencies": {
  ...
  "class-autobind": "^0.1.4",
  "color": "^0.11.3",
  "lodash": "^4.13.1",
  "moment": "^2.13.0",
  "native-base": "2.1.4",
  "react-native-document-picker": "^2.1.0",
  "react-native-easy-grid": "0.1.8",
  "react-native-file-uploader": "0.0.2",
  "react-native-image-picker": "^0.26.7",
  "react-native-modalbox": "^1.3.4",
  "react-navigation": "^1.0.0-beta.13",
  "react-redux": "^5.0.2",
  "redux": "^3.6.0",
  "redux-form": "^6.7.0",
  "redux-persist": "^4.0.0",
  "redux-thunk": "^2.2.0",
  "remote-redux-devtools": "^0.5.0"
  ...
},

```

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

#### If you got `ENOENT: no such file or directory, uv_chdir`, make sure you have create index.ios.js / index.android.js file on your root project directory

## TO DO:

Publish lib into NPM
