const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");


const contactsPath = path.join(__dirname, "/db", "contacts.json");

async function read() {
    const data = await fs.readFile(contactsPath, "utf-8");
  
    return JSON.parse(data);
}

function write(data) {
    return fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}

async function listContacts() {
    const data = await read();

    return data;
}
  
async function getContactById(contactId) {
    const data = await read();
    const contact = data.find((contact) => contact.id === contactId);
    if (contact === undefined) {
        return null;
    }
    return contact;
}
  
async function removeContact(contactId) {
    const data = await read();
    const index = data.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
        return null;
    }
    
    const newList = [...data.slice(0, index), ...data.slice(index + 1)];

    await write(newList);

    return data[index];
}

async function addContact(name, email, phone) {
    const data = await read();
    const newContact = { name, email, phone, id: crypto.randomUUID() };
    data.push(newContact);

    await write(data);
  
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
  };