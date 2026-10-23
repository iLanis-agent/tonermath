const fs = require("fs");
eval(fs.readFileSync("engine.js", "utf8"));
const exp = JSON.parse(fs.readFileSync("expected.json", "utf8"));
const fns = { cartridges: cartridgesTruth, days: daysTruth, cost: costTruth, time: timeTruth };
let fail = 0;
for (const c of exp.cases) {
  const got = fns[c.fn](...c.args);
  if (got !== c.expect) { fail++; console.log("MISMATCH", c.fn, c.args, "\n got:", got, "\n exp:", c.expect); }
}
const ERRS = ["the pages must be from 1 to 1000000 with no decimal places",
  "the pages a cartridge must be from 1 to 100000 with no decimal places",
  "the pages a day must be from 1 to 100000 with no decimal places",
  "the pages a minute must be from 1 to 1000 with no decimal places",
  "the cartridges must be from 1 to 10000 with no decimal places",
  "the cartridge price must be from 0.01 to 999.99 with up to 2 decimal places"];
for (const [fn, args] of exp.errors) {
  let threw = null;
  try { fns[fn](...args); } catch (e) { threw = e.message; }
  if (!threw || !ERRS.includes(threw)) { fail++; console.log("ERRCASE FAIL", fn, args, "->", threw); }
}
console.log(fail ? `${fail} FAILURES` : "all green");
process.exit(fail ? 1 : 0);
