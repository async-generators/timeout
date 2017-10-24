# timeout
[![logo](https://avatars1.githubusercontent.com/u/31987273?v=4&s=110)][async-url]

terminate if the source yields too slow 

[![NPM version][npm-image]][npm-url]
[![Travis Status][travis-image]][travis-url]
[![Travis Status][codecov-image]][codecov-url]

## Usage

_package requires a system that supports async-iteration, either natively or via down-compiling_

### Install
```
yarn add @async-generators/timeout
```

This package's `main` entry points to a `commonjs` distribution. 

Additionally, the `module` entry points to a `es2015` distribution, which can be used by build systems, such as webpack, to directly use es2015 modules. 

## Api

### timeout(source, ms)

<code>timeout()</code> returns an iterable that, when iterated, wraps and iterates the source iterable. If the time taken to return `next()` is greater than `ms` then an error is thrown to signify timeout. 

## Example

example.js
```js
const timeout = require("@async-generators/timeout").default;

async function* source() {
  yield 1;
  await new Promise(r => setTimeout(r, 500));
  yield 2;
}

async function main() {
  for await (let item of timeout(source(), 250)) {
    console.log(item);
  }
}

main().catch(console.log);
```

Execute with the latest node.js: 

```
node --harmony-async-iteration example.js
```

output:
```
1
Error: timed out
```
## Typescript

This library is fully typed and can be imported using: 

```ts
import timeout from '@async-generators/timeout');
```

It is also possible to directly execute your [properly configured](https://stackoverflow.com/a/43694282/1657476) typescript with [ts-node](https://www.npmjs.com/package/ts-node):

```
ts-node --harmony_async_iteration example.ts
```

[npm-url]: https://npmjs.org/package/@async-generators/timeout
[npm-image]: https://img.shields.io/npm/v/@async-generators/timeout.svg
[npm-downloads]: https://img.shields.io/npm/dm/@async-generators/timeout.svg
[travis-url]: https://travis-ci.org/async-generators/timeout
[travis-image]: https://img.shields.io/travis/async-generators/timeout/master.svg
[codecov-url]: https://codecov.io/gh/async-generators/timeout
[codecov-image]: https://codecov.io/gh/async-generators/timeout/branch/master/graph/badge.svg
[async-url]: https://github.com/async-generators