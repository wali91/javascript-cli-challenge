const cli = require("caporal");
cli
  .version("1.0.0")
  .command("obfuscate", "Obfuscate the string")
  .argument("<string>", "String to be obfuscated", cli.STRING)
  .action(function(args, options, logger) {
    logger.info(
      args.string.replace(/./gm, function(i) {
        return "&#" + i.charCodeAt(0) + ";";
      })
    );
  });

cli.parse(process.argv);
