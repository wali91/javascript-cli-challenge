const cli = require("caporal");
cli
  .version("1.0.0")
  .command("random", "Generate random string")
  .option("--length <num>", "Length of the generated string", cli.INT, 32)
  .option(
    "--numbers <true|false>",
    "Use numbers to generate random string",
    cli.BOOL,
    true
  )
  .option(
    "--letters <true|false>",
    "Use letters to generate random string",
    cli.BOOL,
    true
  )
  .option("--uppercase", "Use uppercase letters to generate random string")
  .option("--lowercase", "Use lowercase letters to generate random string")
  .action(function(args, options, logger) {
    let ucLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lcLetters = "abcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789";
    let charset = "";
    if (options.numbers) charset = numbers;
    if (options.letters) {
      if (options.uppercase || options.lowercase) {
        if (options.uppercase) charset += ucLetters;
        if (options.lowercase) charset += lcLetters;
      } else charset += ucLetters + lcLetters;
    }
    let charLength = charset.length;
    let result = "";
    for (let i = 0; i < options.length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charLength));
    }
    logger.info(result);
  });

cli.parse(process.argv);
