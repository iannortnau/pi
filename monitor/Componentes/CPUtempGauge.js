import { useRouter } from 'next/router'
import Chart from "react-google-charts";
import {useEffect, useState} from "react";
import axios from "axios";

export default function CPUtempGauge() {
    const router = useRouter()
    const [data,setData] = useState(0);

    useEffect(function () {
        setInterval(getData,500);
    },[]);

    async function getData(){
        const resposta = await axios.get(process.env.NEXT_PUBLIC_API_URL+"/CPU");
        setData(parseFloat(resposta.data.temp.toFixed(0)));
    }


    return (
        <Chart
            width={400}
            height={400}
            chartType="Gauge"
            loader={<div>Loading Chart</div>}
            data={[
                ['Label', 'Value'],
                ['CPU.Temp', data],
            ]}
            options={{
                redFrom: 80,
                redTo: 90,
                yellowFrom: 60,
                yellowTo: 80,
                minorTicks: 10,
                majorTicks:["","","","","","","","","",""],
                max:90,
                animation:{
                    duration:1500
                }
            }}
        />
    )
}
