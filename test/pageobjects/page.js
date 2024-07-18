const { browser } = require('@wdio/globals');

module.exports = class Page {
    constructor() {
        this.baseUrl = 'http://enova-ui-angular-bucket.s3-website-us-east-1.amazonaws.com/';
    }

    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open(path) {
        return browser.url(`${this.baseUrl}${path}`);
    }
}
