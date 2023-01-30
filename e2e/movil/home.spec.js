describe('Test de Inicio', () => {
    beforeEach(()=>{
        cy.viewport('iphone-x')
        cy.visit('inicio')
        cy.wait(500)
    })
    it('Test link de crear consulta', () => {
        cy.get('ion-button[id="crear-consulta-button"]').click()
        cy.wait(1000)
        cy.url().should('eq', 'http://localhost:8100/casos-medicos')
    })
  })