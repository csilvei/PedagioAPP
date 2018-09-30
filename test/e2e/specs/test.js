module.exports = {

  /* bloco de testes de validação de dados de entrada e acesso ao site */
  /* testes de acesso ao site */
  'Verificar se Acessou o site pelo Título': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .assert.title('Pedagio App')

      .end()
  },

  'Verificar se exibe o help': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .moveTo("#tooltip",300,102)
      .waitForElementPresent('#tooltipText',500,true)
      .end()
  },

  /* testes de valores inválidos no in/out */
  'Valida envio vazio': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .click('#env')
      .assert.containsText("#msg","É necessário Informar um comando")
      .end()
  },

  'Valida envio errado': function (browser) {
    const devServer = browser.globals.devServerURL
    //npm run e2e
    browser
      .url(devServer)
      .setValue("#cmd","asdsad;")
      .click('#env')
      .pause(1000)
      .assert.containsText("#msg","Comando Inválido") /* 1 comando errado */
      .end()
  },

  'Valida envio errado com 4 comandos': function (browser) {
    const devServer = browser.globals.devServerURL
    //npm run e2e
    browser
      .url(devServer)
      .setValue("#cmd","asdsad;sadsadas;sadsadas;") 
      .click('#env')
      .pause(1000)
      .assert.containsText("#msg","Comando deve estar entre IN,OUT,VIN,PED,END") /* 4 comandos errados */ 
      .end()
  },

  'Valida envio errado com 5 comandos': function (browser) {
    const devServer = browser.globals.devServerURL
    //npm run e2e
    browser
      .url(devServer)
      .setValue("#cmd","asdsad;sadsadas;sadsadas;sadsadasd;") 
      .click('#env')
      .pause(1000)
      .assert.containsText("#msg","Comando deve estar entre IN,OUT,VIN,PED,END") /* 5 comandos errados */ 
      .end()
  },

  'Valida envio errado com 3 comandos': function (browser) {
    const devServer = browser.globals.devServerURL
    //npm run e2e
    browser
      .url(devServer)
      .setValue("#cmd","asdsads;adsada;ssadsadas")
      .click('#env')
      .pause(1000)
      .assert.containsText("#msg","Dados inválidos, verifique e tente novamente") /* 3 comandos errados */
      .end()
  },

/* fim do bloco de testes de validação de dados de entrada e acesso ao site */

/* bloco de testes dos comandos in  e vin */

'Valida carregamento da tela vin e voltar a tela  inicial': function (browser) {
  const devServer = browser.globals.devServerURL
  //npm run e2e
  browser
    .url(devServer)
    .setValue("#cmd","vin")
    .click('#env')
    .pause(1000)
    .assert.containsText("#msg","0 Veículo (s) Trafegando...") /* carregou corretamento a tela vin */
    .click('#returnb')
    .assert.containsText("#msg","Bem Vindo ao Pedagio") /* retorna a tela inicial */
    .end()
},

'Valida envio vin sem dados inseridos': function (browser) {
  const devServer = browser.globals.devServerURL
  //npm run e2e
  browser
    .url(devServer)
    .setValue("#cmd","vin")
    .click('#env')
    .pause(1000)
    .assert.containsText("#msg","0 Veículo (s) Trafegando...") /* carregou a tela vin */ 
    //assert.elementCount('td', 0) /* testa se carregou a tabela com 0 elementos */
    .end()
},

'Valida envio in com cidade invalida': function (browser) {
  const devServer = browser.globals.devServerURL
  //npm run e2e
  browser
    .url(devServer)
    .setValue("#cmd","in;Gramado;adv-5569;0")
    .click('#env')
    .pause(1000)
    .assert.containsText("#msg","Cidade Informada Inválida") /* cidade invalida */
    .end()
},

'Valida envio in com placa maior que 8 caracteres': function (browser) {
  const devServer = browser.globals.devServerURL
  //npm run e2e
  browser
    .url(devServer)
    .setValue("#cmd","in;Poa;adv-556955;0")
    .click('#env')
    .pause(1000)
    .assert.containsText("#msg","Tamanho maximo para placa e de 8 caracteres") /* placa maior que 8 */
    .end()
},

'Valida envio in com eixos em string': function (browser) {
  const devServer = browser.globals.devServerURL
  //npm run e2e
  browser
    .url(devServer)
    .setValue("#cmd","in;Poa;adv-5569;doze")
    .click('#env')
    .pause(1000)
    .assert.containsText("#msg","O numero de eixos deve ser informado em formato numérico") /* eixos fora do formato */
    .end()
},

'Valida envio in com eixos em fora do range': function (browser) {
  const devServer = browser.globals.devServerURL
  //npm run e2e
  browser
    .url(devServer)
    .setValue("#cmd","in;Poa;adv-5569;10")
    .click('#env')
    .pause(1000)
    .assert.containsText("#msg","Valores aceitos para eixos somente 0 ou entre 2 e 8") /* eixos fora do formato */
    .end()
},

'Valida envio in com dados corretos': function (browser) {
  const devServer = browser.globals.devServerURL
  //npm run e2e
  browser
    .url(devServer)
    .setValue("#cmd","in;Poa;adv-5569;0")
    .click('#env')
    .pause(1000)
    .assert.containsText("#msg","Véiculo Entrou na Rodovia") /* eixos fora do formato */
    .end()
},

