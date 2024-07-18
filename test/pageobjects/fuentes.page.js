const { $ } = require('@wdio/globals');
const Page = require('./page');

class FuentesPage extends Page {
    constructor() {
        super();
        this.currentUrl = null; // Inicializamos como null
    }

    get fuentesList () {
        return $('#item-id-1');
    }
    get fuentesTittle(){
        return $("//label[@class='col-3'][contains(.,'Fuentes de gas')]");
    }
    get createButton(){
        return $("(//span[contains(@class,'mat-mdc-button-touch-target')])[1]");
    }
    get closeButton(){
        return $("//IMG[@_ngcontent-ng-c3848271566='']/self::IMG");
    }
    get codigoForm(){
        return $('#codigo');
    }
    get nombreForm(){
        return $('#nombre');
    }
    get capacidadForm(){
        return $('#capacidadMbtu');
    }
    get codTgiForm(){
        return $('#codTgi');
    }
    get codPromigasForm(){
        return $('#codPromigas');
    }
    get crearFuenteForm(){
        return $("//span[@class='mdc-button__label'][contains(.,'Crear Fuente de Gas')]");
    }
    get confirmCrearForm(){
        return $("//span[@class='mdc-button__label'][contains(.,'Si, Crear')]");
    }
    get listaFuentes(){
        return $('.container main ')
    }
    get codigoCampo(){
        return $("(//span[@ref='eText'][contains(.,'Código')])[1]")
    }
    get busqueda(){
        return $("//input[contains(@id,'Fuentes de gas')]");
    }
    get threePoints(){
        return $('(//div[contains(@class, "ag-cell-value") and contains(@class, "ag-cell-not-inline-editing")]//button[@aria-label="Ag-Grid-Menu"])[1]')
    }
    get editOption(){
        return $("//span[@class='icon edit'][contains(.,'Editar')]")
    }
    get editButton(){
        return $("//span[@class='mdc-button__label'][contains(.,'Editar Fuente de Gas')]");
    }
    get guardarButton(){
        return $("//span[@class='mdc-button__label'][contains(.,'Si, Editar')]")
    }
    get borrarbutton(){
        return $("//span[@class='icon garbage'][contains(.,'Eliminar')]")
    }
    get confirmBorrar(){
        return $("//span[@class='mdc-button__label'][contains(.,'Sí, estoy seguro')]")
    }

    async goToFuentes() {
        try {
            await browser.pause(500);
            let clickable = await this.fuentesList.isClickable();
            console.log(clickable); // outputs: true or false

            // esperar a que la opción de fuentes en la lista este disponible
            await browser.waitUntil(
                async () => await this.fuentesList.isClickable(),
                {
                    timeout: 5000, // tiempo máximo de espera en milisegundos
                    timeoutMsg: 'El elemento fuentesList no se pudo hacer clic después de 5 segundos'
                }
            );
            await this.fuentesList.click();
            // Capturar la URL actual después del clic
            this.currentUrl = await browser.getUrl();
            console.log(`Current URL: ${this.currentUrl}`);
        } catch (error) {
            console.error('Error en la función gotoFuentes:', error);
        }
    }
    async createFuente(codigoForm, nombreForm, capacidadForm, codTgiForm, codPromigasForm){
        try{

            await browser.pause(500);
            await this.createButton.click(); //clickear el botón de crear en la pantalla 
            await this.codigoForm.setValue(codigoForm);
            await this.nombreForm.setValue(nombreForm);
            await this.capacidadForm.setValue(capacidadForm);
            await this.codTgiForm.setValue(codTgiForm);
            await this.codPromigasForm.setValue(codPromigasForm);
            await browser.pause(500); 
            await this.crearFuenteForm.click(); //clickear el botón de crear en el formulario
            await browser.pause(500); 
            await this.confirmCrearForm.click();
            await browser.pause(500);
            await this.codigoCampo.doubleClick();
            await browser.pause(1000);
            await this.busqueda.click();
            await this.busqueda.addValue(nombreForm);

        }catch (error) {
            console.error('Error en la función CreateFuente:', error);
        }
    }
    async editFuente(search, codigoEdit, nombreEdit){
        try{
            await browser.pause(1000);
            await this.busqueda.click();
            await this.busqueda.clearValue();
            await browser.pause(500);
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
            await this.busqueda.click();
            await this.busqueda.clearValue();
            await browser.pause(500);
            await this.busqueda.addValue(search);

        }catch (error) {
            console.error('Error en la función editFuente:', error);
        }      
    }

    async deleteFuente(search){
        try{
            await this.busqueda.click();
            await this.busqueda.clearValue();
            await browser.pause(500);
            await this.busqueda.addValue(search);
            await browser.pause(1000);
            await this.threePoints.click();
            await browser.pause(500);
            await this.borrarbutton.click();
            await browser.pause(500);
            await this.confirmBorrar.click();
            await browser.pause(3000);  
            await this.busqueda.click();
            await this.busqueda.clearValue();
            await browser.pause(500);
            await this.busqueda.addValue(search);

        }catch(error){
            console.error('Error en la función deleteFuente:', error);
            }
    }

    open() {
        const urlToOpen = this.currentUrl || `${this.baseUrl}admin`;
        return browser.url(urlToOpen);
    }
}

module.exports = new FuentesPage();
