const { expect } = require('@wdio/globals') 
const HomePage = require('../pageobjects/home.page')
const PuntosPage = require('../pageobjects/puntos.page')

describe('CRUD pagina puntos', () => {
    beforeEach(async () => {
        await browser.maximizeWindow();  // Maximizar la ventana del navegador
        await browser.deleteAllCookies(); // Eliminar todas las cookies antes de cada prueba
    });

    it('Abir la pagina de Enova y pantalla de puntos correctamente', async () => {
        await HomePage.open()
        await HomePage.goToAdmin()
        await browser.pause(500);

        await PuntosPage.open()
        await PuntosPage.goToPuntos()

        await browser.pause(500);
        await expect(PuntosPage.puntosTittle).toBeExisting()
        
    })
    it('Abrir el formulario de nuevo punto y crear punto', async () =>{
        await PuntosPage.createPunto(2, 'puntoTest', 'Transportador', 101, 101, 1000, 1000 );
        await browser.pause(500);
        await expect(PuntosPage.listaPuntos).toMatchElementSnapshot('Puntocreado');
        
    })
        
    it('Editar Punto creado previamente', async () => {
        await PuntosPage.editPunto('puntoTest', 1, 'PuntoEditado');
        await browser.pause(500);
        await expect(PuntosPage.listaPuntos).toMatchElementSnapshot('PuntoEditado');
    })
    it('Borrar punto creado', async () => {
        await PuntosPage.deletePunto('PuntoEditado');
        await browser.pause(500);
        await expect(PuntosPage.listaPuntos).toMatchElementSnapshot('PuntoBorrado');
    })
    
})