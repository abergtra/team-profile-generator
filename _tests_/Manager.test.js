const Manager = require('../lib/Manager');

//Test if each object and function work by setting value and evaluating after running script
test("Set Office", () => {
    const testValue = "5";
    const employee = new Manager("Asher", 1, "asher@gmail.com", testValue);
    expect(employee.officeNumber).toBe(testValue);
})

test("Get Role function", () => {
    const testValue = "Manager";
    const employee = new Manager("Asher", 1, "asher@gmail.com", testValue);
    expect(employee.getRole()).toBe(testValue);
})

test("Get Office function", () => {
    const testValue = "5";
    const employee = new Manager("Asher", 1, "asher@gmail.com", testValue);
    expect(employee.getOffice()).toBe(testValue);
});