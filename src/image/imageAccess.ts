import {Request, Response} from "express";
import {OK} from "../statuscodes/statusCode";

const multer = require('multer');
const path = require('path');
const knex = require('knex');

// Create database object
const db = knex(
    {
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            user: 'me',
            password: 'password',
            database: 'api',
        },
    }
);

const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
        cb(null, 'images')
    },
    filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
        const company = req.params.company;
        console.log(req.body);
        console.log(req.params);
        cb(null, company + '-logo')
    }
});

// Create multer object
export const imageUpload = multer({ storage: storage })

export function postImage(req: Request, res: Response) {
    // @ts-ignore
    const { filename, mimetype, size } = req.file;
    console.log(req.params);
    const filepath = req.file?.path;
    db.insert({
        filename,
        filepath,
        mimetype,
        size,
    })
        .into('image_files')
        .then(() => res.json({ success: true, filename }))
        .catch((err: Error) => res.json({ success: false, message: 'upload failed', stack: err.stack }));
}

export interface ImageFile {
    filepath: string,
    mimetype: string
}

export function getImage(req: Request, res: Response) {
    const { filename } = req.body;
    db.select('*')
        .from('image_files')
        .where({ filename })
        .then((images: Array<ImageFile>) => {
            if (images[0]) {
                const dirname = path.resolve();
                const fullfilepath = path.join(dirname, images[0].filepath);
                return res.status(OK).type(images[0].mimetype).sendFile(fullfilepath);
            }
            return Promise.reject(new Error('Image does not exist'));
        })
        .catch((err: { stack: any; }) => res.status(404).json({success: false, message: 'not found', stack: err.stack}),
        );
}
