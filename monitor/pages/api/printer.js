//import fs, {close} from "fs";
//import {printer,types} from "node-thermal-printer";
//import * as Printer from "node-printer";
//const escpos = require('escpos');
//const statuses = require('escpos/statuses');
//escpos.SerialPort = require('escpos-serialport');
//const SerialPort = require('serialport');
//SerialPort.get = null;
//const serialPort = new SerialPort('/dev/usb/lp0',{
//    baudRate: 4800,
//});
import {spawn,exec} from "child_process";
import {printer} from "node-thermal-printer";
import axios from "axios";

export default function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return printa();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    async function printa() {
        const resposta = await axios.get("https://kanbanflow.com/api/v1/tasks?columnId=nIZOWYHLpnxc",{
            headers:{
                Authorization:"Basic YXBpVG9rZW46NDA4Y2M5NWJjMDE0MzViZjA3YTZkMjBiMGUxYjAxNGQ="
            }
        });

        const listaDeTarefas = [];

        for (let i = 0; i < resposta.data.length; i++) {
            for (let j = 0; j < resposta.data[i].tasks.length; j++) {
                listaDeTarefas.push(resposta.data[i].tasks[j]);
            }
        }

        const imp = new printer({
            type:"epson",
            interface:"/dev/usb/lp0",
            width:42
        });

        //console.log(await imp.isPrinterConnected());

        for (let i = 0; i < listaDeTarefas.length; i++) {
            const tarefa = listaDeTarefas[i];
            const subTrefa = tarefa.subTasks||null;

            imp.bold(true);
            imp.println("+========================================+");
            imp.alignCenter();
            imp.setTextSize(1,1);
            imp.println(tarefa.name);
            imp.println();
            imp.println();
            imp.setTextNormal();
            imp.alignLeft();
            imp.bold(true);
            imp.print("Descrição: ");
            imp.println(tarefa.description);
            imp.bold(false);
            imp.println();
            imp.bold(true);
            imp.println("SubTrefas:");
            if(subTrefa){
                for (let j = 0; j < subTrefa.length; j++) {
                    imp.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
                        { text:"    "+subTrefa[j].name, align:"LEFT"},
                        { text:!subTrefa[j].finished?"[ ]":"[X]", align:"RIGHT"}
                    ]);
                }
            }
            imp.println();
            imp.alignCenter();
            imp.setTextSize(1,1);
            imp.printQR(tarefa._id);
            imp.setTextNormal();
            imp.println();
            imp.print("+========================================+");
            imp.cut();
        }

        imp.execute(function(err){
            if (err) {
                console.error("Print failed", err);
            } else {
                console.log("Print done");
            }
        });
        res.status(200).send("ok");
    }
}


//api 408cc95bc01435bf07a6d20b0e1b014d

/*
imp.bold(true);
        imp.println("+========================================+");
        imp.alignCenter();
        imp.println("Incrivel é tu\nlinda\nforte\ncarinhosa\nfaz essa bobão aqui\nn se sentir um merda\ngosto muito de ti\ne\namo\ne\nrespeito com todo\namor e respeito\nque tenho");
        imp.print("+========================================+");
        imp.cut();
 */