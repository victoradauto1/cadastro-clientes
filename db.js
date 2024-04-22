const fs = require("fs")

let customers = []

function addCustomers(name, adress){

    const id = customers.length > 0 ? customers[customers.length-1].id + 1 : 1

    customers.push({
        name, adress, id
    })

    fs.writeFileSync("db.json",JSON.stringify(customers) )

    return id;
}

function updateCustomers(id, newData){
    // const customer = customers
}

function getCostumers(){
    const custormesString = fs.readFileSync("db.json", "utf-8");
    customers = JSON.parse(custormesString)
    return customers;
}

module.exports = {
    addCustomers, getCostumers
}

