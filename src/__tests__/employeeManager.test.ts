import { EmployeeHandler } from "./pageObjects/EmployeeHandler";

const em = new EmployeeHandler();

describe("Employee Manager", () => {
  beforeEach(async () => {
    await em.navigate();
  });
  afterAll(async () => {
    await em.quit();
  });
  it("can add a new employee", async () => {
    await em.addEmployee();
    await em.selectEmployeeByName("New Employee");
    await em.editEmployee({
      name: "test person",
      phone: "1234567890",
      title: "test result",
    });
    await em.saveChanges();
    await em.selectEmployeeByName("Dollie Berry");
    await em.selectEmployeeByName("test person");
    let employee = await em.getEmployeeInfo();
    expect(employee.name).toEqual("test person");
    expect(employee.phone).toEqual("1234567890");
    expect(employee.title).toEqual("test result");
  });
  it("can edit an existing employee", async () => {
    await em.selectEmployeeByName("Bernice Ortiz");
    await em.editEmployee({ title: "Grand Poobah" });
    await em.saveChanges();
    await em.selectEmployeeByName("Phillip Weaver");
    await em.selectEmployeeByName("Bernice Ortiz");
    let employee = await em.getEmployeeInfo();
    expect(employee).toEqual({
      id: 1,
      name: "Bernice Ortiz",
      phone: "4824931093",
      title: "Grand Poobah",
    });
  });
  it("can add another new employee", async () => {
    await em.addEmployee();
    await em.selectEmployeeByName("New Employee");
    await em.editEmployee({ name: "Punky Brewster", phone: "3449001876", title: "Head Chef" });
    await em.saveChanges();
    let employee = await em.getEmployeeInfo();
    expect(employee.name).toBe("Punky Brewster");
    expect(employee.phone).toBe("3449001876");
    expect(employee.title).toBe("Head Chef");
  });
  it("can cancel an unsaved edit", async () => {
    await em.selectEmployeeByName("Phillip Weaver");
    await em.editEmployee({ phone: "3449001876", title: "Not a Manager" });
    await em.cancelChanges();
    let employee = await em.getEmployeeInfo();
    expect(employee.name).toBe("Phillip Weaver");
    expect(employee.phone).toBe("7459831843");
    expect(employee.title).toBe("Manager");
  });
  it("will not save changes if user navigates away before saving", async () => {
    await em.selectEmployeeByName("Ruby Estrada");
    await em.editEmployee({ phone: "3449001876", title: "Pseudo-DevOps" });
    await em.selectEmployeeByName("Lou White");
    await em.selectEmployeeByName("Ruby Estrada");
    let employee = await em.getEmployeeInfo();
    expect(employee.name).toBe("Ruby Estrada");
    expect(employee.phone).toBe("5740923478");
    expect(employee.title).toBe("Back-End Developer");
  });
});
