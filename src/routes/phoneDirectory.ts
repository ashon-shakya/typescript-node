import { Router, Request, Response } from 'express';
import Contact, { IContact } from '../models/contact';
import { apiResponse } from '../interface/apiResponse';

const router = Router();

// Get all contacts
router.get('/', async (req: Request, res: Response) => {
    try {
        const contacts: IContact[] = await Contact.find();
        const resObj: apiResponse = {
            status: true,
            message: "Contacts Fetched!",
            data: contacts
        }

        res.json(resObj);
    } catch (err) {

        const errorObj: apiResponse = {
            status: false,
            message: "Server Error",
            data: ""
        }

        res.status(500).send(errorObj);
    }
});

// Get a single contact by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const contact: IContact | null = await Contact.findById(req.params.id);
        if (!contact) {
            const errorObj = {
                status: false,
                message: "Contact not found",
                data: ""
            }

            return res.status(404).send(errorObj);
        }

        const resObj: apiResponse = {
            status: true,
            message: "Contact Found",
            data: contact
        }

        res.json(resObj);
    } catch (err) {

        const errorObj = {
            status: false,
            message: "Server Error",
            data: ""
        }

        res.status(500).send(errorObj);
    }
});

// Add a new contact
router.post('/', async (req: Request, res: Response) => {
    try {
        const newContact: IContact = new Contact({
            name: req.body.name,
            phone: req.body.phone,
        });
        const contact: IContact = await newContact.save();

        const resObj: apiResponse = {
            status: true,
            message: "Created new contact",
            data: contact
        }

        res.status(201).json(resObj);
    } catch (err) {
        const errorObj: apiResponse = {
            status: false,
            message: "Server Error",
            data: ""
        }

        res.status(500).send(errorObj);
    }
});

// Update an existing contact
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const contact: IContact | null = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).send('Contact not found');
        contact.name = req.body.name || contact.name;
        contact.phone = req.body.phone || contact.phone;
        await contact.save();

        const resObj: apiResponse = {
            status: true,
            message: "Contact Updated!",
            data: contact
        }
        res.json(resObj);

    } catch (err) {

        const errorObj = {
            status: false,
            message: "Server Error",
            data: ""
        }

        res.status(500).send(errorObj);
    }
});

// Delete a contact
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const contact: IContact | null = await Contact.findById(req.params.id);
        if (!contact) {
            const errorObj = {
                status: false,
                message: "Contact not found",
                data: ""
            }

            return res.status(404).send(errorObj);
        };
        await contact.deleteOne();

        const resObj: apiResponse = {
            status: true,
            message: "Contact Deleted",
            data: ""
        }

        return res.status(200).send(resObj);
    } catch (err) {

        const errorObj = {
            status: false,
            message: "Server Error",
            data: ""
        }

        return res.status(500).send(errorObj);
    }
});

export default router;
