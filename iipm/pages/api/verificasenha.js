import fs from "fs";
import md5 from "md5";

export default function handler(req, res) {
    const senha = req.body.senha;
    const chave = md5(process.env.PASS);
    switch (req.method) {
        case 'POST':
            return verifica();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    async function verifica() {
        if(senha === chave){
            res.status(200).send(true);
        }else{
            res.status(200).send(false);
        }
    }
}
