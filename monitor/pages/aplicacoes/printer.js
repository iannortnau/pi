import Head from 'next/head';
import Image from 'next/image';
import iconeImp from '../../imgs/icons8_print_480px.png';
import iconeScan from '../../imgs/icons8_scanner_512px.png';
import iconeLembrete from '../../imgs/icons8_note_150px.png';
import iconeErro from '../../imgs/icons8_error_150px.png';
import iconeSuccess from '../../imgs/icons8_ok_150px.png';
import {useState} from "react";
import axios from "axios";
import md5 from "md5";
//import QrReader from 'react-qr-reader'
//import moment from "moment";


export default function Printer() {
    const [estado,setEstado] = useState(0);
    const [estadoQr,setEstadoQr] = useState(0);
    const [senha,setSenha] = useState("");
    const [id,setId] = useState(null);
    let [pdf,setPdf] = useState(null);
    const [check,setCheck] = useState(false);
    const [titulo,setTitulo] = useState("");
    const [lembrete,setLembrete] = useState("");
    const [envio,setEnvio] = useState(0)
    async function loga(e) {
        e.preventDefault();
        const auxSenha = md5(senha);
        const resposta = await axios.post(process.env.NEXT_PUBLIC_API_URL+"/verificasenha",{senha:auxSenha});
        console.log(resposta.data);
        if(resposta.data){
            setEstado(2);
        }else {
            setEstado(0);
        }
    }

    async function printTrefa(e) {
        e.preventDefault();
        const resposta = await axios.get(process.env.NEXT_PUBLIC_API_URL+"/printer");
        console.log(resposta.data);
        if(resposta.data){
            setEstado(2);
        }else {
            setEstado(0);
        }
    }

    async function printLembrete(e) {
        e.preventDefault();
        setEnvio(1);
        const resposta = await axios.post(process.env.NEXT_PUBLIC_API_URL+"/printer",{
            data:{
                importante:check,
                titulo:titulo,
                lembrete:lembrete
            }
        });
        console.log(resposta.data);
        if(resposta.status === 200){
            setEnvio(2);
            setTimeout(function () {
                setEnvio(0);
            },5000);
        }else {
            setEnvio(3);
            setTimeout(function () {
                setEnvio(0);
            },5000);
        }
    }

    return (
        <div className="corpo">
            {estado===0&&
                <div className="bloco sombra">
                    <div className={"img"}>
                        <Image src={iconeImp}/>
                    </div>
                    <input type={"password"} placeholder={"Senha"} className={"senha"} onChange={function (aux) {setSenha(aux.target.value)}}/>
                    <input type={"button"} value={"Entrar"} className={"botao w3-ripple"} onClick={function (e){
                        setEstado(1);
                        loga(e);
                    }}/>
                </div>
            }
            {estado===1&&
                <div className="bloco sombra">
                    <div className={"img w3-spin"}>
                        <Image src={iconeImp}/>
                    </div>
                </div>
            }
            {estado===2&&
                <>
                    <div className="bloco sombra">
                        <div className={"img"}>
                            <Image src={iconeLembrete}/>
                        </div>
                        <input type={"button"} value={"Lembrete"} className={"botao w3-ripple"} onClick={function () {
                            setEstado(4);
                        }}/>
                    </div>
                    <div className="bloco sombra">
                        <div className={"img"}>
                            <Image src={iconeImp}/>
                        </div>
                        <input type={"button"} value={"Imprimir Tarefas"} className={"botao w3-ripple"} onClick={printTrefa}/>
                    </div>
                    <div className="bloco sombra">
                        <div className={"img"}>
                            <Image src={iconeScan}/>
                        </div>
                        <input type={"button"} value={"Scanear"} className={"botao w3-ripple"} onClick={function () {
                            setEstado(3);
                        }}/>
                    </div>
                </>
            }
            {/*estado===3&&
                <>
                    <div className="bloco sombra">
                        {estadoQr==1
                            ?
                            <div className={"scan"}>
                                <QrReader
                                    delay={300}
                                    onError={function (err) {
                                        console.log(err);
                                    }}
                                    onScan={function (aux) {
                                        if(aux){
                                            setId(aux);
                                            setEstadoQr(0);
                                        }
                                    }}
                                    style={{ width: '100%' }}
                                />
                                <input type={"button"} value={"Parar"} className={"botao w3-ripple"} onClick={function () {
                                    setEstadoQr(0);
                                }}/>
                            </div>
                            :
                            <>
                                <input type={"button"} value={"Scan"} className={"botao w3-ripple"} onClick={function () {
                                    setEstadoQr(1);
                                }}/>
                            </>
                        }
                        <input type={"button"} value={"Voltar"} className={"botao w3-ripple"} onClick={function (){
                            setEstado(2);
                        }}/>
                        {id&&
                            <>
                                <input type={"button"} value={"Imprimir Tarefas"} className={"botao w3-ripple"} onClick={printTrefa}/>
                                <input type={"button"} value={"Imprimir Tarefas"} className={"botao w3-ripple"} onClick={printTrefa}/>
                                <input type={"button"} value={"Imprimir Tarefas"} className={"botao w3-ripple"} onClick={printTrefa}/>
                            </>
                        }
                    </div>
                </>
            */}
            {estado===4&&
                <>
                    <div className="bloco sombra">
                        <div className={"img"}>
                            {envio===0&&<Image src={iconeLembrete}/>}
                            {envio===1&&<Image className={"w3-spin"} src={iconeLembrete}/>}
                            {envio===2&&<Image src={iconeSuccess}/>}
                            {envio===3&&<Image src={iconeErro}/>}

                        </div>
                        <h1 className={"texto"}>Lembrete</h1>
                        <from className={"form"}>
                            <div className={"linha"}>
                                {check
                                    ?
                                    <button onClick={function () {
                                        setCheck(false);
                                    }} className="checkTrue"/>
                                    :
                                    <button onClick={function () {
                                        setCheck(true);
                                    }} className="checkFalse"/>
                                }
                                <h3 className={"texto"}>Importante</h3>
                            </div>
                            <input type={"text"} placeholder={"Título"} className={"senha"} onChange={function (aux) {
                                setTitulo(aux.target.value);
                            }}/>
                            <input type={"text"} placeholder={"Lembrete"} className={"senha"} onChange={function (aux) {
                                setLembrete(aux.target.value);
                            }}/>
                            <input type={"button"} value={"Imprimir Lembrete"} className={"botao w3-ripple"} onClick={function (e) {
                                if(envio === 0){
                                    printLembrete(e);
                                }
                            }}/>
                        </from>
                        <input type={"button"} value={"Voltar"} className={"botao w3-ripple"} onClick={function (){
                            setEstado(2);
                        }}/>
                    </div>
                </>
            }
        </div>
    );
}
