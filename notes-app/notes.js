const { default: chalk } = require("chalk");
const fs = require("fs");

const getNotes = () => {
  return "Your notes ....";
};
const addNote = (title, body) => {
  const notes = loadNote();

  // const duplicateNotes = notes.filter((note) => note.title === title);
  // const duplicateNotes = notes.filter(function (note) {
  //   return note.title === title;
  // });
  const duplicateNotes = notes.find((note) => note.title === title);

  debugger;

  if (!duplicateNotes) {
    notes.push({
      title: title,
      body: body,
    });

    savedNotes(notes);

    console.log(chalk.blue.inverse("new note added"));
  } else {
    console.log(chalk.yellow.inverse("note  with this title already exist!"));
  }
};

const removeNote = (title) => {
  const notes = loadNote();

  const notesToKeep = notes.filter((note) => note.title !== title);

  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse("Note removed"));
    savedNotes(notesToKeep);
  } else {
    console.log(chalk.red.inverse("Note title does not exits"));
  }
};

const listNotes = () => {
  const notes = loadNote();

  console.log(chalk.inverse.bold("\nYour Notes : \n"));
  notes.forEach((note) => {
    console.log(note.title);
  });
};

const readNotes = (title) => {
  const notes = loadNote();
  // console.log(notes);

  const note = notes.find((note) => note.title === title);
  // console.log(note.title);

  if (note) {
    console.log(chalk.inverse(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red.inverse("note not found"));
  }
};

const savedNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNote = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataString = dataBuffer.toString();

    return JSON.parse(dataString);
  } catch (error) {
    return [];
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNotes: readNotes,
};
