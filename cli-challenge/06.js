const cli = require("caporal");
cli
  .version("1.0.0")
  .command("ip", "Get private IP address")
  .action(function(args, options, logger) {
    let os = require("os");
    let ifaces = os.networkInterfaces();
    Object.keys(ifaces).forEach(function(ifname) {
      let alias = 0;

      ifaces[ifname].forEach(function(iface) {
        if ("IPv4" !== iface.family || iface.internal !== false) {
          // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
          return;
        }

        if (alias >= 1) {
          // this single interface has multiple ipv4 addresses
          logger.info(ifname + ":" + alias, iface.address);
        } else {
          // this interface has only one ipv4 adress
          logger.info(ifname, iface.address);
        }
        ++alias;
      });
    });
  });

cli.parse(process.argv);
