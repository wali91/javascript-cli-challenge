const cli = require("caporal");
cli
  .version("1.0.0")
  .command("ip-external", "Get private IP address")
  .action(function(args, options, logger) {
    const http = require("http");
    let opt = {
      host: "ipv4bot.whatismyipaddress.com",
      port: 80,
      path: "/"
    };
    let ip = "";
    http
      .get(opt, function(res) {
        if (res.statusCode == 200) {
          res.on("data", function(chunk) {
            ip += chunk;
          });
        }
        res.on("end", function() {
          logger.info(ip);
        });
      })
      .on("error", function(e) {
        logger.info("error: " + e.message);
      });
  });

cli.parse(process.argv);
