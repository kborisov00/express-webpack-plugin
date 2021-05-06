# Express.js Webpack Plugin
> Hot reload for your webpack-bundled express application without adding any code to the application's source code

### How To Use It
- install the package using npm / yarn
```
yarn add -D express-webpack-plugin
```

```
npm install -D express-webpack-plugin
```

- create an instance of the plugin in your webpack configuration and add it to the plugins array
  
```javascript
    const ExpressWebpackPlugin = require('express-webpack-plugin');

    // ...

    module.exports = {

        // ...

        plugins: [ new ExpressWebpackPlugin() ],

        // ...
    }
```

- the plugin only supports the output filename to be "index.js"

```javascript
    // ...

    module.exports = {

        // ...

        output: {
            // ...

            filename: 'index.js',

            // ...
        },

        // ...
    }
```