module.exports = {

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
      .setValue("#cmd","")
      .setValue("#cmd","asdsad;sadsadas;sadsadas;") 
      .click('#env')
      .pause(1000)
      .assert.containsText("#msg","Comando Inválido") /* 3 comandos errados */ 
      .setValue("#cmd","")
      .setValue("#cmd","asdsad;sadsadas;sadsadas")
      .click('#env')
      .pause(1000)
      .assert.containsText("#msg","Comando Inválido") /* 3 comandos sem ; */
      .end()
  }
}
