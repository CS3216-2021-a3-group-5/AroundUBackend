import {Request, Response} from "express";
import {OK} from "../statuscodes/statusCode";
import {pool} from "../database/database";
import {QueryResult} from "pg";

const multer = require('multer');
const path = require('path');

const logoStorage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
        cb(null, 'images')
    },
    filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
        const company = req.params.company;
        console.log(company);
        cb(null, company)
    }
});

// Create multer object
export const logoUpload = multer({ storage: logoStorage })

// Create multer object
export const promoPicUpload = multer({
    dest: "images"
})

export function postLogo(req: Request, res: Response) {
    console.log("Here")
    
    // @ts-ignore
    const { filename, mimetype } = req.file;
    console.log(req.params);
    const filepath = req.file?.path;
    console.log(`filename: ${filename}`)
    console.log(`filepath: ${filepath}`)
    pool.query('INSERT INTO company_logos (filename, filepath, mimetype) VALUES ($1, $2, $3)',
        [filename, filepath, mimetype], (error: Error, results: QueryResult) => {
            if (error) {
                res.json({ success: false, message: 'upload failed', stack: error.stack })
            }
            res.json({ success: true, filename })
        });
}

export function postPromoPic(req: Request, res: Response) {
    // @ts-ignore
    const { filename, mimetype } = req.file;
    const promotion_id = req.params.promo_id;
    console.log(req.params);
    const filepath = req.file?.path;
    pool.query('INSERT INTO promotion_pictures (promotion_id, filename, filepath, mimetype) VALUES ($1, $2, $3, $4)',
        [promotion_id, filename, filepath, mimetype], (error: Error, results: QueryResult) => {
            if (error) {
                res.json({ success: false, message: 'upload failed', stack: error.stack })
            }
            res.json({ success: true, filename })
        });
}

export interface ImageFile {
    filepath: string,
    mimetype: string
}

export function getLogo(req: Request, res: Response) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

    const filename = req.params.company;
    console.log(filename);
    pool.query('SELECT * FROM company_logos WHERE filename = $1', [filename], (error: Error, results: QueryResult) => {
        if (error) {
            res.status(404).json({success: false, message: 'not found', stack: error.stack})
        }
        const images = results.rows;
        if (images[0]) {
            const dirname = path.resolve();
            const fullfilepath = path.join(dirname, images[0].filepath);
            return res.status(OK).type(images[0].mimetype).sendFile(fullfilepath);
        }
        return Promise.reject(new Error('Image does not exist'));
    });
 }

export function getPromoPics(req: Request, res: Response) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log("Test")
    const promotion_id = req.params.promo_id;
    console.log("ID:" + promotion_id);
    pool.query('SELECT * FROM promotion_pictures WHERE promotion_id = $1', [promotion_id], (error: Error, results: QueryResult) => {
        if (error) {
            res.status(404).json({success: false, message: 'not found', stack: error.stack})
        }
        const images = results.rows;
        if (images[0]) {
            const dirname = path.resolve();
            const fullfilepath = path.join(dirname, images[0].filepath);
            return res.status(OK).type(images[0].mimetype).sendFile(fullfilepath);
        }
        return Promise.reject(new Error('Image does not exist'));
    });
}
