// Toner Math engine: the cartridges a print load takes, the days a cartridge lasts, the cost a page, and the minutes a load prints. Exact integers, half-up on display only. No named constants; every number is the owner's own entry.
function _i(t, err, digits, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  if (!new RegExp("^[0-9]{1," + digits + "}$").test(t)) throw new Error(err);
  var v = parseInt(t, 10);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _p(t, err, intDigits, places, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  var m = new RegExp("^([0-9]{1," + intDigits + "})(?:\\.([0-9]{1," + places + "}))?$").exec(t);
  if (!m) throw new Error(err);
  var v = parseInt(m[1], 10) * Math.pow(10, places) + (m[2] ? parseInt(m[2].padEnd(places, "0"), 10) : 0);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _m(v) {
  var w = Math.floor(v / 100), f = String(v % 100).padStart(2, "0");
  return w + "." + f;
}
function _pl(n, one, many) { return n + (n === 1 ? one : many); }
function _v(n, one, many) { return n === 1 ? one : many; }
var _PG = "the pages must be from 1 to 1000000 with no decimal places";
var _YL = "the pages a cartridge must be from 1 to 100000 with no decimal places";
var _DY = "the pages a day must be from 1 to 100000 with no decimal places";
var _PM = "the pages a minute must be from 1 to 1000 with no decimal places";
var _CT = "the cartridges must be from 1 to 10000 with no decimal places";
var _PR = "the cartridge price must be from 0.01 to 999.99 with up to 2 decimal places";

function cartridgesTruth(pages, yield_) {
  var n = _i(pages, _PG, 7, 1, 1000000), p = _i(yield_, _YL, 6, 1, 100000);
  var k = Math.floor((n + p - 1) / p), last = n - (k - 1) * p;
  return "The " + _pl(n, " page", " pages") + " at " + _pl(p, " page", " pages") + " a cartridge " + _v(n, "makes", "make") + " " + _pl(k, " cartridge", " cartridges") + ", the last cartridge covering " + _pl(last, " page", " pages") + ".";
}
function daysTruth(yield_, daily) {
  var y = _i(yield_, _YL, 6, 1, 100000), d = _i(daily, _DY, 6, 1, 100000);
  var k = Math.floor(y / d), left = y - k * d;
  return "A " + y + " page cartridge at " + _pl(d, " page", " pages") + " a day lasts " + _pl(k, " full day", " full days") + " with " + _pl(left, " page", " pages") + " left for the next day.";
}
function costTruth(cartridges, price, pages) {
  var c = _i(cartridges, _CT, 5, 1, 10000), p = _p(price, _PR, 3, 2, 1, 99999), n = _i(pages, _PG, 7, 1, 1000000);
  var cc = c * p;
  var pp = Math.floor((2 * cc + n) / (2 * n));
  return "The " + _pl(c, " cartridge", " cartridges") + " at $" + _m(p) + " a cartridge " + _v(c, "comes", "come") + " to $" + _m(cc) + ", $" + _m(pp) + " a page.";
}
function timeTruth(pages, ppm) {
  var n = _i(pages, _PG, 7, 1, 1000000), m = _i(ppm, _PM, 4, 1, 1000);
  var t = Math.floor((n + m - 1) / m), h = Math.floor(t / 60), r = t % 60;
  return "The " + _pl(n, " page", " pages") + " at " + _pl(m, " page", " pages") + " a minute " + _v(n, "takes", "take") + " " + _pl(t, " minute", " minutes") + ", " + _pl(h, " hour", " hours") + " " + _pl(r, " minute", " minutes") + ".";
}
