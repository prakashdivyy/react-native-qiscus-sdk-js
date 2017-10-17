# react-native-qiscus-sdk

## example of usage

### 1) Install from npm

`npm install --save react-native-qiscus-sdk`

Beware please since this SDK use native-base component which require `"react-native": "0.45.1"` higher react-native version not supported yet, lower version are welcome.

You can specified react-native version in your new project by run this command `react-native init AppSDK --version 0.45.1`

### 2) Run React Native Link

```

react-native-vector-icons

```

### 3) Create new file `configQiscusSDK.js`

In your project root directory, Your `configQiscusSDK.js` will look like

```
// configQiscusSDK.js

export const userAuth = {
  email: 'fikri@qiscus.com',
  password: 'password',
  displayName: 'fikri',
}

```

### 4) Your code insdie index.ios.js / index.android.js will look like

```

import { AppRegistry } from 'react-native';
import setup from 'react-native-qiscus-sdk';

AppRegistry.registerComponent('YourProjectName', setup);

```

#### Run `react-native run-android / react-native run-ios`

#### If you got `ENOENT: no such file or directory, uv_chdir`, make sure you have create index.ios.js / index.android.js file on your root project directory
