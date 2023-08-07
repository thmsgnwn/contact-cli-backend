const yargs = require("yargs");
const {
  saveContacts,
  listContact,
  detailContact,
  deleteContact,
} = require("./contacts"); // destructuring

/** Pembuatan dengan metode isian objek */
yargs
  .command({
    command: "add",
    describe: "Adding Contact",
    builder: {
      name: {
        describe: "Full Name",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email",
        demandOption: false,
        type: "string",
      },
      phone: {
        describe: "Phone Number",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      saveContacts(argv.name, argv.email, argv.phone);
    },
  })
  .demandCommand();

// show all name contacts
yargs.command({
  command: "list",
  describe: "Show All Contact",
  handler() {
    listContact();
  },
});

// show detail part of name
yargs.command({
  command: "detail",
  describe: "Show Detail One of Contacts demand Name",
  builder: {
    name: {
      describe: "Full Name",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    detailContact(argv.name);
  },
});

// Delete contact based on name
yargs.command({
  command: "delete",
  describe: "Delete contact based on name",
  builder: {
    name: {
      describe: "Full Name",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    deleteContact(argv.name);
  },
});

yargs.parse();
