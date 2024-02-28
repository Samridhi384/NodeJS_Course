// const add = require("./utils");
// const validator = require("validator");
// const chalk = require("chalk");
const yargs = require("yargs");

// const sum = add(2, 3);
// console.log(sum);

// const getNotes = require("./utils");

// const msg = getNotes();

// console.log(msg);

//validator

// console.log(validator.isEmail("sam@gmail.com"));

// console.log(validator.isURL("https://google.com"));

//chalk
// console.log(chalk.blue("Hello World!"));

// console.log(chalk.blue.bgYellow.bold("Hello World!"));

// console.log(chalk.magenta("Hello", chalk.underline.bgBlue("world!") + "!"));

// console.log(chalk.green("Hi", chalk.red("Monday"), "Be happy"));

// console.log(chalk.rgb(123, 54, 87).underline("Please be nice"));

// console.log(chalk.hex("#af7343").italic("Good Vibes"));

// console.log(`
// CPU: ${chalk.red("90%")}
// RAM: ${chalk.green("40%")}
// DISK: ${chalk.yellow("70%")}
// `);

// console.log(chalk.magentaBright("White Bright"));

// console.log(chalk.cyanBright("Black Bright"));

// console.log(chalk.green.bgRed.inverse.bold("Success"));

//command line arguements

// console.log(process.argv[2]);

// const command = process.argv[2];

// if (command === "add") {
//   console.log("adding note");
// }

// console.log(yargs.argv);

// node app.js add --title="this is me"
// { _: [ 'add' ], title: 'this is me', '$0': 'app.js' }

// node app.js--help
// Options:
//   --help     Show help                                                 [boolean]
//   --version  Show version number                                       [boolean]

//customize yargs version
// yargs.version("1.1.0");

// console.log(yargs.argv);
