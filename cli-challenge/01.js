const cli = require("caporal");

cli
  .version("1.3.0")
  .description("Own cli App")
  .command("lowercase", "print lowercase")
  .argument("<print>", "I aM CrAzY TeXT", cli.STRING)
  .action((args, options, logger) => {
    logger.info(
      args.print
        .split("")
        .map(x => x.toLowerCase())
        .join("")
    );
  });

cli
  .version("1.3.0")
  .description("Own Cli App")
  .command("uppercase", "print uppercase")
  .argument("<print>", "I aM CrAzY TeXT", cli.STRING)
  .action((args, options, logger) => {
    logger.info(
      args.print
        .split("")
        .map(x => x.toUpperCase())
        .join("")
    );
  }),
  cli
    .version("1.3.0")
    .description("Own Cli App")
    .command("capitalize", "print capitalize")
    .argument("<print>", "I aM CrAzY TeXT", cli.STRING)
    .action((args, options, logger) => {
      logger.info(
        args.print.replace(/\w\S*/g, function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        })
      );
    });

cli.parse(process.argv);
