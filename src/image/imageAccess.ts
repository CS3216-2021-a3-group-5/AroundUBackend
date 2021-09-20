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

const logoStorage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
        cb(null, 'images')
    },
    filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
        const company = req.params.company;
        console.log(company);
        cb(null, company + '-logo')
    }
});

// Create multer object
export const logoUpload = multer({ storage: logoStorage })

// Create multer object
export const promoPicUpload = multer({
    dest: "images"
})

export function postLogo(req: Request, res: Response) {
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

export function postPromoPic(req: Request, res: Response) {
    // @ts-ignore
    const { filename, mimetype, size } = req.file;
    const promotion_id = req.params.promo_id;
    console.log(req.params);
    const filepath = req.file?.path;
    db.insert({
        promotion_id,
        filename,
        filepath,
        mimetype,
        size,
    })
        .into('promotion_pictures')
        .then(() => res.json({ success: true, filename }))
        .catch((err: Error) => res.json({ success: false, message: 'upload failed', stack: err.stack }));
}

export interface ImageFile {
    filepath: string,
    mimetype: string
}

export function getLogo(req: Request, res: Response) {
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

export function getPromoPics(req: Request, res: Response) {
    const { promotion_id } = req.body;
    db.select('*')
        .from('promotion_pictures')
        .where({ promotion_id })
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
