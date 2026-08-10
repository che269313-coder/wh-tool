import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

const appSource = fs.readFileSync(new URL("../docs/app.js", import.meta.url), "utf8");
const renderStart = appSource.indexOf("function renderCalculatorDetails() {");
const renderEnd = appSource.indexOf("function updateCalculatorDraftFromControl", renderStart);
const renderSource = renderStart >= 0 && renderEnd > renderStart ? appSource.slice(renderStart, renderEnd) : "";

test("renderCalculatorDetails keeps an expanded detachment panel open", () => {
  assert.ok(renderSource, "renderCalculatorDetails should be present in docs/app.js");

  const oldPanel = { open: true };
  const newPanel = { open: false };
  let rendered = false;
  const container = {
    querySelectorAll(selector) {
      if (selector === ".calculator-detachments") return rendered ? [newPanel] : [oldPanel];
      if (selector === ".calculator-side") return [];
      return [];
    },
    set innerHTML(value) {
      this.html = value;
      rendered = true;
    },
  };
  const context = {
    $: (selector) => selector === "#calculatorDetails" ? container : null,
    calculatorSelectionKeys: () => [],
    calculatorDetailMarkup: () => "",
  };

  vm.runInNewContext(`${renderSource}\nrenderCalculatorDetails();`, context);

  assert.equal(newPanel.open, true);
});
