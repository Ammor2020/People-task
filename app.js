// const x = require ("./data1") 
// console.log(x.fname);
// console.log(x.lname);
// console.log(x.age);



// console.log(x.city);



// const data1 = require ("./data1.js")
// yargs.parse()

// yargs.command({
//     command :"add",
//     describe : "to add an item",
//     builder : {
//         fname : {
//             describe : "This is the first name desc in add command",
//             demandOption : true,
//             type : "string"
//         },
//         lname : {

//             describe : "This is the last name desc in add command ",
//             demandOption : true,
//             type : "string"
//         }
//     },
//     handler : () => {
//         console.log("You have already added an item")
        

//     }
// })



// yargs.command({
//     command :"delete",
//     describe : "to delete an item",
//     handler : () => {
//         console.log("You have already deleted an item")
        

//     }
// })



// const yargs = require ("yargs")
// lec1

// const fs = require ("fs")

// fs.writeFileSync("data.txt" , "ammar alazzani")
// console.log(fs.readFileSync("data.txt").toString())

// fs.appendFileSync ("data.txt" , "  ,   xiong nasser")
// console.log(fs.readFileSync("data.txt").toString())




// const x = require ("./data1")

// console.log(x.fname)
// console.log(x.lname)
// console.log(x.age)
// console.log(x.city)
// console.log(x.fun1(400,500))


// const { demandOption } = require("yargs");
// const yargs = require ("yargs");
// //////////////////////////////////////////////////////////////


const fs = require ("fs");
const yargs = require ("yargs/yargs")(process.argv.slice(2));
function loadPeople() {
    const data = fs.readFileSync("people.json").toString();
    return JSON.parse(data);
}
function savePeople(people) {
    fs.writeFileSync("people.json",JSON.stringify(people,null, 2));
}


yargs.command({
    command:"add",
    describe: "Add a new person",
    builder: {
        id: {
            demandOption: true,
            type: "number"
        },
        fname: {
            demandOption: true,
            type: "string"
        },
        lname: {
            demandOption: true,
            type: "string"
        },
        age: {
            demandOption: true,
            type: "number"

        },
        city : {
            demandOption: true,
            type: "string"
        }
    },
    handler : (x) => {
        const people = loadPeople();
        if(people.length >= 10){
            console.log ("You cannot add more than 10 people");
            return;
        }
        people.push({
            id: x.id,
            firstName: x.fname,
            lastName: x.lname,
            age : x.age,
            city: x.city
        });
        savePeople(people);
        console.log("Person added successfully");
    }
}

);

yargs.command({
    command : "viewAll",
    describe: "view all the people",
    handler: () => {
        const people = loadPeople();
        console.log(people)
    }
})


yargs.command({
    command: "view",
    describe: "view one person by id",
    builder: {
        id:{
            demandOption: true,
            type: "number"
        }
    },
    handler: (x) => {
        const people = loadPeople();
        const person = people.find((p) => p.id === x.id)
        if (person) {
            console.log(person);
        }else{
            console.log("Person not found")
        }
        
    }
})





yargs.command({
    command: "delete",
    describe: "Delete one person by id",
    builder: {
        id: {
            demandOption: true,
            type: "number"
        }
    },
    handler: (x) => {
        const people = loadPeople();
        const newPeople = people.filter((p) => p.id !== x.id)
        savePeople(newPeople);
        console.log("Person deleted successfully");
    }
});


yargs.command({
    command: "deleteAll",
    describe: "Delete all people",
    handler: ()=>{
        savePeople([])
        console.log("All people deleted successfully")
    }

}

)

yargs.command({
    command: "names",
    describe: "View full name and city for all people",
    handler: () => {
        const people = loadPeople();
        people.forEach((person)=>{
            console.log(person.firstName + " " + person.lastName + "-" + person.city)
        })
    }
})



yargs.parse();