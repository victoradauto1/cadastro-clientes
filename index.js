const db = require("./db")
const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });

async function listCustomers(){
    console.clear()
    console.log("Clientes cadastrados")
    console.log("Nome | CPF | Endereço")

    const customers =  db.getCostumers();
     
    for(let i = 0; i < customers.length; i++ ){
        const customer = customers[i]
        console.log(`${customer.name}|${customer.adress} `)
    }
    await rl.question("Pressione Enter para continuar...")
    printMenu();
}

function validateName(name){
    if(!name)return false;
    if(name.trim().indexOf(" ") === -1) return false;
    return true;
}

function validateAdress(address){
    if(!address)return false;
    if(address.length < 10) return false;
    return true
}

async function getAnswer(question, errorMessage, validateFunction){
    console.clear()
    let answer = ""

    do{
        answer = await rl.question(question)
        if(!validateFunction(answer))console.log(errorMessage)
    }
    while(!validateFunction(answer))

    return answer;
}

async function startRegistration(){
    console.clear()
    const name = await getAnswer("Qual o nome do cliente? ","Nome inválido! Tente novamente.", validateName)

    const adress = await getAnswer("Qual o endereço do Cliente?", "Endereço inválido! Tente novamente", validateAdress)

   
    const id = db.addCustomers(name, adress);
  

    console.log(`Cliente ${name} cadastrado com sucesso!`)
    await rl.question("Pressione Enter para continuar...")
    printMenu();
}

async function printMenu(){
    console.clear()
    console.log("Menu:")
    console.log("1 - Cadastrar Cliente")
    console.log("2 - Ver Cliente")
    console.log("3 - Encerrar")

    const answer = await rl.question("Qual a ação você deseja?")

    switch(answer){
        case "1": await startRegistration(); break;
        case "2": await listCustomers(); break;
        case "3": console.clear(); process.exit(0);        
    }

    await rl.question("Pressione Enter para continuar...")
}

printMenu();
db.getCostumers();
