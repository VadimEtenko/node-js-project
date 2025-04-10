'use strict'

import * as http from 'http'
import * as fs from 'fs';
import log4js from "log4js";
import crypto from 'crypto';

log4js.configure({
    appenders: { text: { type: "file", filename: "text.log" } },
    categories: { default: { appenders: ["text"], level: "info" } },
});

const logger: log4js.Logger = log4js.getLogger();

logger.level = "info";


const server: http.Server = http.createServer(function (req, res) {

        const uuid:string = crypto.randomUUID();

        logger.info(`Get request for ${req.url} with ${req.method} method with id=${uuid}`);

        res.writeHead(200, {'Content-Type': 'text/html'});

        const html:string = fs.readFileSync('static/html/index.html', 'utf-8').toString();

        res.write(html);
        res.end();
        logger.info(`Send 'hello world' for request with id=${uuid}`);
})

server.listen(3000, () => {
    console.log("Сервер запущен по адресу http://localhost:3000");
});