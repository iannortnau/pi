import * as sensor from "node-dht-sensor";

export function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return getArTemp();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    async function getArTemp() {
        console.log("a");
        /*
        await sensor.read(11,4, function (err,temperature,humidity) {
            if(!err){
                console.log(`temp: ${temperature}°C, humidity: ${humidity}%`);
                return res.status(200);
            }
        })*/
    }
}
