import * as sensor from "node-dht-sensor";

sensor.setMaxRetries(10);

export default function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return getArTemp();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    async function getArTemp() {
        const resposta = await sensor.read(11,4);
        //console.log(resposta);
        if(!resposta.errors){
            res.status(200).send({temp:resposta.temperature,hum:resposta.humidity,time: new Date()});
        }else{
            res.status(400).send({erro:"falha na leitura da temperatura ou humidade"});
        }
    }
}
