import { useRouter } from 'next/router'
import CPUtemp from "../../Componentes/CPUtempGauge";
import ARtempGauge from "../../Componentes/ARtempGauge";
import styles from "../../styles/Monitor.module.css";
import HumidadeGauge from "../../Componentes/HumidadeGauge";
import {useEffect, useState} from "react";
import axios from "axios";
import Graf from "../../Componentes/Graf";


export default function Monitor() {


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
