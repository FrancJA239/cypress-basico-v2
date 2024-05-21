Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
  cy.get('input[type="text"]')
    .should('be.visible')
  cy.get('#firstName').type('Franc')
  cy.get('#lastName').type('Tester')
  cy.get('#email').type('testes.ts@teste.com')
  cy.get('#open-text-area').type('Um Comentário Teste')
  cy.contains('button', 'Enviar').click()

})