const cli = require("caporal");
cli
  .version("1.0.0")
  .command("palindrome", "Check if the string is palindrome")
  .argument("<string>", "String to be checked", cli.STRING)
  .action(function(args, options, logger) {
    let re = /[\W_]/g;
    let normalize = args.string.toLowerCase().replace(re, "");
    let reverse = normalize
      .split("")
      .reverse()
      .join("");
    logger.info('String: "' + args.string + '"');
    if (reverse === normalize) logger.info("Is palindrome? Yes");
    else logger.info("Is palindrome? No");
  });

cli.parse(process.argv);
