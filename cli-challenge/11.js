const cli = require("caporal");
const puppeteer = require("puppeteer");
const fs = require("fs");
const rline = require("readline");

async function doScreenCapture(url, filename) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.screenshot({
    fullPage: true,
    path: filename
  });
  await browser.close();
}

cli
  .version("1.0.0")
  .command("screenshot-list", "Get screenshots from a list of file")
  .argument("<filelist>", "File list of URL", cli.STRING)
  .option(
    "--format <png|jpg|pdf>",
    "File format of the screenshot",
    cli.STRING,
    "png",
    true
  )
  .action(function(args, options, logger) {
    const lineReader = rline.createInterface({
      input: fs.createReadStream(args.filelist)
    });
    lineReader.on("line", function(url) {
      let filename = url.replace(/([^a-z0-9]+)/gi, "-") + "." + options.format;
      doScreenCapture(url, filename);
    });
  });

cli.parse(process.argv);
