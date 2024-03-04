import fs from 'fs/promises';
import path from 'path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contactsPath = path.join(__dirname, "../db/contacts.json");

export async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  console.log(data)
  return JSON.parse(data);
}

export async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
   const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);

  return contact || null;

}

export async function removeContact(contactId) {
   const contacts = await listContacts();
   const index = contacts.findIndex((contact) => contact.id === contactId);
   
  if (index === -1) {
  return { message: 'Not found' };
  }

  const [contact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contact;
}

export async function addContact(data) {
    const contacts = await listContacts();
    const newContact = {
        id: crypto.randomUUID(),
        ...data,

    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
    
}


export async function updContacts(contactId, data) {
  const contacts = await listContacts();

  const index = contacts.findIndex((e) => e.id === contactId);
    if (index === -1) {
    return { message: 'Not found' };      
  }

  contacts[index] = Object.assign(contacts[index], data);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contacts[index];
}

