<template>
    <div id="app">
        <h1>Pedagio</h1>
        <h2 id="msg">{{msg}}</h2>
        <div class="tooltip" v-show='exibecmd'>
            <input type="text" class='cmd' id="cmd" v-model="comando" name="cmd"><br>
            <span id="tooltipText" class="tooltiptext"><strong>Sintaxe:</strong><br>
                                    in/out;código da cidade;placa do veículo;número de eixos<br><br>
                                    <strong><font color="red">O número de eixos deve ser informado somente quando o veículo entra na estrada.</font></strong><br><br>
                                    Além destas strings o sistema aceita mais três comandos:<br><br>
                                    <strong><font color="red">VIN:</font></strong><br><br> Lista os veículos que estão viajando no momento<br><br>
                                    <strong><font color="red">PED:</font></strong><br><br> Lista todos os pedágios que devem ser cobrados. A lista dos pedágios deve mostrar a placa do veículo,
                                    se é caminhão ou veículo de passeio, o ponto de entrada, o ponto de saída e o valor cobrado.<br><br>
                                    <strong><font color="red">END:</font></strong><br><br> Exibe a lista de pedágios (como descrito acima) e encerra o sistema.
            </span>
        </div>
        <button class="btn"  id="env" v-show='exibecmd' v-on:click="envia">Enviar</button>
        <div id="tbRoad" v-show="exibeRoad"> 
            <table summary="Listas de veículos podem ser na pista ou que devem pagar">
                <tbody>
                    <tr>
                        <td>Placa</td>
                        <td>Tipo</td>
                        <td>Entrou</td>
                    </tr>
                    <tr id='veiculos' v-for="item in listaRoad">
                        <td>{{item.placa}}</td>
                        <td>{{item.tipo == 0 ? 'Carro' : 'Caminhão'}}</td>
                        <td>{{item.in}}</td>
                    </tr>
                </tbody>
            </table>
            <button class="btn"  id="returnb" v-on:click="volta">Voltar</button>
        </div>
        <div id="tbOut" v-show="exibeOut"> 
            <table summary="Listas de veículos podem ser na pista ou que devem pagar">
                <tbody>
                    <tr>
                        <td>Placa</td>
                        <td>Tipo</td>
                        <td>Entrou</td>
                        <td>Saiu</td>
                        <td>Valor</td>
                    </tr>
                    <tr id='cobranca' v-for="cob in listaOut">
                        <td>{{cob.placa}}</td>
                        <td>{{cob.tipo == 0 ? 'Carro' : 'Caminhão'}}</td>
                        <td>{{cob.in}}</td>
                        <td>{{cob.out}}</td>
                        <td>R$ {{cob.val}}</td>
                    </tr>
                </tbody>
            </table>
            <button class="btn"  id="returnb" v-show="reinicia == false" v-on:click="volta">Voltar</button>
        </div>
        <div id='reinicia' v-show="reinicia">
            <button class="btn"  id="reibnb" v-on:click="reiniciar">Reiniciar</button>
        </div>
    </div>
</template>

