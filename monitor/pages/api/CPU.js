import * as fs from "fs";

export default function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return getCPUTemp();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    async function getCPUTemp() {
        const temperature = fs.readFileSync("/sys/class/thermal/thermal_zone0/temp");
        res.status(200).send({temp:temperature/1000,time: new Date()});
    }
}
