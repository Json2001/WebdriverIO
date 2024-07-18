const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
    /**
     * define selectors using getter methods
     */
    get adminIcon () {
        return $('#aside-icon-decorator-1');
    }

    get homeTittle () {
        return $('.tittle');
    }


    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async goToAdmin () {
        await browser.pause(500);
        await this.adminIcon.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('home');
    }
}

module.exports = new HomePage();
