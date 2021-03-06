//Variables required from package-lock.json
const fs = require("fs");
const inquirer = require ('inquirer');
const jest = require("jest");
const util = require("util");
const validator = require("email-validator");

//Variables required from other documents
const html = require("./src/htmlTemp");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

//Universal Variables for making team array and string
let teamArr = [];
let teamStr = ``;

//use util to convert async funtions to promises 
const writeHTML = util.promisify(fs.writeFile);

//Main Function 
async function main() {
    try {
        //start after prompts have collected all user data
        await prompt()

        //extract team info from team Array
        for (let i= 0; i < teamArr.length; i++) {
            teamStr = teamStr + html.generateCard(teamArr[i]);
        }
        //Use team info to generate an HTML
        let newHTML = html.generateHTML(teamStr);
        writeHTML ("./dist/index.html", newHTML);
        console.log("Index.html generated!")
    } catch (err) {
        return console.log(err);
    }
}

async function prompt() {
    let teamCompleteUI = "";
    do {
        try {
            let response = await inquirer.prompt ([
                {
                    type: "input",
                    name: "name",
                    message: "Please enter a Name: ",
                    //confirm valid input
                    validate: function validateName(name) {
                        return name !== "";
                    }
                },
                {
                    type: "input",
                    name: "id",
                    message: "What is their ID Number?",
                    //confirm valid input
                    validate: function validateName(name) {
                        return name !== "";
                    }
                },
                {
                    type: "input",
                    name: "email",
                    message: "Please provide an email address: ",
                    //email validator used
                    validate: function validateName(name) {
                        return validator.validate(name);
                    }
                },
                {
                    type: "list",
                    name: "role",
                    message: "Select a role:",
                    choices: [
                        "Engineer",
                        "Intern",
                        "Manager"
                    ]
                },
            ]);

            let followUP = "";

            if (response.role === "Engineer") {
                followUP = await inquirer.prompt([{
                    type: "input",
                    name: "github",
                    message: "What is this engineer's GitHub username?",
                    validate: function validateName(name){
                        return name !== "";
                    },
                },]);

                const engineer = new Engineer(response.name, response.id, response.email, followUP.github);
                teamArr.push(engineer);
            } else if (response.role === "Intern") {
                followUP = await inquirer.prompt([{
                    type: "input",
                    name: "school",
                    message: "What school is this intern attending?",
                    validate: function validateName(name){
                        return name !== "";
                    },
                },]);

                const intern = new Intern(response.name, response.id, response.email, followUP.school);
                teamArr.push(intern);
            } else if (response.role === "Manager") {
                followUP = await inquirer.prompt([{
                    type: "input",
                    name: "office",
                    message: "What is the manager's office number?",
                    validate: function validateName(name){
                        return name !== "";
                    },
                },]);

                const manager = new Manager(response.name, response.id, response.email, followUP.office);
                teamArr.push(manager);
            }

        } catch (err) {
            return console.log(err);
        }
        //prompt user to choose to add a team member
        teamCompleteUI = await inquirer.prompt([{
            type: "list",
            name: "finish",
            message: "Do you have any more team members to add?",
            choices: [
                "Yes",
                "No"
            ]
        },]);
    }
    //rerun the prompts if user has more data to enter
    while (teamCompleteUI.finish === "Yes");
}

main();