'Valida envio in com dados ja inseridos e ainda nao sairam': function (browser) {
  const devServer = browser.globals.devServerURL
  //npm run e2e
  browser
    .url(devServer)
    .setValue("#cmd","in;Poa;adv-5569;0")
    .click('#env')
    .pause(1000)
    .setValue("#cmd","in;Poa;adv-5569;0")
    .click('#env')
    .assert.containsText("#msg","Veículo já esta na Rodovia") /* eixos fora do formato */
    .end()
},

'Valida envio vin com dados inseridos': function (browser) {
  const devServer = browser.globals.devServerURL
  //npm run e2e
  browser
    .url(devServer)
    .setValue("#cmd","in;Poa;adv-5569;0")
    .click('#env')
    .setValue("#cmd","vin")
    .click('#env')
    .pause(1000)
    .assert.containsText("#msg","1 Veículo (s) Trafegando...") /* carregou a tela vin */
    .end()
},

/* fim do bloco de testes dos comandos in  e vin */

/* bloco de testes do comando out */
'Valida comando out com a mesma cidade informada': function (browser) {
  const devServer = browser.globals.devServerURL
  //npm run e2e
  browser
    .url(devServer)
    .setValue("#cmd","in;Poa;adv-5569;0")
    .click('#env')
    .setValue("#cmd","out;poa;adv-5569")
    .click('#env')
    .pause(1000)
    .assert.containsText("#msg","Veículo entrou e saiu na mesma cidade não será cobrado...") /* carregou a tela vin */
    .end()
},

'Valida comando out correto': function (browser) {
  const devServer = browser.globals.devServerURL
  //npm run e2e
  browser
    .url(devServer)
    .setValue("#cmd","in;Poa;adv-5569;0")
    .click('#env')
    .setValue("#cmd","out;gra;adv-5569")
    .click('#env')
    .pause(1000)
    .assert.containsText("#msg","Veículo saiu da Rodovia") /* carregou a tela vin */
    .end()
},

'Valida comando out com placa inexistente': function (browser) {
  const devServer = browser.globals.devServerURL
  //npm run e2e
  browser
    .url(devServer)
    .setValue("#cmd","in;Poa;adv-5569;0")
    .click('#env')
    .setValue("#cmd","out;gra;adv-7777")
    .click('#env')
    .pause(1000)
    .assert.containsText("#msg","Não Encontramos nenhum veículo na pista com esta placa") /* carregou a tela vin */
    .end()
},

/*fim do  bloco de testes do comando out */

/* bloco de testes do comando ped */
'Valida envio ped sem dados inseridos': function (browser) {
  const devServer = browser.globals.devServerURL
  //npm run e2e
  browser
    .url(devServer)
    .setValue("#cmd","ped")
    .click('#env')
    .pause(1000)
    .assert.containsText("#msg","0 Boleto (s) Gerados...") /* carregou a tela vin */ 
    //assert.elementCount('td', 0) /* testa se carregou a tabela com 0 elementos */
    .end()
},

'Valida envio ped com dados inseridos': function (browser) {
  const devServer = browser.globals.devServerURL
  //npm run e2e
  browser
    .url(devServer)
    .setValue("#cmd","in;Poa;adv-5569;0")
    .click('#env')
    .setValue("#cmd","out;gra;adv-5569")
    .click('#env')
    .setValue("#cmd","ped")
    .click('#env')
    .pause(1000)
    .assert.containsText("#msg","1 Boleto (s) Gerados...") /* carregou a tela vin */ 
    //assert.elementCount('td', 0) /* testa se carregou a tabela com 0 elementos */
    .end()
},

/* fim do bloco de testes do comando ped */

/* bloco de testes do comando end */

'Valida end': function (browser) {
  const devServer = browser.globals.devServerURL
  //npm run e2e
  browser
    .url(devServer)
    .setValue("#cmd","in;Poa;adv-5569;0")
    .click('#env')
    .setValue("#cmd","out;gra;adv-5569")
    .click('#env')
    .setValue("#cmd","end")
    .click('#env')
    .pause(1000)
    .assert.containsText("#msg","Sistema Encerrado...") /* carregou a tela vin */ 
    //assert.elementCount('td', 0) /* testa se carregou a tabela com 0 elementos */
    .end()
},

'Valida end e reiniciar': function (browser) {
  const devServer = browser.globals.devServerURL
  //npm run e2e
  browser
    .url(devServer)
    .setValue("#cmd","in;Poa;adv-5569;0")
    .click('#env')
    .setValue("#cmd","out;gra;adv-5569")
    .click('#env')
    .setValue("#cmd","end")
    .click('#env')
    .pause(1000)
    .assert.containsText("#msg","Sistema Encerrado...") /* carregou a tela vin */ 
    .click('#reibnb')
    .assert.containsText("#msg","Bem Vindo ao Pedagio")
    //assert.elementCount('td', 0) /* testa se carregou a tabela com 0 elementos */
    .end()
},
/* fim do bloco de testes do comando end */

}
