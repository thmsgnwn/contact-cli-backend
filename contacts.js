const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

// make folder if folder not define
const dirFolder = "./data";
if (!fs.existsSync(dirFolder)) {
  fs.mkdirSync(dirFolder);
}

// make file contact.json
const dirPath = "./data/contact.json";
if (!fs.existsSync(dirPath)) {
  fs.writeFileSync(dirPath, "[]", "utf8");
}

// call load of Contact
const loadContact = () => {
  const fileBuffer = fs.readFileSync("data/contact.json", "utf8");
  const contacts = JSON.parse(fileBuffer);
  return contacts;
};

// save contact
const saveContacts = (name, email, phone) => {
  const cont = { name, email, phone }; // notasi ES6
  const contacts = loadContact();

  /** check Duplicate */
  const duplicate = contacts.find((conct) => conct.name === name);
  if (duplicate) {
    console.info(
      chalk.red.inverse.bold(
        "Thats contact had Registered, Please Use of Deferent Name"
      )
    );
    return false;
  }

  /* check Email Validator */
  if (email) {
    if (!validator.isEmail(email)) {
      console.info(chalk.red.inverse.bold("Sorry, your Email is Not Valid"));
      return false;
    }
  }

  /* check Phone Number Validator*/
  if (!validator.isMobilePhone(phone, "id-ID")) {
    console.info(
      chalk.red.inverse.bold("Sorry, your Phone Number is Not Valid")
    );
    return false;
  }

  contacts.push(cont);

  fs.writeFileSync("data/contact.json", JSON.stringify(contacts));

  console.info(
    chalk.green.inverse.bold("Success. Thanks for Adding your Data")
  );
};

// show all list Contacts
const listContact = () => {
  const contacts = loadContact();

  console.info(chalk.cyan.inverse.bold("List of All Contacts : "));

  contacts.forEach((fillContact, index) => {
    console.info(`${index + 1}. ${fillContact.name} | ${fillContact.phone}`);
  });
};

// take detail Contact
const detailContact = (name) => {
  const contacts = loadContact();

  const oneContact = contacts.find(
    (contact) => contact.name.toLowerCase() === name.toLowerCase()
  );

  // Error handling if FALSE
  if (!oneContact) {
    console.info(chalk.red.inverse.bold(`This name ${name} is Not Found`));
    return false;
  }

  // Error Handling if TRUE
  if (true) {
    console.info(chalk.green.inverse.bold(oneContact.name));
    console.info(oneContact.email);
    console.info(oneContact.phone);
  }
};

// Function Delete Contact
const deleteContact = (name) => {
  const contacts = loadContact();

  const newContact = contacts.filter(
    (contact) => contact.name.toLowerCase() !== name.toLowerCase()
  );

  // Error handling if FALSE
  if (contacts.length === newContact.length) {
    console.info(chalk.red.inverse.bold(`${name} Not Found`));
    return false;
  }

  fs.writeFileSync("data/contact.json", JSON.stringify(newContact));

  console.info(chalk.green.inverse.bold(`The ${name} has delete`));
};

module.exports = {
  saveContacts,
  listContact,
  detailContact,
  deleteContact,
};
