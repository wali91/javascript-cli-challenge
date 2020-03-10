const cli = require("caporal");
cli
  .version("1.0.0")
  .command("convert", "Convert csv to xls or vice versa")
  .argument("<source>", "Source filename", cli.STRING)
  .argument("<output>", "Output filename", cli.STRING)
  .action(function(args, options, logger) {
    const xlsx = require("xlsx");
    const workBook = xlsx.readFile(args.source);
    xlsx.writeFile(workBook, args.output);
  });

cli.parse(process.argv);
