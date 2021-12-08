import { useRouter } from 'next/router'
import Chart from "react-google-charts";
import {useEffect, useState} from "react";
import axios from "axios";

export default function ARtempGauge() {
    const router = useRouter()
    const [data,setData] = useState(0);
    const [load,setLoad] = useState(false);

    useEffect(function () {
        getData();
    },[]);

    async function getData(){
        try {
            const resposta = await axios.get(process.env.NEXT_PUBLIC_API_URL+"/ArH");
            setData(parseFloat(resposta.data.temp.toFixed(3)));
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
                ['Ar.Temp', data],
            ]}
            options={{
                redFrom: 40,
                redTo: 50,
                minorTicks: 10,
                max:50,
                majorTicks:["0","10","20","30","40","50"],
                animation:{
                    duration:1500
                }
            }}
        />
    )
}
