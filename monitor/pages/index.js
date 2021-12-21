import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'

export default function Home() {
    const router = useRouter()

    function vaiMonitor(e){
        e.preventDefault();
        router.push("aplicacoes/monitor");
    }

    function vaiPrinter(e){
        e.preventDefault();
        router.push("aplicacoes/printer");
    }

    return (
        <div className={"corpo"}>
            <div className={"coluna"}>
                <input type={"button"} className={"botao w3-ripple"} value={"Monitor"} onClick={vaiMonitor}/>
                <input type={"button"} className={"botao w3-ripple"} value={"Printer"} onClick={vaiPrinter}/>
            </div>
        </div>
    )
}
