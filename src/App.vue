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
                <thead>
                    <tr>
                        <th colspan="3">Lista de Veículos na Pista:</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Placa</td>
                        <td>Tipo</td>
                        <td>Entrou</td>
                    </tr>
                    <tr>
                        <td>$500</td>
                        <td>$640</td>
                        <td>$650</td>
                    </tr>
                </tbody>
            </table>
            <button class="btn"  id="returnb" v-on:click="volta">Voltar</button>
        </div>
        <div id="tbOut" v-show="exibeOut"> 
            <table summary="Listas de veículos podem ser na pista ou que devem pagar">
                <thead>
                    <tr>
                        <th colspan="5">Lista de Boletos Gerados:</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Placa</td>
                        <td>Tipo</td>
                        <td>Entrou</td>
                        <td>Saiu</td>
                        <td>Valor</td>
                    </tr>
                    <tr>
                        <td>$500</td>
                        <td>$640</td>
                        <td>$650</td>
                        <td>$650</td>
                        <td>$650</td>
                    </tr>
                </tbody>
            </table>
            <button  class="btn"  id="endB" v-on:click="volta">{{label}}</button>
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
                listaRoad : {},
                listaOut : {},
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
                var auxMsg = [];
                if(!this.comando.length){
                    this.msg = "É necessário Informar um comando";
                    return false;
                }else{
                    auxMsg = this.comando.split(";");
                    if(auxMsg.length == 1 && ((auxMsg[0].toLowerCase() != 'vin') || (auxMsg[0].toLowerCase() != 'ped') 
                    || (auxMsg[0].toLowerCase() != 'end'))){
                        this.msg = "Comando Inválido";
                        return false;
                    }

                    if(auxMsg.length == 2){
                        this.msg = "Comando Inválido";
                        return false;
                    }
                    /* se for menor que 4 parametros e nao for out */
                    if(auxMsg.length < 4 && auxMsg.length >= 3 && auxMsg[0].toLowerCase() == 'in'){
                        this.msg = 'Dados inválidos, verifique e tente novamente';
                        return false;
                    }
                }
                return true;
            },
            /* verifica o tipo de envio e direciona para     

            /*manipula a string enviada */
            envia(){
                if(this.verificaSintaxe()){ 
                    switch(auxMsg[0].toLowerCase){
                        case 'in':

                        break;
                        case 'out':
                        
                        break;
                        case 'vin':

                        break;
                        case 'ped':

                        break;
                        case 'end':

                        break;
                        default:
                            this.msg = "Comando deve estar entre IN,OUT,VIN,PED,END";
                        break;
                    }
                }
            },

            /*encerra a operação */
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
