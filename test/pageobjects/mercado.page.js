const { $ } = require('@wdio/globals');
const Page = require('./page');

class MercadoPage extends Page {
    constructor() {
        super();
        this.currentUrl = null; // Inicializamos como null
    }

    get itemList () {
        return $('#item-id-4');
    }
    get itemTittle(){
        return $("//label[@class='col-3'][contains(.,'Mercados Relevantes')]");
    }
    get createButton(){
        return $("(//span[contains(@class,'mat-mdc-button-touch-target')])[1]");
    }
    get nombreForm(){
        return $('#nombre');
    }
   get codigoForm(){
    return $('#codigo');
   }
    get crearMercadoForm(){
        return $("//span[@class='mdc-button__label'][contains(.,'Crear Mercado revelante')]");
    }
    get confirmCrearForm(){
        return $("//span[@class='mdc-button__label'][contains(.,'Si, crear')]");
    }
    get lista(){
        return $('.container main')
    }
    get codigoCampo(){
        return $("//span[@ref='eText'][contains(.,'Código')]")
    }
    get busqueda(){
        return $("//input[contains(@id,'Mercados Relevantes')]");
    }
    get threePoints(){
        return $('(//div[contains(@class, "ag-cell-value") and contains(@class, "ag-cell-not-inline-editing")]//button[@aria-label="Ag-Grid-Menu"])[1]')
    }
    get editOption(){
        return $("//span[@class='icon edit'][contains(.,'Editar')]")
    }
    get editButton(){
        return $("//span[@class='mdc-button__label'][contains(.,'Editar Mercado revelante')]")
    }
    get confirmEdit(){
        return $("//span[@class='mdc-button__label'][contains(.,'Si, modificar')]")
    }
    get cerrarbutton(){
        return $("//span[@class='mdc-button__label'][contains(.,'Cerrar')]")
    }
    get borrarbutton(){
        return $("//span[@class='icon garbage'][contains(.,'Eliminar')]")
    }
    get confirmBorrar(){
        return $("//span[@class='mdc-button__label'][contains(.,'Si, eliminar')]")
    }

    async goToMercado() {
        try {
            await browser.pause(500);
            let clickable = await this.itemList.isClickable();
            console.log(clickable); // outputs: true or false

            // esperar a que la opción de Mercado en la lista este disponible
            await browser.waitUntil(
                async () => await this.itemList.isClickable(),
                {
                    timeout: 5000, // tiempo máximo de espera en milisegundos
                    timeoutMsg: 'El elemento itemList no se pudo hacer clic después de 5 segundos'
                }
            );
            await this.itemList.click();
            // Capturar la URL actual después del clic
            this.currentUrl = await browser.getUrl();
            console.log(`Current URL: ${this.currentUrl}`);
        } catch (error) {
            console.error('Error en la función goToMercado:', error);
        }
    }
    async createMercado( nombreForm, codigoForm){
        
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
            await this.itemList.click();
            await this.createButton.click(); //clickear el botón de crear en la pantalla 
            await browser.pause(500);
            browser.execute(() => {
                document.body.style.zoom = '90%';
            });
            await this.nombreForm.setValue(nombreForm);
            await this.codigoForm.setValue(codigoForm);
            await browser.execute("arguments[0].click();", await this.crearMercadoForm);
            await browser.pause(500); 
            await browser.execute("arguments[0].click();", await this.confirmCrearForm);
            await browser.pause(2000);
            await browser.execute("arguments[0].click();", await this.cerrarbutton);
            await this.busqueda.click();
            await browser.pause(1000);
            await this.busqueda.addValue(nombreForm);
            await browser.pause(1000);
    }
    async editMercado(search, codigoForm, nombreEdit){
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
            await browser.pause(1000);
            await this.nombreForm.setValue(nombreEdit);
            await browser.pause(500);
            await this.codigoForm.setValue(codigoForm);
            await browser.pause(500);
            await browser.execute("arguments[0].click();", await this.editButton);
            await browser.pause(1000);  
            await browser.execute("arguments[0].click();", await this.confirmEdit);
            await browser.pause(1000);
            await browser.execute("arguments[0].click();", await this.cerrarbutton);
            await browser.pause(1000);
            await this.busqueda.click();
            await this.busqueda.clearValue();
            await this.busqueda.addValue(nombreEdit);
            await browser.pause(1000)

        }catch (error) {
            console.error('Error en la función editMercado:', error);
        }      
    }

    async deleteMercado(search){
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
            await browser.execute("arguments[0].click();", await this.cerrarbutton);
            await browser.pause(1000);  
            await this.busqueda.click(); 
            await browser.pause(1000); 
            await this.busqueda.clearValue();
            await browser.pause(1000);
            await this.busqueda.addValue(search);
            await browser.pause(1000);

        }catch(error){
            console.error('Error en la función deleteMercado:', error);
            }
    }

    open() {
        const urlToOpen = this.currentUrl || `${this.baseUrl}admin`;
        return browser.url(urlToOpen);
    }

}

module.exports = new MercadoPage();
