const { $ } = require('@wdio/globals');
const Page = require('./page');

class PuntosPage extends Page {
    constructor() {
        super();
        this.currentUrl = null; // Inicializamos como null
    }

    get puntosList () {
        return $('#item-id-2');
    }
    get puntosTittle(){
        return $("//label[@class='col-3'][contains(.,'Puntos de salida')]");
    }
    get createButton(){
        return $("(//span[contains(@class,'mat-mdc-button-touch-target')])[1]");
    }
    get codigoForm(){
        return $('#codigo');
    }
    get nombreForm(){
        return $('#Nombre');
    }
    get nombreTransp(){
        return $('#nombreTransportador');
    }
    get codTransp(){
        return $('#codTransportador');
    }
    get codGestor(){
        return $('#codGestor');
    }
    get capContratada(){
        return $("#capContratadaKpc")
    }
    get capMaxima(){
        return $('#capMaxKpc');
    }
    get citygate(){
        return $("(//span[@class='place-holder'][contains(.,'Selecciona')])[1]");
    }
    get selCitygate(){
        return $("//div[@class='ng-star-inserted'][contains(.,'Sí')]")
    }
    get tramo(){
        return $("//span[@class='place-holder'][contains(.,'Elige un tramo')]")
    }
    get selTramo(){
        return $("//span[contains(.,'RAMALES AISLADOS_I-RAMALES AISLADOS_F')]")
    }
    get creg(){
        return $("//SPAN[@_ngcontent-ng-c4262600111=''][text()=' Selecciona ']/self::SPAN")
    }
    get selCreg(){
        return $("//div[@class='ng-star-inserted'][contains(.,'Sí')]")
    }
    get sistDistribucion(){
        return $("//span[@class='place-holder'][contains(.,'Elije un sistema de distribución')]")
    }
    get selSistDistribucion(){
        return $("//span[contains(.,'BRICEÑO C - SOPO - TOCANCIPÁ')]")
    }
    get cargue(){
        return $("//SPAN[@_ngcontent-ng-c4262600111=''][text()=' Selecciona ']/self::SPAN")
    }
    get selCargue(){
        return $("//div[@class='ng-star-inserted'][contains(.,'Sí')]")
    }
    get crearPuntoForm(){
        return $("//span[@class='mdc-button__label'][contains(.,'Crear punto de salida')]");
    }
    get confirmCrearForm(){
        return $("//span[@class='mdc-button__label'][contains(.,'Si, crear')]");
    }
    get listaPuntos(){
        return $('.container main')
    }
    get codigoCampo(){
        return $("(//span[@ref='eText'][contains(.,'Código')])[1]")
    }
    get busqueda(){
        return $("//input[contains(@id,'Puntos de salida')]");
    }
    get threePoints(){
        return $('(//div[contains(@class, "ag-cell-value") and contains(@class, "ag-cell-not-inline-editing")]//button[@aria-label="Ag-Grid-Menu"])[1]')
    }
    get editOption(){
        return $("//span[@class='icon edit'][contains(.,'Editar')]")
    }
    get editButton(){
        return $("//span[@class='mdc-button__label'][contains(.,'Guardar')]");
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

    async goToPuntos() {
        try {
            await browser.pause(500);
            let clickable = await this.puntosList.isClickable();
            console.log(clickable); // outputs: true or false

            // esperar a que la opción de puntos en la lista este disponible
            await browser.waitUntil(
                async () => await this.puntosList.isClickable(),
                {
                    timeout: 5000, // tiempo máximo de espera en milisegundos
                    timeoutMsg: 'El elemento puntosList no se pudo hacer clic después de 5 segundos'
                }
            );
            await this.puntosList.click();
            // Capturar la URL actual después del clic
            this.currentUrl = await browser.getUrl();
            console.log(`Current URL: ${this.currentUrl}`);
        } catch (error) {
            console.error('Error en la función gotopuntos:', error);
        }
    }
    async createPunto(codigoForm, nombreForm, nombreTransp, codTransp, codGestor, capContratada, capMaxima){
        
            await browser.pause(1000);
            let clickable = await this.createButton.isClickable();
            console.log(clickable); // outputs: true or false

            // esperar a que la opción de createButton en la lista este disponible
            await browser.waitUntil(
               async () => await this.createButton.isClickable(),
               {
                   timeout: 5000, // tiempo máximo de espera en milisegundos
                   timeoutMsg: 'El elemento createButon no se pudo hacer clic después de 5 segundos'
               }
            );
            await this.puntosList.click();
            await this.createButton.click(); //clickear el botón de crear en la pantalla 
            await browser.pause(500);
            browser.execute(() => {
                document.body.style.zoom = '90%';
            });
            await this.codigoForm.setValue(codigoForm);
            await this.nombreForm.setValue(nombreForm);
            await this.nombreTransp.setValue(nombreTransp);
            await this.codTransp.setValue(codTransp);
            await this.codGestor.setValue(codGestor);
            await this.capContratada.setValue(capContratada);
            await this.capMaxima.setValue(capMaxima);
            await browser.pause(500); 
            await this.citygate.scrollIntoView();
            await browser.execute("arguments[0].click();", await this.citygate);
            await browser.pause(500); 
            await this.selCitygate.scrollIntoView();
            await browser.execute("arguments[0].click();", await this.selCitygate);
            await browser.pause(500); 
            await this.tramo.scrollIntoView();
            await browser.execute("arguments[0].click();", await this.tramo);
            await browser.pause(500); 
            await this.selTramo.scrollIntoView();
            await browser.execute("arguments[0].click();", await this.selTramo);
            await browser.pause(500); 
            await this.creg.scrollIntoView();
            await browser.execute("arguments[0].click();", await this.creg);
            await browser.pause(500);
            await browser.execute("arguments[0].click();", await this.selCreg);
            await browser.pause(500); 
            await this.sistDistribucion.scrollIntoView();
            await browser.execute("arguments[0].click();", await this.sistDistribucion);
            await browser.pause(500); 
            await this.selSistDistribucion.scrollIntoView();
            await browser.execute("arguments[0].click();", await this.selSistDistribucion);
            await browser.pause(500); 
            await this.cargue.scrollIntoView();
            await browser.execute("arguments[0].click();", await this.cargue);
            await browser.pause(500); 
            await this.selCargue.scrollIntoView();
            await browser.execute("arguments[0].click();", await this.selCargue);
            await browser.pause(500); 
            await this.crearPuntoForm.scrollIntoView();
            await browser.execute("arguments[0].click();", await this.crearPuntoForm);
            await browser.pause(500); 
            await browser.execute("arguments[0].click();", await this.confirmCrearForm);
            await browser.pause(500);
            await this.codigoCampo.doubleClick();
            await browser.pause(1000);
            await this.busqueda.click();
            await browser.pause(500);
            await this.busqueda.addValue(nombreForm);
            await browser.pause(500);
    }
    async editPunto(search, codigoEdit, nombreEdit){
        try{
            await browser.execute(() => {
                document.body.style.zoom = '90%';
            });
            await browser.pause(1000);
            await this.busqueda.clearValue();
            await this.busqueda.click();
            await this.busqueda.addValue(search);
            await browser.pause(1000);
            await browser.execute("arguments[0].click();", await this.threePoints);
            await browser.pause(500);
            await browser.execute("arguments[0].click();", await this.editOption);
            await browser.pause(500);
            await this.codigoForm.setValue(codigoEdit);
            await this.nombreForm.setValue(nombreEdit);
            await browser.execute("arguments[0].click();", await this.editButton);
            await browser.pause(500);
            await this.guardarButton.scrollIntoView()
            await browser.execute("arguments[0].click();", await this.guardarButton);
            await browser.pause(2000);  
            await this.busqueda.clearValue();
            await this.busqueda.click();
            await this.busqueda.addValue(nombreEdit);
            await browser.pause(1000)

        }catch (error) {
            console.error('Error en la función editPunto:', error);
        }      
    }

    async deletePunto(search){
        try{

            await this.busqueda.clearValue();
            await browser.pause(1000);
            await this.busqueda.click();
            await this.busqueda.addValue(search);
            await browser.pause(1000);
            await browser.execute("arguments[0].click();", await this.threePoints);
            await browser.pause(500);
            await browser.execute("arguments[0].click();", await this.borrarbutton);
            await browser.pause(500);
            await browser.execute("arguments[0].click();", await this.confirmBorrar);
            await browser.pause(1000); 
            await this.busqueda.click(); 
            await browser.pause(1000);  // Espera para que el botón de borrar se desactive y pueda ser clickeado de nuevo.
            await this.busqueda.clearValue();
            await browser.pause(2000);
            await this.busqueda.addValue(search);
            await browser.pause(1000);

        }catch(error){
            console.error('Error en la función deletePunto:', error);
            }
    }

    open() {
        const urlToOpen = this.currentUrl || `${this.baseUrl}admin`;
        return browser.url(urlToOpen);
    }

}

module.exports = new PuntosPage();
