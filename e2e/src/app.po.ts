import {browser, by, element} from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  login(login: string, password: string) {
    element(by.id('login')).sendKeys(login);
    element(by.id('password')).sendKeys(password);
    element(by.tagName('button')).click();
  }

  getContentText() {
    return element(by.tagName('p')).getText() as Promise<string>;
  }
}
