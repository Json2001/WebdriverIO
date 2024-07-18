const { expect } = require('@wdio/globals') 
const HomePage = require('../pageobjects/home.page')
const MercadoPage = require('../pageobjects/mercado.page')

describe('CRUD pagina mercados relevantes', () => {
    beforeEach(async () => {
        await browser.maximizeWindow();  // Maximizar la ventana del navegador
        await browser.deleteAllCookies(); // Eliminar todas las cookies antes de cada prueba
    });

    it('Abir la pagina de Enova y pantalla de mercados correctamente', async () => {
        await HomePage.open()
        await HomePage.goToAdmin()
        await browser.pause(500);

        await MercadoPage.open()
        await MercadoPage.goToMercado()

        await browser.pause(500);
        await expect(MercadoPage.itemTittle).toBeExisting()
        
    })
    it('Abrir el formulario de nueo Mercado y crear Mercado', async () =>{
        await MercadoPage.createMercado( 'MercadoTest', 2 );
        await browser.pause(500);
        await expect(MercadoPage.lista).toMatchElementSnapshot('MercadoCreado');
        
    })
        
    it('Editar Mercado creado previamente', async () => {
        await MercadoPage.editMercado('MercadoTest', 100, 'MercadoEdited');
        await browser.pause(500);
        await expect(MercadoPage.lista).toMatchElementSnapshot('MercadoEditado');
    })
    it('Borrar Mercado creado', async () => {
        await MercadoPage.deleteMercado('MercadoEdited');
        await browser.pause(500);
        await expect(MercadoPage.lista).toMatchElementSnapshot('MercadoBorrado');
    })
    
})