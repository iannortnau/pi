import { useRouter } from 'next/router'
import CPUtemp from "../../Componentes/CPUtempGauge";
import ARtempGauge from "../../Componentes/ARtempGauge";
import styles from "../../styles/Monitor.module.css";
import HumidadeGauge from "../../Componentes/HumidadeGauge";

export default function Home() {
    const router = useRouter()

    function vaiMonitor(e){
        e.preventDefault();
        router.push("../");
    }

    return (
        <div className={"corpo"}>
            <div className={styles.linha}>
                <CPUtemp/>
                <HumidadeGauge/>
                <ARtempGauge/>
            </div>
        </div>
    )
}
