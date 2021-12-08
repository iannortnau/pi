import * as sensor from "node-dht-sensor";
import fs from "fs";

sensor.setMaxRetries(10);

export default function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return getData();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    async function getData() {
        const resposta = await sensor.read(11,4);
        const cpu = await fs.readFileSync("/sys/class/thermal/thermal_zone0/temp");
        res.status(200).send({cpu:cpu/1000,temp:resposta.temperature,hum:resposta.humidity,time: new Date()});
    }
}
