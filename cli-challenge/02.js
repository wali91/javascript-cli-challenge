const cli = require("caporal");

cli
  .version("1.0.0")
  .command("add", "Add numbers")
  .argument("<numbers...>", "Numbers to add")
  .action(function(args, options, logger) {
    let result = parseInt(args.numbers[0]);
    for (let i = 1; i < args.numbers.length; i++)
      result += parseInt(args.numbers[i]);
    logger.info(result);
  })
  .command("subtract", "Subtract numbers")
  .argument("<numbers...>", "Numbers to subtract")
  .action(function(args, options, logger) {
    let result = parseInt(args.numbers[0]);
    for (let i = 1; i < args.numbers.length; i++)
      result -= parseInt(args.numbers[i]);
    logger.info(result);
  })
  .command("multiply", "Multiply numbers")
  .argument("<numbers...>", "Numbers to multiply")
  .action(function(args, options, logger) {
    let result = parseInt(args.numbers[0]);
    for (let i = 1; i < args.numbers.length; i++)
      result *= parseInt(args.numbers[i]);
    logger.info(result);
  })
  .command("divide", "Divide numbers")
  .argument("<numbers...>", "Numbers to divide")
  .action(function(args, options, logger) {
    let result = parseInt(args.numbers[0]);
    for (let i = 1; i < args.numbers.length; i++)
      result /= parseInt(args.numbers[i]);
    logger.info(result);
  });

cli.parse(process.argv);
