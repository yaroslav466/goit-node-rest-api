


import { Contact } from '../db/contact.js';

import {
    createContactSchema,
    updateContactSchema,
    updateFavoriteSchema
} from "../schemas/contactsSchemas.js";


export const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
              res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({
            message: 'Server error   '
        });
    }
};

export const createContact = async (req, res) => {
    try {
        const validationResult = createContactSchema.validate(req.body);
       if (validationResult.error) {
            return res.status(400).json({ message: validationResult.error.message });
        }
        const newContact = await Contact.create(req.body);
        res.status(201).json(newContact);
    } catch (error) {
        res.status(500).json({
            message: 'Server error'
        });
    }
}; 

export const getOneContact = async (req, res, next) => {
    try {
         const { error } = updateContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
        const { id } = req.params;
         const contact = await Contact.findById(id);
        if (!contact) {
            return res.status(404).json({
                message: 'Contact not found'
            });
        }
        res.status(200).json(contact);
    } catch (error) {
         next(error);
    }
};

export const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const delContact = await Contact.findByIdAndDelete(id, req.body);

        if (delContact !== null) {
            res.status(200).json(delContact);
        } 
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};




export const updateContact = async (req, res, next) => {
    try {
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateFavorite = async (req, res, next) => {
  const id = req.params.id;
  const { favorite } = req.body;

  try {
    const data = await Contact.findByIdAndUpdate(id, { favorite, _id: id });

    if (data === null) {
      return res.status(404).json({ message: "Not found contact" });
    }
    res.send(data);
  } catch (error) {
    next(error);
  }
};




