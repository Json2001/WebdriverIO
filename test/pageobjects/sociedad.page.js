const { $ } = require('@wdio/globals');
const Page = require('./page');

class SociedadPage extends Page {
    constructor() {
        super();
        this.currentUrl = null; // Inicializamos como null
    }

    get itemList () {
        return $('#item-id-3');
    }
    get itemTittle(){
        return $("//label[@class='col-3'][contains(.,'Sociedades')]");
    }
    get createButton(){
        return $("(//span[contains(@class,'mat-mdc-button-touch-target')])[1]");
    }
    get nombreForm(){
        return $('#nombre');
    }
    get nombreRep(){
        return $('#nombreRepresentante');
    }
    get sigla(){
        return $('#sigla');
    }
    get telefono(){
        return $('#telefono');
    }
    get telefono2(){
        return $("#telefono2")
    }
    get telefono3(){
        return $("#telefono3")
    }
    get nit(){
        return $('#nit');
    }
    get codTgi(){
        return $('#codTgi');
    }
    get codPromigas(){
        return $('#codPromigas');
    }
    get correo(){
        return $('#correo');
    }
    get grupo(){
        return $("//span[@class='place-holder'][contains(.,'Selecciona')]");
    }
    get selGrupo(){
        return $("//div[@class='ng-star-inserted'][contains(.,'Sí')]")
    }
    get ciudad(){
        return $("//span[@class='place-holder'][contains(.,'Elige la ciudad')]")
    }
    get selCiudad(){
        return $("//span[contains(.,'Leticia')]")
    }
    get crearSociedadForm(){
        return $("//span[@class='mdc-button__label'][contains(.,'Crear')]");
    }
    get confirmCrearForm(){
        return $("//span[@class='mdc-button__label'][contains(.,'Si, crear')]");
    }
    get lista(){
        return $('.container main')
    }
    get codigoCampo(){
        return $("(//span[@ref='eText'][contains(.,'Código')])[1]")
    }
    get busqueda(){
        return $("//input[contains(@id,'Sociedades')]");
    }
    get threePoints(){
        return $('(//div[contains(@class, "ag-cell-value") and contains(@class, "ag-cell-not-inline-editing")]//button[@aria-label="Ag-Grid-Menu"])[1]')
    }
    get editOption(){
        return $("//span[@class='icon edit'][contains(.,'Editar')]")
    }
    get editButton(){
        return $("//span[@class='mdc-button__label'][contains(.,'Guardar cambios sociedad comercializadora')]");
    }
    get guardarButton(){
        return $("//span[@class='mdc-button__label'][contains(.,'Si, guardar')]")
    }
    get borrarbutton(){
        return $("//span[@class='icon garbage'][contains(.,'Eliminar')]")
    }
    get confirmBorrar(){
        return $("//span[@class='mdc-button__label'][contains(.,'Si, eliminar')]")
    }

    async goToSociedad() {
        try {
            await browser.pause(500);
            let clickable = await this.itemList.isClickable();
            console.log(clickable); // outputs: true or false

            // esperar a que la opción de sociedad en la lista este disponible
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
            console.error('Error en la función goToSociedad:', error);
        }
    }
    async createSociedad( nombreForm, nombreRep, sigla, telefono, telefono2, telefono3, nit, codTgi, codPromigas, correo){
        
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
            await this.nombreRep.setValue(nombreRep);
            await this.sigla.setValue(sigla);
            await this.telefono.setValue(telefono);
            await this.telefono2.setValue(telefono2);
            await this.telefono3.setValue(telefono3);
            await this.nit.setValue(nit);
            await this.codTgi.setValue(codTgi);
            await this.codPromigas.setValue(codPromigas);
            await this.correo.setValue(correo);
            await browser.execute("arguments[0].click();", await this.grupo);
            await browser.pause(500);
            await browser.execute("arguments[0].click();", await this.selGrupo);
            await browser.pause(500);
            await browser.execute("arguments[0].click();", await this.ciudad);
            await browser.pause(500);
            await browser.execute("arguments[0].click();", await this.selCiudad);
            await browser.pause(500);
            await browser.execute("arguments[0].click();", await this.crearSociedadForm);
            await browser.pause(500); 
            await browser.execute("arguments[0].click();", await this.confirmCrearForm);
            await browser.pause(2000);
            await this.busqueda.click();
            await browser.pause(1000);
            await this.busqueda.addValue(nombreForm);
            await browser.pause(1000);
    }
    async editSociedad(search, nit, nombreEdit){
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
            await this.nombreForm.setValue(nombreEdit);
            await this.nit.setValue(nit);
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
            console.error('Error en la función editSociedad:', error);
        }      
    }

    async deleteSociedad(search){
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
            await browser.pause(1000); 
            await this.busqueda.clearValue();
            await browser.pause(2000);
            await this.busqueda.addValue(search);
            await browser.pause(1000);

        }catch(error){
            console.error('Error en la función deleteSociedad:', error);
            }
    }

    open() {
        const urlToOpen = this.currentUrl || `${this.baseUrl}admin`;
        return browser.url(urlToOpen);
    }

}

module.exports = new SociedadPage();
