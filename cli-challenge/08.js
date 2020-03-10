const cli = require("caporal");

cli
  .version("1.0.0")
  .command("headlines", "Get headlines from https://www.kompas.com/")
  .action(function(args, options, logger) {
    const http = require("https");
    let opt = {
      host: "www.kompas.com",
      path: "/"
    };
    let html = "";
    http
      .get(opt, function(res) {
        if (res.statusCode == 200) {
          res.on("data", function(chunk) {
            html += chunk;
          });
        } else logger.info("status code: " + res.statusCode);
        res.on("end", function() {
          const cheerio = require("cheerio");
          const $ = cheerio.load(html);
          $("li[class=headline__big__item]").map(function(i, li) {
            logger.info(
              "Title: " +
                $(li)
                  .find(".headline__big__title")
                  .text()
            );
            logger.info(
              "URL: " +
                $(li)
                  .find("a")
                  .attr("href") +
                "\n"
            );
          });
        });
      })
      .on("error", function(e) {
        logger.info("error: " + e.message);
      });
  });

cli.parse(process.argv);
