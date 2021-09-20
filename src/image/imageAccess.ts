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

// Create multer object
export const imageUpload = multer({
    dest: 'images',
});

export function postImage(req: Request, res: Response) {
    // @ts-ignore
    const { originalname, mimetype, size } = req.file;
    const filepath = req.file?.path;
    db.insert({
        originalname,
        filepath,
        mimetype,
        size,
    })
        .into('image_files')
        .then(() => res.json({ success: true, originalname }))
        .catch((err: Error) => res.json({ success: false, message: 'upload failed', stack: err.stack }));
}

export interface ImageFile {
    filepath: string,
    mimetype: string
}

export function getImage(req: Request, res: Response) {
    const { originalname } = req.body;
    db.select('*')
        .from('image_files')
        .where({ originalname })
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
