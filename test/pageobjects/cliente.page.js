const { $ } = require('@wdio/globals');
const Page = require('./page');

class ClientePage extends Page {
    constructor() {
        super();
        this.currentUrl = null; // Inicializamos como null
    }

    get itemList () {
        return $('#item-id-6');
    }
    get itemListPrev () {
        return $('#item-id-5');
    }
    get itemTittle(){
        return $("//label[@class='col-3'][contains(.,'Clientes')]");
    }
    get createButton(){
        return $("(//span[contains(@class,'mat-mdc-button-touch-target')])[1]");
    }
    get nombreForm(){
        return $('#nombreCliente');
    }
    get cuentaContrato(){
        return $('#cuentaContrato');
    }
    get prioridad(){
        return $('#prioridadNominacion');
    }
    get tipoConexion(){
    return $('#tipoConexion');
    }
    get malla(){
        return $('#malla');
    }
    get poderCalo(){
        return $("#poderCalorificoAsoc")
    }
    get limiteNom(){
        return $('#limiteNominacion');
    }
    get nombreMedidor(){
        return $("#nombreMedidor")
    }
    get sociedad1(){
        return $("(//span[@class='place-holder'][contains(.,'Elige sociedad')])[1]")
    }
    get selSociedad1(){
        return $("(//span[contains(.,'VANTI')])[1]")
    }
    get sociedad2(){
        return $("//SPAN[@_ngcontent-ng-c4262600111=''][text()=' Elige sociedad ']/self::SPAN")
    }
    get selSociedad2(){
        return $("//span[contains(.,'TGI')]")
    }
    get activoBal(){
        return $("(//span[@class='place-holder'][contains(.,'Elige una opción')])[1]");
    }
    get selActivoBal(){
        return $("//span[contains(.,'Sí')]")
    }
    get activoNom(){
        return $("(//span[@class='place-holder'][contains(.,'Elige una opción')])[1]");
    }
    get selActivoNom(){
        return $("//div[@class='ng-star-inserted'][contains(.,'Sí')]")
    }
    get puntoSal(){
        return $("//span[@class='place-holder'][contains(.,'Elige un punto de salida')]");
    }
    get selPuntoSal(){
        return $("(//span[contains(.,'AGUACHICA')])[1]")
    }
    get mercado(){
        return $("(//span[@class='place-holder'][contains(.,'Elige mercado')])[1]");
    }
    get selMercado(){
        return $("//span[contains(.,'REGULADO')]")
    }
    get gnvVirtual(){
        return $("(//span[@class='place-holder'][contains(.,'Elige una opción')])[1]");
    }
    get selgnvVirtual(){
        return $("(//span[contains(.,'Sí')])[3]")
    }
    get ciudad(){
        return $("//span[@class='place-holder'][contains(.,'Elige la ciudad')]");
    }
    get selCiudad(){
        return $("//span[contains(.,'Leticia')]")
    }
    get atr(){
        return $("(//span[@class='place-holder'][contains(.,'Elige una opción')])[1]");
    }
    get selAtr(){
        return $("(//span[contains(.,'Sí')])[4]")
    }
    get teleMedida(){
        return $("(//span[@class='place-holder'][contains(.,'Elige una opción')])[1]");
    }
    get selTeleMedida(){
        return $("(//span[contains(.,'Sí')])[5]")
    }
    get giForm(){
        return $("//span[@class='place-holder'][contains(.,'Elige una opción')]");
    }
    get selGiForm(){
        return $("(//span[contains(.,'Sí')])[6]")
    }
    get mercadoRel(){
        return $("//span[@class='place-holder'][contains(.,'Elige un mercado')]");
    }
    get selMercadoRel(){
        return $("//span[contains(.,'BOGOTÁ')]")
    }
    get zonaGi(){
        return $("//span[@class='place-holder'][contains(.,'Elige mercado')]")
    }
    get selZonaGi(){
        return $("//span[contains(.,'VALLE DEL CAUCA')]")
    }
    get addMedidorButton(){
        return $("//span[@class='mdc-button__label'][contains(.,'Agregar ID Medidor')]");
    }
    get addMedidorButton2(){
        return $("//span[@class='mdc-button__label'][contains(.,'Agregar ID medidor')]");
    }   
    get idMedidor1(){
        return $("//input[contains(@placeholder,'Ingresa id medidor')]")
    }
    get addMedidorNuevo(){
        return $("//span[@class='mdc-button__label'][contains(.,'Agregar medidor')]");
    }             
    get asignarMedidorButton(){
        return $("//span[@class='mdc-button__label'][contains(.,'Si, asignar')]");
    }
    get secondIdMedidor(){
        return $("//input[contains(@class,'ng-pristine ng-invalid ng-touched')]")
    }
    get close3idMedidor(){
        return $("(//img[@src='/assets/svg/icon-close.svg'])[3]")
    }
    get regresarButton(){
        return $("//span[@class='mdc-button__label'][contains(.,'Regresar')]");
    }
    get crearClienteForm(){
        return $("//span[@class='mdc-button__label'][contains(.,'Crear Cliente')]");
    }
    get confirmCrearForm(){
        return $("//span[@class='mdc-button__label'][contains(.,'Si, crear')]");
    }
    get lista(){
        return $('.container main')
    }
    get codigoCampo(){
        return $("//span[@ref='eText'][contains(.,'ID Medidor')]")
    }
    get busqueda(){
        return $("//input[contains(@id,'Clientes')]");
    }
    get threePoints(){
        return $('(//div[contains(@class, "ag-cell-value") and contains(@class, "ag-cell-not-inline-editing")]//button[@aria-label="Ag-Grid-Menu"])[1]')
    }
    get editOption(){
        return $("//span[@class='icon edit'][contains(.,'Editar')]")
    }
    get editButton(){
        return $("//span[@class='mdc-button__label'][contains(.,'Guardar')]")
    }
    get confirmEdit(){
        return $("//span[@class='mdc-button__label'][contains(.,'Si, guardar')]")
    }
    get borrarbutton(){
        return $("//span[@class='icon garbage'][contains(.,'Eliminar')]")
    }
    get confirmBorrar(){
        return $("//span[@class='mdc-button__label'][contains(.,'Sí, estoy seguro')]")
    }

