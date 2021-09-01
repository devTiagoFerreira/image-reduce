const Multer = require('./middleware/multer');
const multer = require('multer');
const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const path = require('path')
const fs = require('fs');

const file = new Multer('./src/uploads/temp', ['image/jpeg', 'image/webp', 'application/pdf'], 1024 * 1024 * 2, 'file');

router.post('/', (req, res, next) => {
    file.upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            res.status(400).json({
                error: {
                    message: err.message,
                },
            });
        } else if (err) {
            res.status(400).json({
                error: {
                    message: err.message,
                },
            });
        }
        const oldFileDir = req.file.path;
        const newFileDir = oldFileDir.replace('temp', 'webp').replace(path.extname(oldFileDir), '.webp');
        exec(`magick ${oldFileDir} ${newFileDir}`, (error) => {
            fs.unlinkSync(oldFileDir);
            if (error) {
                return res.status(400).json({
                    message: 'Falha ao converter arquivo',
                    error: error.message
                })
            }
            return res.status(200).json({
                message: 'Arquivo convertido para extensão .webp com sucesso!'
            })
        });
    });
});

module.exports = router;
