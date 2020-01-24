/**
 * My awesome module.
 * @param input Lorem ipsum.
 * @param postfix Lorem ipsum.
 * @example
 * ```
 * const theModule = require("the-module");
 * theModule("unicorns");
 * //=> 'unicorns & rainbows'
 * ```
*/
declare function runJsc<T extends (...args: U) => unknown, U extends any[]>(input: T | string, args: U): ReturnType<T>

export = runJsc
