import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'

export default function Home() {
    const router = useRouter()

    function vaiMonitor(e){
        e.preventDefault();
        router.push("aplicacoes/monitor");
    }

    return (
        <div className={"corpo"}>
            <div>
                <input type={"button"} className={"sombra w3-button "+styles.botoes} value={"Monitor"} onClick={vaiMonitor}/>
            </div>
        </div>
    )
}
