import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
// Отримання поточного шляху файлу
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  // ...твій код. Повертає масив контактів.
  return await fs.readFile(contactsPath, "utf-8").then((data) => {
    console.log("====================================");
    console.log(data);
    console.log("====================================");
    return data;
  });
}

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  const contact = contacts.find((contact) => contact.id === contactId);
  console.log("====================================");
  console.log(contact || null);
  console.log("====================================");
  return contact || null;
}

async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    console.log("====================================");
    console.log(null);
    console.log("====================================");
    return null;
  }
  const [contact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  console.log("====================================");
  console.log(contact);
  console.log("====================================");
  return contact;
}

async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту (з id).
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  const newContact = { id: Date.now().toString(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  console.log("====================================");
  console.log(newContact);
  console.log("====================================");
  return newContact;
}

export { listContacts, getContactById, removeContact, addContact };
