const fs = require("fs");

let customers = [];

function addCustomers(name, adress) {
  const id = customers.length > 0 ? customers[customers.length - 1].id + 1 : 1;

  customers.push({
    name,
    adress,
    id,
  });

  fs.writeFileSync("db.json", JSON.stringify(customers));

  return id;
}

function updateCustomers(id, newData) {
  const customersString = fs.readFileSync("db.json", "utf-8");
  customers = JSON.parse(customersString);

  const customerIndex = customers.findIndex(
    (customer) => customer.id === Number(id)
  );
  if (customerIndex === -1) return false;

  const customer = customers[customerIndex];
  if (newData.name) customer.name = newData.name;

  if (newData.adress) customer.adress = newData.adress;

  customers[customerIndex] = customer;

  fs.writeFileSync("db.json", JSON.stringify(customers));

  return true;
}

function deleCustomers(id) {
    const customersString = fs.readFileSync("db.json", "utf-8");
    customers = JSON.parse(customersString);
  
    const customerIndex = customers.findIndex(
      (customer) => customer.id === Number(id)
    );
    if (customerIndex === -1) return false;
  
    const customer = customers[customerIndex];
     
    customers.splice(customers[customerIndex], 1)
  
    fs.writeFileSync("db.json", JSON.stringify(customers));
  
    return true;
  }

function getCostumers() {
  const custormesString = fs.readFileSync("db.json", "utf-8");
  customers = JSON.parse(custormesString);
  return customers;
}

function getCustomer(id){
    return customers.find( customer => customer.id === Number(id));
}

module.exports = {
  addCustomers,
  getCostumers,
  updateCustomers,
  deleCustomers,
  getCustomer
};
