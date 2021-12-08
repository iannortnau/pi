import { useRouter } from 'next/router'
import Chart from "react-google-charts";
import {useEffect, useState} from "react";
import axios from "axios";

export default function HumidadeGauge() {
    const router = useRouter()
    const [data,setData] = useState(0);
    const [load,setLoad] = useState(false);

    useEffect(function () {
        getData();
    },[]);

    async function getData(){
        try {
            const resposta = await axios.get(process.env.NEXT_PUBLIC_API_URL+"/ArH");
            setData(resposta.data.hum);
        }catch (e) {
            console.log(e);
        }
        setTimeout(getData,3000);
        console.log("leu");
    }

    return (
        <Chart
            width={400}
            height={400}
            chartType="Gauge"
            loader={<div>Loading Chart</div>}
            data={[
                ['Label', 'Value'],
                ['Humidade', data],
            ]}
            options={{
                minorTicks: 10,
                max:100,
                redFrom: 80,
                redTo: 100,
                majorTicks:["","","","","","","","","","",""],
                animation:{
                    duration:1500
                }
            }}
        />
    )
}
