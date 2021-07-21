import calculator from "../calculator";

// each of the objects in the dataset array has the pieces of a math problem.
// "add": x + y
// "subtract": x - y
// "multiply": x * y
// "divide": x / y
let dataset = [
  { x: 5, y: 10, method: "add" },
  { x: 5, y: 10, method: "subtract" },
  { x: 5, y: 10, method: "multiply" },
  { x: 5, y: 10, method: "divide" },
  { x: -12, y: 10000, method: "add" },
  { x: -12, y: 10000, method: "subtract" },
  { x: -12, y: 10000, method: "multiply" },
  { x: -12, y: 10000, method: "divide" },
  { x: 42, y: 0, method: "add" },
  { x: 42, y: 0, method: "subtract" },
  { x: 42, y: 0, method: "multiply" },
  { x: 42, y: 0, method: "divide" },
  { x: 81, y: 227, method: "add" },
  { x: 81, y: 227, method: "subtract" },
  { x: 81, y: 227, method: "multiply" },
  { x: 81, y: 227, method: "divide" },
];


function selectOp(x: number, y: number, method: string, ) {
  switch (method){ //does the assertions
    case 'add':
      expect(calculator.add(x, y)).toBe(x+y)
      break;
    case 'subtract':
      expect(calculator.subtract(x, y)).toBe(x-y)
      break;
    case 'multiply':
      expect(calculator.multiply(x, y)).toBe(x*y)
      break;
    case 'divide':
      expect(calculator.divide(x, y)).toBe(x/y) //
      break;
    default:
      break;
  }
}


describe("Calculator", () => {
  dataset.forEach(item => {
    test(`${item.method} ${item.x} and ${item.y}`, () => { // forgot to add () => before {}
      selectOp(item.x, item.y, item.method); // figure out how to pass the params in
    });
  });
});
