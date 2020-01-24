"use strict"

const execa = require("execa")
const fs = require("fs-extra")
const signalExit = require("signal-exit")
const uniqueString = require("unique-string")
const paramNames = require("get-parameter-names")
const path = require("path")
const rollup = require("rollup")
const resolve = require("@rollup/plugin-node-resolve")
const commonjs = require("@rollup/plugin-commonjs")
const babel = require("rollup-plugin-babel")
const normalizeNewline = require("normalize-newline")
const { default: ow } = require("ow")
const { default: is } = require("@sindresorhus/is")

module.exports = async (input, args = [], { cwd = process.cwd() } = {}) => {
	ow(input, ow.any(ow.string, ow.function))
	ow(args, ow.array)
	ow(cwd, ow.string)

	const id = uniqueString()
	const filename = path.resolve(cwd, `.${id}.js`)
	const bundled = path.resolve(cwd, `.${id}.bundle.js`)

	const code = is.function_(input) ? `
const fn = ${input.toString()}

WScript.StdOut.Write(fn(...${JSON.stringify(args)}))
	` : `
const args = ${JSON.stringify(args)}

const fn = () => {
	${input.toString()}
}

WScript.StdOut.Write(fn())
	`

	signalExit(() => {
		fs.removeSync(filename)
		fs.removeSync(bundled)
	})

	await fs.writeFile(filename, code)

	const bundle = await rollup.rollup({
		input: filename,
		plugins: [resolve(), commonjs(), babel({
			presets: ["@babel/preset-env"]
		})]
	});

	await bundle.write({
		file: bundled,
		format: "commonjs"
	});

	const { stdout } = await execa("cscript", ["//B", "//Nologo", "//U", "//E:jscript", bundled], { cwd })

	await fs.remove(filename)
	await fs.remove(bundled)

	return normalizeNewline(stdout)
}
