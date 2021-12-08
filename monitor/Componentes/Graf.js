import { useRouter } from 'next/router'
import Chart from "react-google-charts";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Graf(props) {
    const router = useRouter()
    const [data,setData] = useState(0);
    console.log(props.data);


    return (
        <>
            <Chart
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={props.data.all}
                options={{
                    fontSize: 25,
                    lineWidth:5,
                    width: 1150,
                    height: 300,
                }}
            />
            {/*
            <Chart
                chartType="Line"
                loader={<div>Loading Chart</div>}
                data={props.data.temp}
                options={{
                    animation:{
                        duration:1500
                    },
                    width: 1150,
                    height: 100,
                }}
            />
            <Chart
                chartType="Line"
                loader={<div>Loading Chart</div>}
                data={props.data.hum}
                options={{
                    animation:{
                        duration:1500
                    },
                    width: 1150,
                    height: 100,
                }}
            />
            */}
        </>
    )
}
