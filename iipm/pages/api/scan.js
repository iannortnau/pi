import md5 from "md5";
import * as fs from "fs";
import {exec} from "child_process";
import * as path from "path";
import mime from "mime";

export default function handler(req, res) {
    const imp = process.env.IMP;
    //const senha = req.body.senha;
    //const chave = md5(process.env.PASS);
    switch (req.method) {
        case 'GET':
            return scan();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    async function scan() {
        const data = new Date().toISOString();
        exec("scanimage --mode Color -d "+imp+" --format=tiff | convert tiff:- scan/"+data+".pdf", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                res.status(400).send("Erro");
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                const pdf = fs.readFileSync("scan/"+data+".pdf", {encoding: 'base64'});
                res.status(200).send(pdf);
                //console.log(pdf);
            }
            console.log(`stdout: ${stdout}`);
        });
    }
}
