const express = require('express');
const ejs = require('ejs');
const path = require('path');
const pdf = require('html-pdf')
const app = express();

const passengers = [
    {
        name: "Joyce",
        flightNumber: 7859,
        time: "18h00",
    },
    {
        name: "Brock",
        flightNumber: 7859,
        time: "18h00",
    },
    {
        name: "Eve",
        flightNumber: 7859,
        time: "18h00"
    },
];

app.get("/", (req, res) => {
    var arquivo = path.join(__dirname, "/print.ejs");
    ejs.renderFile(arquivo,{ passengers },
        (err, html) => {
            if (err) {
                return res.send("Erro na leitura do arquivo");
            }

            const options = {
                height: "11.25in",
                width: "8.5in",
                heade: {
                    height: "20mm",
                },
                footer: {
                    height: "20mm",
                },
            };

            //criar o pdf
            pdf.create(html, options).toFile("report.pdf", (err, data) => {
                if (err) {
                    return res.send("Erro ao gerar PDF");
                }

                //enviar para o navegador
                return res.send(html);
            });
        }
    );
});

app.listen(3000, () => {
    console.log("Server Rining...");
});
