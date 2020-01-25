const test = require("ava")
const runJsc = require(".")

test("main", async (t) => {
	if (process.platform === "win32") {
		t.is(await runJsc(() => "a"), "a")
	} else {
		t.pass()
	}
})