<script>
    export default {
        data : function() {
            return{
                exibeOut : false,
                exibeRoad : false,
                exibecmd: true,
                msg : 'Bem Vindo ao Pedagio',
                comando: '',
                label: '',
                listaRoad : [],
                listaOut : [],
                auxMsg: '',
                reinicia : false,
                valores : [
                            {in:'POA',out:'GRA',val:30},
                            {in:'POA',out:'GLO',val:54},
                            {in:'POA',out:'STA',val:83},
                            {in:'POA',out:'OSO',val:103},
                            {in:'GRA',out:'POA',val:30},
                            {in:'GRA',out:'GLO',val:24},
                            {in:'GRA',out:'STA',val:53},
                            {in:'GRA',out:'OSO',val:73},
                            {in:'GLO',out:'POA',val:54},
                            {in:'GLO',out:'GRA',val:24},
                            {in:'GLO',out:'STA',val:29},
                            {in:'GLO',out:'OSO',val:49},
                            {in:'STA',out:'POA',val:83},
                            {in:'STA',out:'GLO',val:29},
                            {in:'STA',out:'GRA',val:53},
                            {in:'STA',out:'OSO',val:20},
                            {in:'OSO',out:'POA',val:103},
                            {in:'OSO',out:'GLO',val:49},
                            {in:'OSO',out:'STA',val:20},
                            {in:'OSO',out:'GRA',val:73},
                          ]
            }
        },
        methods: {
            /* verifica se foi enviada um comando valido */
            verificaSintaxe(){
                if(!this.comando.length){
                    this.msg = "É necessário Informar um comando";
                    return false;
                }
                else if(this.comando.toLowerCase() == 'vin' || this.comando.toLowerCase() == 'ped' || this.comando.toLowerCase() == 'end'){
                   return true;
                }
                else{
                    this.auxMsg = this.comando.split(";");
                    
                    if(this.auxMsg.length == 1 && ((this.auxMsg[0].toLowerCase() != 'vin') || (this.auxMsg[0].toLowerCase() != 'ped') 
                    || (this.auxMsg[0].toLowerCase() != 'end'))){
                        this.msg = "Comando Inválido";
                        return false;
                    }

                    if(this.auxMsg.length == 2){
                        this.msg = "Comando Inválido";
                        return false;
                    }

                    if(this.auxMsg.length == 3 && this.auxMsg[0].toLowerCase() != 'out'){
                        this.msg = 'Dados inválidos, verifique e tente novamente';
                        return false;
                    }

                    /* se for menor que 4 parametros e nao for out */
                    if(this.auxMsg.length > 3 && this.auxMsg[0].toLowerCase() == 'out'){
                        this.msg = 'Dados inválidos, verifique e tente novamente';
                        return false;
                    }
                }
                return true;
            },
             reiniciar(){
                this.exibeOut = false,
                this.exibeRoad = false,
                this.exibecmd = true,
                this.reinicia = false,
                this.msg = 'Bem Vindo ao Pedagio',
                this.comando = '',
                this.label = '',
                this.listaRoad = [],
                this.listaOut = []
             }, 
            /*manipula a string enviada */
            envia(){
                if(this.verificaSintaxe()){ 
                    /* se for uma string valida */
                    let aux = '';
                    this.auxMsg.length;
                    if(this.auxMsg.length == 0){
                       aux = this.comando; 
                    }else{
                       aux = this.auxMsg[0]; 
                    }

                    switch(aux.toLowerCase()){
                        case 'in':
                            let cidades = ['poa','gra','sta','glo','oso'];
                            let existe = false;
                            let isNumber = parseInt(this.auxMsg[3]);
                            for(var i in cidades){
                                if(cidades[i] == this.auxMsg[1].toLowerCase()){
                                    existe = true;
                                }
                            }

                            if(existe == false){
                                   this.msg = 'Cidade Informada Inválida';
                                   this.auxMsg = '';
                                   break;
                            }
                            
                            if(this.auxMsg[2].length > 8){
                                this.msg = 'Tamanho maximo para placa e de 8 caracteres';
                                this.auxMsg = '';
                                break;

                            }
                            if(isNaN(isNumber)){
                                this.msg = 'O numero de eixos deve ser informado em formato numérico';
                                this.auxMsg = '';
                                break;
                            }else{
                                if(parseInt(this.auxMsg[3]) > 0){
                                    if(parseInt(this.auxMsg[3]) < 2 || parseInt(this.auxMsg[3]) > 8){
                                        this.msg = 'Valores aceitos para eixos somente 0 ou entre 2 e 8';
                                        this.auxMsg = '';
                                        break;
                                    }
                                }
                            }

                            let achou = false;
                            for(var i in this.listaRoad){
                                if(this.listaRoad[i].placa === this.auxMsg[2]){
                                    achou = true;
                                }
                            }   
                            if(achou){
                                this.msg = 'Veículo já esta na Rodovia';
                                this.auxMsg = '';
                            }else{
                                this.listaRoad.push({placa:this.auxMsg[2].toLowerCase(),tipo:this.auxMsg[3],in:this.auxMsg[1].toLowerCase()});
                                this.msg = 'Véiculo Entrou na Rodovia';
                                this.comando = '';
                                this.auxMsg = '';
                            }
                            
                        break;
                        case 'out':

                            for(var i in cidades){
                                if(cidades[i] == this.auxMsg[1].toLowerCase()){
                                    existe = true;
                                }
                            }

                            if(existe == false){
                                   this.msg = 'Cidade Informada Inválida';
                                   this.auxMsg = '';
                                   break;
                            }
                            
                            if(this.auxMsg[2].length > 8){
                                this.msg = 'Tamanho maximo para placa e de 8 caracteres';
                                this.auxMsg = '';
                                break;
                            }
                            let auxCar;
                            for(var i in this.listaRoad){
                                if(this.listaRoad[i].placa == this.auxMsg[2].toLowerCase()){
                                    auxCar = i;
                                }
                            }

                            if(auxCar){
                                 
                                 let auxValores;
                                 for(var i in Object.keys(this.valores)){
                                     if(this.valores[i].in.toLowerCase() == this.listaRoad[auxCar].in && this.auxMsg[1].toLowerCase() == this.valores[i].out.toLowerCase()){
                                         auxValores = parseInt(this.valores[i].val);
                                     }
                                 }

                                 if(this.auxMsg[1].toLowerCase() == this.listaRoad[auxCar].in){
                                     this.msg = 'Veículo entrou e saiu na mesma cidade não será cobrado...';
                                     this.auxMsg = '';  
                                 }else{
                                    auxValores = (auxValores * 0.20) + (parseInt(this.listaRoad[auxCar].tipo) * 0.05);
                                    this.listaOut.push({placa:this.listaRoad[auxCar].placa,tipo:this.listaRoad[auxCar].tipo,in:this.listaRoad[auxCar].in,out:this.auxMsg[1],val:auxValores});
                                    this.listaRoad.splice(auxCar,1);
                                    this.msg = 'Veículo saiu da Rodovia';
                                    this.auxMsg = '';   
                                    this.comando = '';
                                 }
                            }
                            else{
                                this.msg = 'Não Encontramos nenhum veículo na pista com esta placa'; 
                                this.auxMsg = '';
                            }

                        break;
                        case 'vin':
                            this.exibeRoad = true;
                            this.exibecmd = false;
                            this.msg =  Object.keys(this.listaRoad).length == 0 ? '0 Veículo (s) Trafegando...' : Object.keys(this.listaRoad).length +  ' Veículo (s) Trafegando...';
                            this.auxMsg = '';
                        break;
                        case 'ped':
                            this.exibeOut = true,
                            this.exibecmd = false;
                            this.msg =  Object.keys(this.listaOut).length == 0 ? '0 Boleto (s) Gerados...' : Object.keys(this.listaOut).length +  ' Boleto (s) Gerados...';
                            this.auxMsg = '';
                        break;
                        case 'end':
                            this.exibecmd = false;
                            this.exibeOut = true;
                            this.reinicia = true;
                            this.msg='Sistema Encerrado...';
                        break;
                        default:
                            this.msg = "Comando deve estar entre IN,OUT,VIN,PED,END";
                            this.auxMsg = '';
                        break;
                    }
                }
                this.auxMsg = '';
            },

            /*volta a tela inicial */
            volta(){
                this.exibeOut = false,
                this.exibeRoad = false,
                this.exibecmd = true,
                this.msg = 'Bem Vindo ao Pedagio',
                this.comando = '',
                this.label = ''
            }
        }
    }
