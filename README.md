## Calminha

Calminha is a NodeJS module to queue calls to a function and enforce a minimum interval between calls. It is also a portuguese word for "take it easy".

### Instalation

```sh
npm install calminha
```

### Usage

```js
var calminha = require("calminha");
var proxy    = calminha("check-auth", checkAuthentication, { interval: 500 });

// an example of calling the proxy, the prototype
// is exactly as the hypothetical checkAuthentication
proxy("username", "password", function (err) {
    // ...
});
```
