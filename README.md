# settle-all-promises
Utility to run multiple promises &amp; deliver execution results of all Promises at a time.

An alternative to `Promise.allSettled()` method for versions of node prior to `12.9.0`

# Installation

```sh
npm i settle-all-promises --save
```

# Use

```javascript
var settle = require('settle-all-promises').settle;
var stat = require('settle-all-promises').stat;

var p0  = new Promise((resolve, reject) => {
    resolve('p0 result')
});

var p1  = new Promise((resolve, reject) => {
    resolve({'message' : 'p1 result message'})
});

var p2  = new Promise((resolve, reject) => {
    reject('p2')
});

settle([p0, p1, p2]).then(results => {
    // p0 result at index 0
    console.log('p0 isResolved() ' + results[0].isResolved);
    console.log(results[0].resultData);

    // p1 result at index 1
    console.log('p1 isResolved() ' + results[1].isResolved);
    console.log(JSON.stringify(results[1].resultData));

    // p2 result at index 2
    console.log('p2 isResolved() ' + results[2].isResolved);
    console.log('p2 isRejected() ' + results[2].isRejected);
    console.log(results[2]);

    // Print statistics of execution
    console.log(JSON.stringify(stat(results)));
})
```

### Output

```sh
p0 isResolved() true
p0 result
p1 isResolved() true
{"message":"p1 result message"}
p2 isResolved() false
p2 isRejected() true
PromiseResult {
  _original: Promise { <rejected> 'p2' },
  _resultData: null,
  _errorData: 'p2'
}
{"resolvedCount":2,"rejectedCount":1}
```
### Note

Use of arrow OR Lambda function syntax may not be allowed in older node versions prior to `4.2.4` use normal function callbacks syntax instead. Take look at example below,

```javascript
// Using arrow function AKA Lambda function
settle([p0, p1, p2]).then(results => {
   // Process results here
});

// Using normal function callback
settle([p0, p1, p2]).then(function(results) {
   // Process results here
});

// Using async-await
async function callSettle() {
  const results = await settle([p0, p1, p2]);
  // Process results here
}
```

For additional examples checkout the test\index.test.ts file.
# Compatibility
Min node version tested against -> `v0.12.0`
Max node version tested against -> `v14.3.0` 