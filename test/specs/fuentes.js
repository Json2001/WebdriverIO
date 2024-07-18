const { expect } = require('@wdio/globals')
const HomePage = require('../pageobjects/home.page')
const FuentesPage = require('../pageobjects/fuentes.page')

describe('CRUD pagina fuentes', () => {
    beforeEach(async () => {
        await browser.maximizeWindow();  // Maximizar la ventana del navegador
        await browser.deleteAllCookies(); // Eliminar todas las cookies antes de cada prueba
    });

    it('Abir la pagina de Enova y pantalla de fuentes correctamente', async () => {
        await HomePage.open()
        await HomePage.goToAdmin()
        await browser.pause(500);

        await FuentesPage.open()
        await FuentesPage.goToFuentes()

        await browser.pause(500);
        await expect(FuentesPage.fuentesTittle).toBeExisting()
        
    })
    it('Abrir el formulario de nueva fuente y crear fuente', async () =>{
        await FuentesPage.createFuente(2, 'FuenTest', 1000, 100, 100);
        await browser.pause(500);
        await expect(FuentesPage.listaFuentes).toMatchElementSnapshot('FuenteCreada');
        
    })
        
    it('Editar fuente creada previamente', async () => {
        await FuentesPage.editFuente('Test', 144, 'FuenteEditada');
        await browser.pause(500);
        await expect(FuentesPage.listaFuentes).toMatchElementSnapshot('FuenteEditado');
    })
    it('Borrar fuente creada', async () => {
        await FuentesPage.deleteFuente('FuenTest');
        await browser.pause(500);
        await expect(FuentesPage.listaFuentes).toMatchElementSnapshot('FuenteBorrado');
    })
    
})