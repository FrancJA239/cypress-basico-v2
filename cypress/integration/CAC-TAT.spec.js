/// <refence types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    // deforeEach = 'Antes de, faça isso' essa função diz que antes de casa execução, o cod deve executar o comando (cy.visit('./src/index.html')
    beforeEach(function(){
        cy.visit('./src/index.html') // cy.visit = função para "acessar" a página web que desejar
    })
    it('Verifica o título da aplicação', function() { 
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('Preencher os campos obrigatórios e envia o formulários - Positivo', function(){ 
        cy.get('input[type="text"]')
          .should('be.visible')
        cy.get('#firstName').type('Franc')
        cy.get('#lastName').type('Tester')
        cy.get('#email').type('testes.ts@teste.com')
        cy.get('#phone').type('(11) 99999-7777')
        cy.get('#open-text-area').type('Um Comentário Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
     })
    it('Preencher o campos - Como podemos te ajudar?', function(){
        const longtext = 'Preciso tirar dúvidas em relação ao produto informado, e sobre o catalogo de preços, aparentemente estamos com produtos desatualizados'
        cy.get('textarea[name="open-text-area"]').type(longtext, {delay:0})
    })
    it('Preencher os campos obrigatórios e envia o formulários - Negativo (Sem o campo Nome)', function(){ 
        cy.get('input[type="text"]')
          .should('be.visible')
        cy.get('#firstName').should('have.value', '')
        cy.get('#lastName').type('Teste')
        cy.get('#email').type('testes.ts@teste.com')
        cy.get('#phone').type('(11) 99999-7777')
        cy.get('#open-text-area').type('Um Comentário Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('Preencher os campos obrigatórios e envia o formulários - Negativo (Sem o campo Lastname)', function(){ 
        cy.get('input[type="text"]')
          .should('be.visible')
        cy.get('#firstName').type('Franc')
        cy.get('#lastName').should('have.value', '')
        cy.get('#email').type('testes.ts@teste.com')
        cy.get('#phone').type('(11) 99999-7777')
        cy.get('#open-text-area').type('Um Comentário Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible') 
    })

    it('Preencher os campos obrigatórios e envia o formulários - Negativo (e-mail inválido)', function(){ 
        cy.get('input[type="text"]')
          .should('be.visible')
        cy.get('#firstName').type('Franc')
        cy.get('#lastName').type('teste')
        cy.get('#email').type('testes.ts-teste.com')
        cy.get('#phone').type('(11) 99999-7777')
        cy.get('#open-text-area').type('Um Comentário Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible') 
    })
    it('Validar campo "Telefone" - (Somente Números)', function(){
        cy.get('#phone')
            .type('abzGFSAGdgs')
            .should('have.value', '')
    })
    // Esse teste precisa de comando atualizados

    // it('Validar campo telefone (Campo não Obrigatório)', function(){
    //     cy.get('#phone').should('have.value', '')
    //     cy.get('#phone-checkbox').should('be.visible')

    // })
    it('Validar campo telefone (Campo Obrigatório)', function(){
       cy.get('#phone-checkbox').click()
    //    cy.get('#phone-checkbox').should('be.selected')
       cy.get('#phone').should('have.value', '')
       cy.get('.phone-label-span').should('be.visible')
    })
    it('Preencher os campos obrigatórios e envia o formulários - Negativo (e-mail inválido)', function(){ 
        cy.get('input[type="text"]')
          .should('be.visible')
        cy.get('#firstName').type('Franc')
        cy.get('#lastName').type('teste')
        cy.get('#email').type('testes.ts-teste.com')
        cy.get('#phone').should('have.value', '')
        cy.get('#phone-checkbox').click()        
        cy.get('#open-text-area').type('Um Comentário Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible') 
    })
    it('Validar Preenchimento dos Campos e Limpeza posteriormente', function(){
        cy.get('#firstName').type('Franc')
            .should('have.value', 'Franc')
            .clear()
            .should('have.value', '')
        cy.get('#lastName').type('teste')
            .should('have.value', 'teste')
            .clear()
            .should('have.value', '')
        cy.get('#email').type('testes.ts-teste.com')
            .should('have.value', 'testes.ts-teste.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone').type('11999997777')
            .should('have.value', '11999997777')
            .clear()
            .should('have.value', '')
        cy.get('#open-text-area').type('Um Comentário Teste')
           .should('have.value', 'Um Comentário Teste')
           .clear()
           .should('have.value', '')
    })
    it('Enviar formulário sem preencher os campos obrigatórios(Todos os Campos Vazios)', function(){
        cy.get('#firstName').should('have.value', '')
        cy.get('#lastName').should('have.value', '')
        cy.get('#email').should('have.value', '')
        cy.get('#phone').should('have.value', '')
        cy.get('#open-text-area').should('have.value', '')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Envia o Formulário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })
    it('Validar os produtos disponíveis (Usando Texto)', function(){
        cy.get('#product').select('Blog') // selecionando o texto do produto
            .should('have.value', 'blog')
        
        cy.get('#product').select('Cursos') // selecionando o valor do produto
            .should('have.value', 'cursos')

        cy.get('#product').select(3) // Selecionando o indice do produto
            .should('have.value', 'mentoria')

        cy.get('#product').select('YouTube')
            .should('have.value', 'youtube')
    })
    it('Validar os Tipode atendomento', function(){
        cy.get('input[value="feedback"]').check()
            .should('have.value', 'feedback')
    })
    it('Validar os Tipode atendomento', function(){   // Uma das formas de validar os elementos, porem repetitivo
        cy.get('input[value="elogio"]').check()
            .should('have.value', 'elogio')
    })
    it('Validar os Tipode atendomento', function(){
        cy.get('input[value="ajuda"]').check()
            .should('have.value', 'ajuda')
    })
    // Forma correta de validar os elementos em um único cod
    it('Validar os Tipos de atendimentos', function(){
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })
    it('Validar os campos checkbox (Marcados e Desmarcados a última opção)', function(){
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })
    it('Preencher o campo "Telefone" usando o comando "Check"', function(){
        cy.get('input[type="text"]')
            .should('be.visible')
        cy.get('#firstName').type('Franc')
        cy.get('#lastName').type('teste')
        cy.get('#email').type('testes.ts-teste.com')
        cy.get('#phone').should('have.value', '')
        cy.get('#phone-checkbox').check()
            .should('be.checked')      
        cy.get('#open-text-area').type('Um Comentário Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible') 
    })
    it('Validar o envio de arquivos', function(){
        cy.get('input[id="file-upload"]')
            .should('not.be.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    it('Seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[id="file-upload"]')
        .should('not.be.value')
        .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'}) // Função drag-and-drop, simula como se o user estivesse arrastando o arquivo para o campos anexos
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada uma alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[id="file-upload"]')
            .selectFile('@sampleFile')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    it('Validar hiperlink politica de provacidade', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })
    it('Validar hiperlink politica de provacidade', function(){
        cy.get('#privacy a')
        .invoke('removeAttr', 'target') // removendo o "target"  com o método "invoke()" o navegador não abre outra aba, ele mostra as informações na mesma aba
        .click()                            // Assim podemos validar o conteúdo da página
        cy.contains('CAC TAT - Política de privacidade').should('be.visible')
    })
})