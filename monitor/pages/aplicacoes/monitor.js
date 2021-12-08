import { useRouter } from 'next/router'
import CPUtemp from "../../Componentes/CPUtempGauge";
import ARtempGauge from "../../Componentes/ARtempGauge";
import styles from "../../styles/Monitor.module.css";
import HumidadeGauge from "../../Componentes/HumidadeGauge";
import {useEffect, useState} from "react";
import axios from "axios";
import Graf from "../../Componentes/Graf";


export default function Monitor() {
    const router = useRouter()
    const [data,setData] = useState({
        cpu:null,
        temp:null,
        hum:null
    });
    const [cpu,setCpu] = useState([[
        { type: 'date', label: 'CPU' },
        '',
    ]]);
    const [hum,setHum] = useState([[
        { type: 'date', label: 'Humidade',color:"red" },
        ''
    ]]);
    const [temp,setTemp] = useState([[
        { type: 'date', label: 'Temp' },
        '',
    ]]);
    const [line,setLine] = useState([[
        { type: 'date', label: 'Temp' },
        'C',
        'A',
        'H'
    ]]);

    function vaiMonitor(e){
        e.preventDefault();
        router.push("../");
    }

    useEffect(function () {
        getData();
    },[]);

    async function getData(){
        try {
            const resposta = await axios.get(process.env.NEXT_PUBLIC_API_URL+"/data");
            console.log(resposta);
            setData(resposta.data);
            cpu.push([new Date(resposta.data.time),resposta.data.cpu]);
            hum.push([new Date(resposta.data.time),resposta.data.hum]);
            temp.push([new Date(resposta.data.time),resposta.data.temp]);
            line.push([new Date(resposta.data.time),resposta.data.cpu,resposta.data.hum,resposta.data.temp]);
            setCpu(cpu);
            setTemp(temp);
            setHum(hum);
            setLine(line);
            setTimeout(getData,1000);
        }catch (e) {
            console.log(e);
        }
    }

    return (
        <div className={"corpo"}>
            <div className={styles.linha}>
                <CPUtemp
                    data={data.cpu}
                />
                <HumidadeGauge
                    data={data.hum}
                />
                <ARtempGauge
                    data={data.temp}
                />
            </div>
            <div className={styles.grafico}>
                <Graf
                    data={{
                        cpu:cpu,
                        temp:temp,
                        hum:hum,
                        all:line
                    }}
                />
            </div>
        </div>
    )
}
