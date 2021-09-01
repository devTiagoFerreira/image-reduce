const express = require('express');
const cors = require('cors');
const router = require('./src/towebp')

class App {
    constructor() {
        this.server = express();
        this.cors = this.server.use(cors());
        this.middleware = this.middleware();
        this.routes = this.routes();
    }

    middleware() {
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: false }));
    }

    routes() {
        this.server.use('/towebp', router);
        this.server.use((req, res, next) => {
            const error = new Error();
            error.status = 404;
            error.message = 'Rota não encontrada';
            return res.status(error.status).send({
                error: {
                    message: error.message,
                },
            });
        });
    }
}

module.exports = App;
