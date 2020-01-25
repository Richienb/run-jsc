interface Options {
	/** Current working directory of the child process. */
	cwd?: string
}

/**
 * Run JScript code and retrieve the result.
 * @param input The input function.
 * @param args The arguments to pass to the function.
 * @param options Options.
 * @example
 * ```
 * const runJsc = require("run-jsc");
 *
 * (async () => {
 * 	const result = await runJsc((unicorn, horse) => {
 * 		return `I love ${unicorn} & ${horse}`;
 * 	}, ['🦄', '🐴']);
 *
 * 	console.log(result);
 * 	//=> 'I love 🦄 & 🐴'
 * })()
 * ```
*/
declare function runJsc<T extends (...args: U) => unknown, U extends any[]>(input: T | string, args: U, options?: Options): ReturnType<T>

export = runJsc
