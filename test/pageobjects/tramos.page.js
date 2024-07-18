const { $ } = require('@wdio/globals');
const Page = require('./page');

class TramosPage extends Page {
    constructor() {
        super();
        this.currentUrl = null; // Inicializamos como null
    }

    get tramosList () {
        return $('#item-id-0');
    }
    get tramosTittle(){
        return $('//label[contains(text(), "Tramos")]');
    }
    get createButton(){
        return $('/html/body/app-root/app-layout/section/main/div[2]/app-sections/app-crud-header/div/button/span[4]');
    }
    get tramosForm(){
        return $('.fomContent');
    }
    get codigoForm(){
        return $('#codigo');
    }
    get codGestorForm(){
        return $('#codGestor');
    }
    get nombreForm(){
        return $('#nombre');
    }
    get puntoInicioForm(){
        return $('#puntoInicio');
    }
    get puntoFinForm(){
        return $('#puntoFin');
    }
    get crearTramoForm(){
        return $("//button[.//span[contains(text(), 'Crear nuevo tramo')]]");
    }
    get confirmCrearForm(){
        return $("//span[@class='mdc-button__label'][contains(.,'Si, crear')]");
    }
    get listaTramos(){
        return $('.container main ')
    }
    get codigoCampo(){
        return $("(//span[@ref='eText'][contains(.,'Código')])[1]")
    }
    get busqueda(){
        return $('#Tramos');
    }
    get threePoints(){
        return $('(//div[contains(@class, "ag-cell-value") and contains(@class, "ag-cell-not-inline-editing")]//button[@aria-label="Ag-Grid-Menu"])[1]')
    }
    get editOption(){
        return $("//span[@class='icon edit'][contains(.,'Editar')]")
    }
    get editButton(){
        return $("//span[@class='mdc-button__label'][contains(.,'Guardar cambios Tramo')]");
    }
    get guardarButton(){
        return $("//span[@class='mdc-button__label'][contains(.,'Si, guardar')]")
    }
    get borrarbutton(){
        return $("//span[@class='icon garbage'][contains(.,'Eliminar')]")
    }
    get confirmBorrar(){
        return $("//span[@class='mdc-button__label'][contains(.,'Sí, estoy seguro')]")
    }

    async goToTramos() {
        try {
            await browser.pause(500);
            let clickable = await this.tramosList.isClickable();
            console.log(clickable); // outputs: true or false

            // esperar a que la opción de tramos en la lista este disponible
            await browser.waitUntil(
                async () => await this.tramosList.isClickable(),
                {
                    timeout: 5000, // tiempo máximo de espera en milisegundos
                    timeoutMsg: 'El elemento tramosList no se pudo hacer clic después de 5 segundos'
                }
            );
            await this.tramosList.click();
            // Capturar la URL actual después del clic
            this.currentUrl = await browser.getUrl();
            console.log(`Current URL: ${this.currentUrl}`);
        } catch (error) {
            console.error('Error en la función goToTramos:', error);
        }
    }
    async newTramo(codigoForm, codGestorForm, nombreForm, puntoInicioForm, puntoFinForm){
        try{

            await browser.pause(500);
            await this.createButton.click(); //clickear el botón de crear nuevo tramo en la pantalla tramos
            await this.codigoForm.setValue(codigoForm);
            await this.codGestorForm.setValue(codGestorForm);
            await this.nombreForm.setValue(nombreForm);
            await this.puntoInicioForm.setValue(puntoInicioForm);
            await this.puntoFinForm.setValue(puntoFinForm);
            await browser.pause(500); 
            await this.crearTramoForm.click(); //clickear el botón de crear tramo en el formulario
            await browser.pause(500); 
            await this.confirmCrearForm.click();
            await browser.pause(500);
            await this.codigoCampo.doubleClick();
            await browser.pause(1000);
            await this.busqueda.click();
            await this.busqueda.addValue(nombreForm);

        }catch (error) {
            console.error('Error en la función newTramo:', error);
        }
    }
    async editTramo(search, codigoEdit, nombreEdit){
        try{

            await this.busqueda.click();
            await this.busqueda.clearValue();
            await this.busqueda.addValue(search);
            await browser.pause(1000);
            await this.threePoints.click();
            await browser.pause(500);
            await this.editOption.click();
            await this.codigoForm.setValue(codigoEdit);
            await this.nombreForm.setValue(nombreEdit);
            await this.editButton.click();
            await browser.pause(500);
            await this.guardarButton.click();
            await browser.pause(2000);  
            await this.codigoCampo.doubleClick();
            await browser.pause(1000)

        }catch (error) {
            console.error('Error en la función editTramo:', error);
        }      
    }

    async deleteTramo(search){
        try{
            await this.busqueda.clearValue();
            await this.busqueda.click();
            await this.busqueda.addValue(search);
            await browser.pause(1000);
            await this.threePoints.click();
            await browser.pause(500);
            await this.borrarbutton.click();
            await browser.pause(500);
            await this.confirmBorrar.click();
            await browser.pause(2000);
            await this.busqueda.click();
            await this.busqueda.clearValue();
            await this.busqueda.addValue(search);
            await browser.pause(3000);  

        }catch(error){
            console.error('Error en la función deleteTramo:', error);
            }
    }

    open() {
        const urlToOpen = this.currentUrl || `${this.baseUrl}admin`;
        return browser.url(urlToOpen);
    }
}

module.exports = new TramosPage();
