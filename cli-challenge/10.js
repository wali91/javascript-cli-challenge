const cli = require("caporal");
const puppeteer = require("puppeteer");
const fs = require("fs");

async function doScreenCapture(url, filename) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });
  let format = "." + filename.split(".").pop();
  if (format === "pdf") {
    await page.pdf({
      path: options.output,
      format: "A4"
    });
  } else {
    await page.screenshot({
      fullPage: true,
      path: filename
    });
  }

  await browser.close();
}

cli
  .version("1.0.0")
  .command("screenshot", "Get a screenshot from a URL")
  .argument("<url>", "URL to get a screenshot from", cli.STRING)
  .option(
    "--format <png|jpg|pdf>",
    "File format of the screenshot",
    cli.STRING,
    "png"
  )
  .option("--output <filename>", "Filename of the screenshot")
  .action(function(args, options, logger) {
    if (!options.output) {
      //options.format = '.' + options.output.split('.').pop();
      let index = 1;
      let pad = "000";
      let num = (pad + index).slice(-pad.length);
      options.output = "screenshot-" + num + "." + options.format;
      while (fs.existsSync(options.output)) {
        index += 1;
        num = (pad + index).slice(-pad.length);
        options.output = "screenshot-" + num + "." + options.format;
      }
    }

    doScreenCapture(options.url, options.output);
  });

cli.parse(process.argv);
