import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, dirname } from "node:path";
import vm from "node:vm";

const root = process.cwd();
const files = [];
function walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (entry === ".git" || entry === "node_modules") continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else files.push(full);
  }
}
walk(root);

let failures = 0;
for (const file of files.filter(f => [".html", ".css"].includes(extname(f)))) {
  const text = readFileSync(file, "utf8");
  const refs = [...text.matchAll(/\b(?:href|src)=["']([^"'#]+)(?:#[^"']*)?["']/g)].map(m => m[1]);
  for (const ref of refs) {
    if (/^(https?:|mailto:|tel:|data:)/.test(ref)) continue;
    const cleanRef = ref.split("?")[0];
    const target = join(dirname(file), decodeURIComponent(cleanRef));
    if (!existsSync(target)) {
      failures += 1;
      console.error(`Missing reference in ${file.replace(root + "/", "")}: ${ref}`);
    }
  }
}

for (const file of files.filter(f => extname(f) === ".js")) {
  const text = readFileSync(file, "utf8");
  const refs = [...text.matchAll(/["'](assets\/[^"']+)["']/g)].map(m => m[1]);
  for (const ref of refs) {
    const target = join(root, decodeURIComponent(ref));
    if (!existsSync(target)) {
      failures += 1;
      console.error(`Missing asset in ${file.replace(root + "/", "")}: ${ref}`);
    }
  }
}

const appSource = readFileSync(join(root, "app.js"), "utf8");
const context = {
  document: {
    body: { dataset: { page: "home" }, classList: { toggle: () => false } },
    addEventListener: () => {},
    getElementById: () => ({ innerHTML: "" }),
    querySelector: () => null,
    querySelectorAll: () => []
  }
};
vm.createContext(context);
vm.runInContext(`${appSource}\nglobalThis.__rendered = Object.fromEntries(Object.entries(pages).map(([key, fn]) => [key, shell(fn())]));`, context);
for (const [page, html] of Object.entries(context.__rendered)) {
  if (!html.includes("<main") || !html.includes("<footer") || !html.includes("<h1") && page !== "home") {
    failures += 1;
    console.error(`Rendered page missing expected structure: ${page}`);
  }
  for (const ref of [...html.matchAll(/\b(?:href|src)=["']([^"'#]+)(?:#[^"']*)?["']/g)].map(m => m[1])) {
    if (/^(https?:|mailto:|tel:|data:)/.test(ref)) continue;
    const target = join(root, decodeURIComponent(ref));
    if (!existsSync(target)) {
      failures += 1;
      console.error(`Rendered page ${page} missing reference: ${ref}`);
    }
  }
}

if (failures) process.exit(1);
console.log(`Checked ${files.length} files. Local references look good.`);
