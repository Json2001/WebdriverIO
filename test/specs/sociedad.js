const { expect } = require('@wdio/globals') 
const HomePage = require('../pageobjects/home.page')
const SociedadPage = require('../pageobjects/sociedad.page')

describe('CRUD pagina Sociedades', () => {
    beforeEach(async () => {
        await browser.maximizeWindow();  // Maximizar la ventana del navegador
        await browser.deleteAllCookies(); // Eliminar todas las cookies antes de cada prueba
    });

    it('Abir la pagina de Enova y pantalla de Sociedades correctamente', async () => {
        await HomePage.open()
        await HomePage.goToAdmin()
        await browser.pause(500);

        await SociedadPage.open()
        await SociedadPage.goToSociedad()

        await browser.pause(500);
        await expect(SociedadPage.itemTittle).toBeExisting()
        
    })
    it('Abrir el formulario de nueva sociedad y crear sociedad', async () =>{
        await SociedadPage.createSociedad( 'SocietyTest', 'TestQA', 'STQA', 3213213211, 3213213211, 3213213211, 111222, 10, 10, 'sociedad@correo.com' );
        await browser.pause(500);
        await expect(SociedadPage.lista).toMatchElementSnapshot('SociedadCreada');
        
    })
        
    it('Editar Sociedad creada previamente', async () => {
        await SociedadPage.editSociedad('SocietyTest', 100000, 'SocietyEdited');
        await browser.pause(500);
        await expect(SociedadPage.lista).toMatchElementSnapshot('SociedadEditada');
    })
    it('Borrar Sociedad creado', async () => {
        await SociedadPage.deleteSociedad('SocietyEdited');
        await browser.pause(500);
        await expect(SociedadPage.lista).toMatchElementSnapshot('SociedadBorrada');
    })
    
})