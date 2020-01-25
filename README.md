# Run Jsc [![Travis CI Build Status](https://img.shields.io/travis/com/Richienb/run-jsc/master.svg?style=for-the-badge)](https://travis-ci.com/Richienb/run-jsc)

Run JScript code and retrieve the result.

[![NPM Badge](https://nodei.co/npm/run-jsc.png)](https://npmjs.com/package/run-jsc)

## Install

```sh
npm install run-jsc
```

## Usage

```js
const runJsc = require("run-jsc");

(async () => {
	const result = await runJsc((unicorn, horse) => {
		return `I love ${unicorn} & ${horse}`;
	}, ['🦄', '🐴']);
	
	console.log(result);
	//=> 'I love 🦄 & 🐴'
})()
```

## API

### runJsc(input, args?, options?)

#### input

Type: `function | string`

The input function.

#### args

Type: `array`\
Default: `[]`

The arguments to pass to the function.

#### options

Type: `object`

##### cwd

Type: `string`\
Default: `process.cwd()`

Current working directory of the child process.

## Similar

- [run-jxa](https://github.com/sindresorhus/run-jxa) - Run Jxa code.
