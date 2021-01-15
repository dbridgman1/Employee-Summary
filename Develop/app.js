const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamArr = [];

const teamMembers = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: "addingMembers",
            message: "What employee would you like to add to the team?",
            choices: [
                'Manager',
                'Engineer',
                'Intern',
                'The team is all set!',
            ]
        }
    ]).then (answers => {
        switch (answers.addingMembers) {
            case 'Manager': 
                promptManager();
                break;
            
            case 'Engineer': 
                promptEngineer();
                break;
            
            case 'Intern': 
                promptIntern();
                break;

            case 'The team is all set!': 
                createTeam();
                break;
        }
    })
};

const promptManager = () => {
     inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the Manager's name?",
            validate: answer => {
                if(answer !== "") {
                    return true
                } return "please enter your name"
            } 
        },
        {
            type: 'input',
            name: 'ID',
            message: "What is your Manager's ID number?",
            // validate: answer => {
            //     const pass = answer.match(/^[0-9]{4}\d*$/)
            //     if (pass === true) {
            //         return true
            //     } return 'please enter an ID number'
            // }

        },
        {
            type: 'input',
            name: 'email',
            message: "What is your Manager's email address?",
            validate: answer => {
                if(answer !== "") {
                    return true
                } return "please enter email address"
            } 
        },
        {
            type: 'input',
            name: 'office',
            message: "What is your Manager's office number?",
        }
    ]).then(answer => {
        const manager = new Manager(answer.name, answer.ID, answer.email, answer.office);
        console.log(manager)
        teamArr.push(manager);
        teamMembers();
    })
};
const promptEngineer = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the employee's name?",
            validate: answer => {
                if(answer !== "") {
                    return true
                } return "please enter your name"
            } 
        },
        {
            type: 'input',
            name: 'ID',
            message: "What is this employee's ID number?",
        },
        {
            type: 'input',
            name: 'email',
            message: "What is this employee's email address?",
            validate: answer => {
                if(answer !== "") {
                    return true
                } return "please enter your email address"
            } 
        },
        {
            type: 'input',
            name: 'github',
            message: "What is the employee's Github username?",
            validate: answer => {
                if(answer !== "") {
                    return true
                } return "please enter your username"
            } 
        }
    ]).then(answer => {
        const engineer = new Engineer(answer.name, answer.ID, answer.email, answer.github);
        console.log(engineer)
        teamArr.push(engineer);
        teamMembers();
    })
};
const promptIntern = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the employee's name?",
            validate: answer => {
                if(answer !== "") {
                    return true
                } return "please enter your name"
            } 
        },
        {
            type: 'input',
            name: 'ID',
            message: "What is this employee's ID number?",
        },
        {
            type: 'input',
            name: 'email',
            message: "What is this employee's email address?",
            validate: answer => {
                if(answer !== "") {
                    return true
                } return "please enter your email address"
            } 
        },
        {
            type: 'input',
            name: 'school',
            message: "What school does this employee attend?",
            validate: answer => {
                if(answer !== "") {
                    return true
                } return "please enter the school you are currently attending"
            } 
        }
    ]).then(answer => {
        const intern = new Intern(answer.name, answer.ID, answer.email, answer.school);
        console.log(intern)
        teamArr.push(intern);
        teamMembers();
    })
};

const createTeam = () => {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamArr), 'utf-8')
}

teamMembers();