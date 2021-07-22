import {
  Builder,
  By,
  Capabilities,
  until,
  WebDriver,
  WebElement,
} from "selenium-webdriver";
import { elementLocated } from "selenium-webdriver/lib/until";
const chromedriver = require("chromedriver");

/** A page object for the Employee Manager project */
export class EmployeeHandler {
  driver: WebDriver;
  bernice: By = By.name("employee1");
  marnie: By = By.name("employee2");
  phillip: By = By.name("employee3");
  nameDisplay: By = By.id("employeeTitle");
  nameInput: By = By.name("nameEntry");
  phoneInput: By = By.name("phoneEntry");
  titleInput: By = By.name("titleEntry");
  saveButton: By = By.id("saveBtn");
  cancelButton: By = By.name("cancel");
  errorCard: By = By.css(".errorCard");
  appTitle: By = By.className("titleText");
  footerText: By = By.className("footer");
  homePage: string =
    "https://devmountain-qa.github.io/employee-manager/1.2_Version/index.html";

  constructor(driver?: WebDriver) {
    if (driver) this.driver = driver;
    else
      this.driver = new Builder()
        .withCapabilities(Capabilities.chrome())
        .build();
  }

  /**
   * Navigates the driver to the URL passed in, or if no URL is passed in, to the predefined homePage.
   * @param url optional url to load
   */
  async navigate(url?: string): Promise<void> {
    if (url) return this.driver.get(url);
    else return this.driver.get(this.homePage);
  }

  /**
   * Clicks the employee from the list who's name exactly matches the string provided.
   * @param name The name of the employee to select. Must be a direct match.
   */
  async selectEmployeeByName(name: string): Promise<void> {
    await this.driver.wait(
      until.elementLocated(By.xpath(`//li[text()='${name}']`))
    );
    await this.driver.findElement(By.xpath(`//li[text()='${name}']`)).click();
    await this.waitForEmployeeToLoad(name);
    return;
  }

  /**
   * Edits the employee fields currently displayed to be the values in the employeeInformation object passed in.
   * @param employeeInformation An object with any combination of name/phone/title properties to edit the current employee record to {name?: "", phone?: "", title?: ""}
   */
  async editEmployee(employeeInformation: EmployeeEdit): Promise<void> {
    await this.driver.wait(until.elementLocated(this.nameInput));
    if (employeeInformation.name) {
      await this.driver.findElement(this.nameInput).clear();
      await this.driver
        .findElement(this.nameInput)
        .sendKeys(employeeInformation.name);
    }
    if (employeeInformation.phone) {
      await this.driver.findElement(this.phoneInput).clear();
      await this.driver
        .findElement(this.phoneInput)
        .sendKeys(employeeInformation.phone);
    }
    if (employeeInformation.title) {
      await this.driver.findElement(this.titleInput).clear();
      await this.driver
        .findElement(this.titleInput)
        .sendKeys(employeeInformation.title);
    }
    return;
  }

  /**
   * Clicks the "Add Employee" option
   */
  async addEmployee(): Promise<void> {
    await this.driver.wait(until.elementLocated(By.name("addEmployee")));
    return (await this.driver.findElement(By.name("addEmployee"))).click();
  }

  /**
   * Clicks the save button
   */
  async saveChanges(): Promise<void> {
    return (await this.driver.findElement(this.saveButton)).click();
  }

  /**
   * Clicks the cancel button
   */
  async cancelChanges(): Promise<void> {
    return (await this.driver.findElement(this.cancelButton)).click();
  }

  /** Gets the info for the currently displayed employee */
  async getEmployeeInfo(): Promise<Employee> {
    await this.driver.wait(until.elementLocated(this.nameInput));
    let name = await (
      await this.driver.findElement(this.nameInput)
    ).getAttribute("value");
    let phone = await (
      await this.driver.findElement(this.phoneInput)
    ).getAttribute("value");
    let title = await (
      await this.driver.findElement(this.titleInput)
    ).getAttribute("value");
    let id = parseInt(
      await (
        await (await this.driver.findElement(By.id("employeeID"))).getText()
      ).slice(4),
      10
    );
    return { name, phone, title, id };
  }
  /**
   * Gets any displayed error messages.
   * @returns {Promise<string>} the displayed error text
   */
  async getErrorMessage(): Promise<string> {
    return (await this.driver.findElement(this.errorCard)).getText();
  }

  /**
   * Get the displayed app title.
   * @returns {Promise<string>} the displayed app title
   */
   async getAppTitle(): Promise<string> {
    return (await this.driver.findElement(this.appTitle)).getText();
  }

  /**
   * Get the displayed footer text.
   * @returns {Promise<string>} the displayed footer text
   */
   async getFooterText(): Promise<string> {
    return (await this.driver.findElement(this.footerText)).getText();
  }

  /**
   * Returns once the employee card for the given employee has loaded
   * @param name the name of the employee who's card is loading
   */
  async waitForEmployeeToLoad(name: string): Promise<void> {
    await this.driver.wait(until.elementLocated(By.id("employeeTitle")));
    let title = await this.driver.findElement(By.id("employeeTitle"));
    await this.driver.wait(until.elementTextIs(title, name));
    return;
  }

  async quit(): Promise<void> {
    return this.driver.quit();
  }
}

interface Employee {
  name: string;
  phone: string;
  title: string;
  id: number;
}

interface EmployeeEdit {
  /** the new value for the employee name */
  name?: string;
  /** the new value for the employee phone number */
  phone?: string;
  /** the new value for the employee title */
  title?: string;
}
