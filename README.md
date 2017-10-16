# react-native-qiscus-sdk

## install package from [npm](https://www.npmjs.com/)

`git clone https://github.com/theredfoxfire/react-native-qiscus-sdk.git`

## example of usage

### Go to project directory and run npm install

`npm install`

### 1 create file config configQiscus.js inside your root project directory (same level as your inde.ios.js)

```
// configQiscus.js

export const userAuth = {
  email: 'fikri@qiscus.com',
  password: 'password',
  displayName: 'fikri',
}

```

### 2 Create index.ios.js / index.android.js, Your code insdie index.ios.js / index.android.js
```

import { AppRegistry } from 'react-native';
import setup from 'react-native-qiscus-sdk';

AppRegistry.registerComponent('QiscusReactNative', setup);

```

### Run `react-native eject`

## Run `react-native link`