</script>

<style>
    * {
       box-sizing: border-box;
       font-family: 'Montserrat', "sans-serif"; 
    }

    body {
        color: #fff;
        background: linear-gradient(to right, rgb(21, 153, 87), rgb(21, 87, 153));
    }

    #app {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #app h1 {
        border: 1px solid #000;
        background-color: #0004;
        padding: 20px;
        margin-bottom: 60px;
    }

    #app h2 {
        border: 1px solid #000;
        background-color: #0004;
        padding: 20px;
        margin-top: 120px;
        position: absolute;
        margin-bottom: 30px;
    }


    .tooltip {
        position: relative;
        display: inline-block;
    }

    .tooltip .tooltiptext {
        visibility: hidden;
        background-color: black;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;

        /* Position the tooltip */
        position: absolute;
        z-index: 1;
    }

    .tooltip:hover .tooltiptext {
        visibility: visible;
    }

    .cmd{
        width: 300px;
        margin-top: 80px;
    }

    .btn {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 10px;
        margin-bottom: 20px;
    }


    #tbRoad,#tbOut {
        border: 1px solid #000;
        background-color: #0004;
        padding: 20px;
        position: absolute;
        margin-bottom: 60px;
        margin-top: 200px;
    }

    tbRoad,tbOut, td, th, tfoot {
        border:solid 1px #000;
        padding:5px;
    }
</style>
