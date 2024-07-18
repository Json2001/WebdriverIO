const { expect } = require('@wdio/globals')
const HomePage = require('../pageobjects/home.page')
const TramosPage = require('../pageobjects/tramos.page')

describe('CRUD pagina tramos', () => {
    beforeEach(async () => {
        await browser.maximizeWindow();  // Maximizar la ventana del navegador
        await browser.deleteAllCookies(); // Eliminar todas las cookies antes de cada prueba
    });

    it('Abir la pagina de Enova y pantalla de tramos correctamente', async () => {
        await HomePage.open()
        await HomePage.goToAdmin()
        await browser.pause(500);

        await TramosPage.open()
        await TramosPage.goToTramos()

        await browser.pause(500);
        await expect(TramosPage.tramosTittle).toBeExisting()
        
    })
    it('Abrir el formulario de nuevo tramo y crear tramos', async () =>{
        await TramosPage.newTramo(2, 2, 'Test', 'Punto B', 'Punto A');
        await browser.pause(500);
        await expect(TramosPage.listaTramos).toMatchElementSnapshot('TramoCreado');
        
    })
        
    it('Editar tramo creado previamente', async () => {
        await TramosPage.editTramo('test', 1, 'TramoQAAutoEditado');
        await browser.pause(500);
        await expect(TramosPage.listaTramos).toMatchElementSnapshot('TramoEditado');
    })
    it('Borrar tramo creado', async () => {
        await TramosPage.deleteTramo('TramoQAAutoEditado');
        await browser.pause(500);
        await expect(TramosPage.listaTramos).toMatchElementSnapshot('TramoBorrado');
    })
    
})