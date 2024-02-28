const yargs = require("yargs");
const notes = require("./notes");

//create add command
yargs.command({
  command: "add",
  descibe: "add a new note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note Body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    // console.log("Title : ", argv.title);
    // console.log("Body : ", argv.body);
    notes.addNote(argv.title, argv.body);
  },
});

//create remove command
yargs.command({
  command: "remove",
  descibe: "remove a new note",
  descibe: "add a new note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

//create list command
yargs.command({
  command: "list",
  descibe: "list a new note",
  handler() {
    notes.listNotes();
  },
});

//create read command
yargs.command({
  command: "read",
  descibe: "read a new note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.readNotes(argv.title);
  },
});

// console.log(yargs.argv); //returns the parsed arguments in an object

//instead of everytime using this we can use

yargs.parse();
