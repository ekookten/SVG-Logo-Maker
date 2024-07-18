const inquirer = require("inquirer");
const fs = require("fs");
const { Circle, Triangle, Square } = require("./lib/shapes");

const questions = [
  {
    type: "input",
    name: "text",
    message: "Enter text for the logo (up to 3 characters):",
    validate: (input) =>
      input.length <= 3 || "Text must be 3 characters or less.",
  },
  {
    type: "input",
    name: "textColor",
    message: "Enter the text color (keyword or hex code):",
  },
  {
    type: "list",
    name: "shape",
    message: "Choose a shape for the logo:",
    choices: ["Circle", "Triangle", "Square"],
  },
  {
    type: "input",
    name: "shapeColor",
    message: "Enter the shape color (keyword or hex code):",
  },
];

inquirer.prompt(questions).then((answers) => {
  let shape;
  switch (answers.shape) {
    case "Circle":
      shape = new Circle();
      break;
    case "Triangle":
      shape = new Triangle();
      break;
    case "Square":
      shape = new Square();
      break;
  }
  shape.setColor(answers.shapeColor);

  const svg = `
<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
    ${shape.render()}
    <text x="150" y="125" font-size="60" text-anchor="middle" fill="${
      answers.textColor
    }">${answers.text}</text>
</svg>
`;

  fs.writeFileSync("logo.svg", svg);
  console.log("Generated logo.svg");
});
