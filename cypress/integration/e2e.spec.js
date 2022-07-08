/// <reference types="cypress" />
var faker = require('faker');
import FaturamentoPage from '../support/page_objects/faturamento-page.js'
const dadosFaturamento = require('../fixtures/faturamento.json')

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

        

        //print das ações
        afterEach(() => {cy.screenshot()});

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        //entrar no site
        cy.visit('http://lojaebac.ebaconline.art.br/')
       
        //tela de login e cadastro
        cy.get('.icon-user-unfollow').click()

        //pre cadastro
        let nomeFaker = faker.name.firstName()
        let sobrenomeFaker = faker.name.lastName()
        let emailFaker = faker.internet.email(nomeFaker)

        cy.get('#reg_email').type(emailFaker)
        cy.get('#reg_password').type('!teste@teste$')
        cy.get(':nth-child(4) > .button').click()

        //clicar em comprar
        cy.get('#primary-menu > .menu-item-629 > a').click()

        //adicionar produto
        var quantidade = 4

        cy.get('[class="product-block grid"]').contains('Aero Daily Fitness Tee').click()
        cy.get('.button-variable-item-XS').click()
        cy.get('.button-variable-item-Brown').click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()
        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantidade)
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()

        //detalhes de faturamento - Usando arquivo de dados
        FaturamentoPage.editarFaturamento(
            dadosFaturamento[1].nome,
            dadosFaturamento[1].sobrenome,
            dadosFaturamento[1].empresa,
            dadosFaturamento[1].pais,
            dadosFaturamento[1].rua,
            dadosFaturamento[1].numero,
            dadosFaturamento[1].cidade,
            dadosFaturamento[1].estado,
            dadosFaturamento[1].cep,
            dadosFaturamento[1].celular,
            dadosFaturamento[1].email,
            dadosFaturamento[1].nota
        )
        
    });


})