const { execSync } = require("child_process");
const { readFileSync, writeFileSync } = require("fs");

const iframeDotHtml = readFileSync("./docs-build/iframe.html", { encoding: "utf8" });

writeFileSync(
  "./docs-build/iframe.html",
  iframeDotHtml.replace(
    '<script type="module" crossorigin src="/assets/',
    '<script type="module" crossorigin src="/react-konva-addons/assets/',
  ),
);

console.log("Fixed bad asset path in iframe.html");
