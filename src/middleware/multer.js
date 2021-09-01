const multer = require('multer');
class Multer {
    constructor(destination, mimeType = [], maxSize, fieldName) {
        this.storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, destination);
            },
            filename: (req, file, cb) => {
                cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
            },
        });

        this.fileFilter = (req, file, cb) => {
            if (mimeType.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(null, false);
                cb(new Error('Extensão inválida!'));
            }
        };

        this.config = {
            storage: this.storage,
            fileFilter: this.fileFilter,
            limits: {
                fileSize: maxSize,
            },
        };

        this.upload = multer(this.config).single(fieldName);
    }
}

module.exports = Multer;
