import {
    listContacts, 
    getContactById,
    removeContact,
    addContact
} from "../services/contactsServices.js"
import { createContactSchema } from "../schemas/contactsSchemas.js";
import {updateContactSchema} from '../schemas/contactsSchemas.js'

export const getAllContacts = async (req, res) => {
    try {
        const contacts = await listContacts();
              res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({
            message: 'Server error'
        });
    }
};

export const getOneContact = async (req, res) => {
     try {
        const { id } = req.params;
        const contact = await getContactById(id);
        if (!contact) {
            return res.status(404).json({
                message: 'Contact not found'
            });
        }
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({
            message: 'Server error'
        });
    }
    
};

export const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const delContact = await removeContact(id, req.body);

        if (delContact !== null) {
            res.status(200).json(delContact);
        } 
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const createContact = async (req, res) => {
    try {
        const validationResult = createContactSchema.validate(req.body);
       if (validationResult.error) {
            return res.status(400).json({ message: validationResult.error.message });
        }
        const newContact = await addContact(req.body);
        res.status(201).json(newContact);
    } catch (error) {
        res.status(500).json({
            message: 'Server error'
        });
    }
};

export const updateContact = async (req, res) => {
    try {
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const result = await updContacts(id, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};


