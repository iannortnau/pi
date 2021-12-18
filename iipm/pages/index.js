import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import iconeImp from '../imgs/icons8_print_480px.png';
import iconeScan from '../imgs/icons8_scanner_512px.png';
import {useState} from "react";
import axios from "axios";
import md5 from "md5";
import moment from "moment";



export default function Home() {
  const [estado,setEstado] = useState(0);
  const [senha,setSenha] = useState(null);
  let [pdf,setPdf] = useState(null);

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

    async function scan(){
        setEstado(1);
        const resposta = await axios.get(process.env.NEXT_PUBLIC_API_URL+"/scan",);
        console.log(resposta);
        pdf = resposta.data;
        var link = document.createElement('a');
        link.innerHTML = 'Download PDF file';
        link.download = 'file.pdf';
        link.href = 'data:application/octet-stream;base64,' + pdf;
        link.click();
        setEstado(2);
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
                          <Image src={iconeImp}/>
                      </div>
                      <input type={"button"} value={"Imprimir"} className={"botao w3-ripple"} onClick={loga}/>
                  </div>
                  <div className="bloco sombra">
                      <div className={"img"}>
                          <Image src={iconeScan}/>
                      </div>
                      <input type={"button"} value={"Scanear"} className={"botao w3-ripple"} onClick={scan}/>
                  </div>
              </>
          }
          {estado===3&&
              <>
                  <div className="bloco sombra">
                      <div className={"img"}>
                          <Image src={iconeImp}/>
                      </div>
                      <input type={"button"} value={"Imprimir"} className={"botao w3-ripple"} onClick={loga}/>
                  </div>
                  <div className="bloco sombra">
                      <div className={"img"}>
                          <Image src={iconeScan}/>
                      </div>
                      <input type={"button"} value={"Scanear"} className={"botao w3-ripple"} onClick={loga}/>
                  </div>
              </>
          }
          {estado===4&&
              <>
                  <div className="bloco sombra">
                      <div className={"img"}>
                          <Image src={iconeImp}/>
                      </div>
                      <input type={"button"} value={"Imprimir"} className={"botao w3-ripple"} onClick={loga}/>
                  </div>
                  <div className="bloco sombra">
                      <div className={"img"}>
                          <Image src={iconeScan}/>
                      </div>
                      <input type={"button"} value={"Scanear"} className={"botao w3-ripple"} onClick={loga}/>
                  </div>
              </>
          }
          {estado===5&&
              <>
                  <div className="bloco sombra">
                      <div className={"img"}>
                          <Image src={iconeScan}/>
                      </div>
                      <a href={pdf}  download={moment(new Date()).format("DD-MM-YYYY/HH:mm:ss")+".pdf"} rel="noreferrer" onClick={function () {
                          setEstado(2);
                      }}>Download</a>
                  </div>
              </>
          }
      </div>
  );
}
