const { expect } = require('@wdio/globals') 
const HomePage = require('../pageobjects/home.page')
const CiudadPage = require('../pageobjects/ciudad.page')

describe('CRUD pagina Ciudades', () => {
    beforeEach(async () => {
        await browser.maximizeWindow();  // Maximizar la ventana del navegador
        await browser.deleteAllCookies(); // Eliminar todas las cookies antes de cada prueba
    });

    it('Abir la pagina de Enova y pantalla de Ciudad correctamente', async () => {
        await HomePage.open()
        await HomePage.goToAdmin()
        await browser.pause(500);

        await CiudadPage.open()
        await CiudadPage.goToCiudad()

        await browser.pause(500);
        await expect(CiudadPage.itemTittle).toBeExisting()
        
    })
    it('Abrir el formulario de nueva Ciudad y crear Ciudad', async () =>{
        await CiudadPage.createCiudad( 10, 'DepartamentoTest', 11, 'MunicipioTest' );
        await browser.pause(500);
        await expect(CiudadPage.lista).toMatchElementSnapshot('CiudadCreada');
        
    })
        
    it('Editar Ciudad creada previamente', async () => {
        await CiudadPage.editCiudad('DepartamentoTest', 100, 'CiudadEdited');
        await browser.pause(500);
        await expect(CiudadPage.lista).toMatchElementSnapshot('CiudadEditada');
    })
    it('Borrar Ciudad creada', async () => {
        await CiudadPage.deleteCiudad('CiudadEdited');
        await browser.pause(500);
        await expect(CiudadPage.lista).toMatchElementSnapshot('CiudadBorrada');
    })
    
})