const { expect } = require('@wdio/globals') 
const HomePage = require('../pageobjects/home.page')
const ClientePage = require('../pageobjects/cliente.page')

describe('CRUD pagina Clientes', () => {
    beforeEach(async () => {
        await browser.maximizeWindow();  // Maximizar la ventana del navegador
        await browser.deleteAllCookies(); // Eliminar todas las cookies antes de cada prueba
    });

    it('Abir la pagina de Enova y pantalla de Cliente correctamente', async () => {
        await HomePage.open()
        await HomePage.goToAdmin()
        await browser.pause(500);

        await ClientePage.open()
        await ClientePage.goToCliente()

        await browser.pause(500);
        await expect(ClientePage.itemTittle).toBeExisting()
        
    })
    it('Abrir el formulario de nuevo Cliente y crear Cliente', async () =>{
        await ClientePage.createCliente('ClienteTest',1000, 5, 5, 500, 10000, 5000, 'MedidorTest', 1010);
        await browser.pause(500);
        await expect(ClientePage.lista).toMatchElementSnapshot('ClienteCreado');
        
    })
        
    it('Editar Cliente creado previamente', async () => {
        await ClientePage.editCliente('MedidorTest', 'MedidorEdited');
        await browser.pause(500);
        await expect(ClientePage.lista).toMatchElementSnapshot('ClienteEditado');
    })
    it('Borrar Cliente creado', async () => {
        await ClientePage.deleteCliente('MedidorEdited');
        await browser.pause(500);
        await expect(ClientePage.lista).toMatchElementSnapshot('ClienteBorrado');
    })
    
})