    async goToCliente() {
        try {
            await browser.pause(500);
            let clickable = await this.itemList.isClickable();
            console.log(clickable); // outputs: true or false

            // esperar a que la opción de Cliente en la lista este disponible
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
            console.error('Error en la función goToCliente:', error);
        }
    }
    async createCliente(var1, var2, var3, var4, var5, var6, var7, var8, idMedidor1) {
        
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
                document.body.style.zoom = '65%';
            });
            await browser.pause(500);
            await this.nombreForm.scrollIntoView();
            await this.nombreForm.setValue(var1);
            await browser.pause(500);
            await this.cuentaContrato.scrollIntoView();
            await this.cuentaContrato.setValue(var2);
            await browser.pause(500);
            await this.prioridad.scrollIntoView();
            await this.prioridad.setValue(var3);
            await browser.pause(500);
            await this.tipoConexion.scrollIntoView();
            await this.tipoConexion.setValue(var4);
            await browser.pause(500);
            await this.malla.scrollIntoView();
            await this.malla.setValue(var5);
            await browser.pause(500);
            await this.poderCalo.scrollIntoView();
            await this.poderCalo.setValue(var6);
            await browser.pause(500);
            await this.limiteNom.scrollIntoView();
            await this.limiteNom.setValue(var7);
            await browser.pause(500);
            await this.nombreMedidor.scrollIntoView();
            await this.nombreMedidor.setValue(var8);
            await browser.pause(500);
            await this.sociedad1.scrollIntoView();
            await browser.execute("arguments[0].click();", await this.sociedad1);
            await browser.pause(500);
            await this.selSociedad1.scrollIntoView();
            await browser.execute("arguments[0].click();", await this.selSociedad1);
            await browser.pause(500);
            await this.sociedad2.scrollIntoView();
            await browser.execute("arguments[0].click();", await this.sociedad2);
            await browser.pause(500);
            await this.selSociedad2.scrollIntoView();
            await browser.execute("arguments[0].click();", await this.selSociedad2);
            await browser.pause(500);
            await this.activoBal.scrollIntoView();
            await browser.execute("arguments[0].click();", await this.activoBal);
            await browser.pause(500);
            await this.selActivoBal.scrollIntoView();
            await browser.execute("arguments[0].click();", await this.selActivoBal);
            await browser.pause(500);
            await this.activoNom.scrollIntoView();
            await browser.execute("arguments[0].click();", await this.activoNom);
            await browser.pause(500);
            await this.selActivoNom.scrollIntoView();
            await browser.execute("arguments[0].click();", await this.selActivoNom);
            await browser.pause(500);
            await this.puntoSal.scrollIntoView();
            await browser.execute("arguments[0].click();", await this.puntoSal);
            await browser.pause(500);
            await this.selPuntoSal.scrollIntoView();
            await browser.execute("arguments[0].click();", await this.selPuntoSal);
            await browser.pause(500);
            await this.mercado.scrollIntoView();
            await browser.execute("arguments[0].click();", await this.mercado);
            await browser.pause(500);
            await this.selMercado.scrollIntoView();
            await browser.execute("arguments[0].click();", await this.selMercado);
            await browser.pause(500);
            await this.gnvVirtual.scrollIntoView();
            await browser.execute("arguments[0].click();", await this.gnvVirtual);
            await browser.pause(500);
            await this.selgnvVirtual.scrollIntoView();
            await browser.execute("arguments[0].click();", await this.selgnvVirtual);
            await browser.pause(500);
            await this.ciudad.scrollIntoView();
            await browser.execute("arguments[0].click();", await this.ciudad);
            await browser.pause(500);
            await this.selCiudad.scrollIntoView();
            await browser.execute("arguments[0].click();", await this.selCiudad);
            await browser.pause(500);
            await this.atr.scrollIntoView();
            await browser.execute("arguments[0].click();", await this.atr);
            await browser.pause(500);
            await this.selAtr.scrollIntoView();
            await browser.execute("arguments[0].click();", await this.selAtr);
            await browser.pause(500);
            await this.teleMedida.scrollIntoView();
            await browser.execute("arguments[0].click();", await this.teleMedida);
            await browser.pause(500);
            await this.selTeleMedida.scrollIntoView();
            await browser.execute("arguments[0].click();", await this.selTeleMedida);
            await browser.pause(500);
            await this.giForm.scrollIntoView();
            await browser.execute("arguments[0].click();", await this.giForm);
            await browser.pause(500);
            await this.selGiForm.scrollIntoView();
            await browser.execute("arguments[0].click();", await this.selGiForm);
            await browser.pause(500);
            await this.mercadoRel.scrollIntoView();
            await browser.execute("arguments[0].click();", await this.mercadoRel);
            await browser.pause(500);
            await this.selMercadoRel.scrollIntoView();
            await browser.execute("arguments[0].click();", await this.selMercadoRel);
            await browser.pause(500);
            await this.zonaGi.scrollIntoView();
            await browser.execute("arguments[0].click();", await this.zonaGi);
            await browser.pause(500);
            await this.selZonaGi.scrollIntoView();
            await browser.execute("arguments[0].click();", await this.selZonaGi);
            await browser.pause(500);
            await this.addMedidorButton.scrollIntoView();
            await browser.execute("arguments[0].click();", await this.addMedidorButton);
            await browser.pause(500);
            await browser.execute("arguments[0].click();", await this.addMedidorButton2);
            await browser.pause(500);
            await browser.execute("arguments[0].click();", await this.idMedidor1);
            await browser.pause(500);
            await this.idMedidor1.setValue(idMedidor1)
            await browser.pause(500);
            await browser.execute("arguments[0].click();", await this.addMedidorNuevo);
            await browser.pause(500);
            await browser.execute("arguments[0].click();", await this.asignarMedidorButton);
            await browser.pause(500);
            await browser.execute("arguments[0].click();", await this.regresarButton);
            await browser.pause(500);
            await this.crearClienteForm.scrollIntoView();
            await browser.execute("arguments[0].click();", await this.crearClienteForm);
            await browser.pause(500); 
            await browser.execute("arguments[0].click();", await this.confirmCrearForm);
            await browser.pause(3000);
            await browser.execute("arguments[0].click();", await this.busqueda);
            await browser.pause(500);
            await this.busqueda.addValue(var8);
            await browser.pause(1000);
    }
    async editCliente(nombreMed, nombreMedEdited){
        try{
            await browser.execute(() => {
                document.body.style.zoom = '90%';
            });


            await browser.pause(3000);
            await browser.execute("arguments[0].click();", await this.threePoints);
            await browser.pause(500);
            await browser.execute("arguments[0].click();", await this.editOption);
            await browser.pause(1000);
            await this.nombreMedidor.scrollIntoView();
            await this.nombreMedidor.setValue(nombreMedEdited);
            await browser.pause(500);
            await browser.execute("arguments[0].click();", await this.editButton);
            await browser.pause(1000);  
            await browser.execute("arguments[0].click();", await this.confirmEdit);
            await browser.pause(4000);
            await browser.execute("arguments[0].click();", await this.busqueda);
            await this.busqueda.clearValue();
            await browser.pause(1000); 
            await this.busqueda.addValue(nombreMedEdited);
            await browser.pause(1000)

        }catch (error) {
            console.error('Error en la función editCliente:', error);
        }      
    }

    async deleteCliente(search){
        try{
  
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
            await browser.pause(1000);
            await this.busqueda.addValue(search);
            await browser.pause(1000);

        }catch(error){
            console.error('Error en la función deleteCliente:', error);
            }
    }

    open() {
        const urlToOpen = this.currentUrl || `${this.baseUrl}admin/sections`;
        return browser.url(urlToOpen);
    }

}

module.exports = new ClientePage();
