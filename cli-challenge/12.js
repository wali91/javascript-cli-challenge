const cli = require("caporal");

cli
  .version("1.0.0")
  .command(
    "movies",
    "Get all information about new movies in theaters for today from CGV website"
  )
  .action(function(args, options, logger) {
    const http = require("https");
    let opt = {
      host: "www.cgv.id",
      path: "/en/schedule/cinema"
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
          $("div .schedule-title").map(function(i, li) {
            let movie = {};
            movie.title = $(li)
              .find("a")
              .text()
              .trim();
            let opt = {
              host: "www.cgv.id",
              path: $(li)
                .find("a")
                .attr("href")
            };
            //logger.info(opt.path);
            let html = "";
            http
              .get(opt, function(res) {
                if (res.statusCode == 200) {
                  res.on("data", function(chunk) {
                    html += chunk;
                  });
                } else logger.info("status code: " + res.statusCode);
                res.on("end", function() {
                  const $1 = cheerio.load(html);

                  $1('div [class="movie-add-info left"]')
                    .find("li")
                    .map(function(i, li) {
                      let text = $1(li).text();
                      if (text.indexOf("STARRING") != -1)
                        movie.starring = text.split(":")[1].trim();
                      else if (text.indexOf("DIRECTOR") != -1)
                        movie.director = text.split(":")[1].trim();
                      else if (text.indexOf("GENRE") != -1)
                        movie.genre = text.split(":")[1].trim();
                    });

                  movie.trailer = $1("div [class=trailer-btn-wrapper]")
                    .find("img")
                    .attr("onclick")
                    .split(/[\('\)]/)[2];
                  movie.synopsis = $1('div [class="movie-synopsis right"]')
                    .text()
                    .split("\n")[1]
                    .trim();

                  logger.info(movie.title + "\n");
                  logger.info("Jenis Film: " + movie.genre);
                  logger.info("Sutradara: " + movie.director);
                  logger.info("Casts: " + movie.starring);
                  logger.info("Trailer: " + movie.trailer);
                  logger.info("\nSinopsis");
                  logger.info(movie.synopsis + "\n");
                  logger.info(
                    "-------------------------------------------------------------------------\n"
                  );
                });
              })
              .on("error", function(e) {
                logger.info("error: " + e.message);
              });
          });
        });
      })
      .on("error", function(e) {
        logger.info("error: " + e.message);
      });
  });

cli.parse(process.argv);
