# react-native-qiscus-sdk

## Clone this repo

`git clone https://github.com/qiscus/react-native-qiscus-sdk-js.git`

## example of usage

### Install from npm

`npm install --save react-native-qiscus-sdk`

Beware please since this SDK use native-base component which require `"react-native": "0.45.1"` higher react-native version not supported yet, lower version are welcome.

You can specified react-native version in your new project by run this command `react-native init AppSDK --version 0.45.1`

### Go to project directory remove `node_modules` directory and run `npm install`

### Run `react-native link`


### Create new file `configQiscus.js`, in your project root directory, Your `configQiscus.js` will look like

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
