/// get user input
/// generate QR code
// get it ready for download

import bodyParser from "body-parser";
import qr from "qr-image";
import  express from "express";
import {dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true }));

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/public/index.html");
});


app.post("/", (req,res) =>{

    const url = req.body.url;
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream("public/qr_img.png"));

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="style.css">
            <title>QR Generator</title>
        </head>
        <body>
            <div class="container">
                <form class="form" id="form" action="/" method="post">
                    <h2>QR Generator</h2>
                    <div class="form-control">
                        <label for="url">Enter a URL to convert to a QR code.</label>
                        <input id="url" type="text" placeholder="Enter URL">
                        <small>Error message</small>
                    </div>
                    <button>Generate QR Code</button>
                </form>
            </div>
            <div class="qr-container">
                <h2>${url}</h2>
                <img src="/qr_img.png" alt="QR Code Image">
                <a id="downloadBtn" href="/qr_img.png" download="QRCode.png">
                    <button>Download QR Code</button>
                </a>
            </div>
        </body>
        </html>
    `);
});



app.listen(port, ()=>{
    console.log(`Server running on port ${port}.`)
});
