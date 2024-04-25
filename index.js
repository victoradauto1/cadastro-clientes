const db = require("./db");
const readline = require("readline/promises");
const { stdin: input, stdout: output } = require("process");

const rl = readline.createInterface({ input, output });

async function listCustomers() {
  console.clear();
  console.log("Clientes cadastrados");
  console.log("ID | Nome | Endereço");

  const customers = db.getCostumers();

  for (let i = 0; i < customers.length; i++) {
    const customer = customers[i];
    console.log(`${customer.id} | ${customer.name}|${customer.adress} `);
  }
  await rl.question("Pressione Enter para continuar...");
  printMenu();
}

function validateName(name) {
  if (!name) return false;
  if (name.trim().indexOf(" ") === -1) return false;
  return true;
}

function validateAdress(address) {
  if (!address) return false;
  if (address.length < 10) return false;
  return true;
}

function validateNameUpdate(name) {
  if (!name) return true;
  if (name.trim().indexOf(" ") === -1) return false;
  return true;
}

function validateAdressUpdate(address) {
  if (!address) return true;
  if (address.length < 10) return false;
  return true;
}

function validateID(id) {
  return id > 0;
}

async function getAnswer(question, errorMessage, validateFunction) {
  console.clear();
  let answer = "";

  do {
    answer = await rl.question(question);
    if (!validateFunction(answer)) console.log(errorMessage);
  } while (!validateFunction(answer));

  return answer;
}

async function startRegistration() {
  console.clear();
  const name = await getAnswer(
    "Qual o nome do cliente? ",
    "Nome inválido! Tente novamente.",
    validateName
  );

  const adress = await getAnswer(
    "Qual o endereço do Cliente?",
    "Endereço inválido! Tente novamente",
    validateAdress
  );

  const id = db.addCustomers(name, adress);

  console.log(`Cliente ${name} cadastrado com sucesso!`);
  await rl.question("Pressione Enter para continuar...");
  printMenu();
}

async function startUpdate() {
  console.clear();
  const id = await getAnswer(
    "Qual o ID do cliente? ",
    "ID inválido! Tente novamente.",
    validateID
  );

  const name = await getAnswer(
    "Qual o novo nome do cliente? Deixe o branco se deseja manter o nome atual. ",
    "Nome inválido! Tente novamente.",
    validateNameUpdate
  );

  const adress = await getAnswer(
    "Qual o novo endereço do Cliente? Deixe em branco se eseja manter o atual",
    "Endereço inválido! Tente novamente",
    validateAdressUpdate
  );

  const result = db.updateCustomers(id, { name, adress });

  if (result) console.log(`Cliente ${name} atualizado com sucesso!`);
  else console.log(`Cliente não encontrado!`);

  await rl.question("Pressione Enter para continuar...");
  printMenu();
}

function validateConfirmation(choice) {
  choice = choice.toUpperCase();
  return choice === "S" || choice === "N";
}

async function startDelete() {
  console.clear();
  const id = await getAnswer(
    "Qual o ID do cliente? ",
    "ID inválido! Tente novamente.",
    validateID
  );

  const customer = db.getCustomer(id);

  const choice = await getAnswer(
    `Tem certeza que deseja excluir o cliente ${customer.name}? (S/N) `,
    "Opção inválida! Tente novamente.",
    validateConfirmation
  );

  if (choice.toUpperCase() === "S") {
    const result = db.deleCustomers(id);

    if (result) {
      console.log("Cliente excluido com sucesso!");
    } else {
      console.log("Cliente não encontrado.");
    }
  }

  await rl.question("Pressione Enter para continuar...");
  printMenu();
}

async function printMenu() {
  console.clear();
  console.log("Menu:");
  console.log("1 - Ver Cliente");
  console.log("2 - Cadastrar Cliente");
  console.log("3 - Editar Cliente");
  console.log("4 - Excluir Cliente");
  console.log("3 - Encerrar");

  const answer = await rl.question("Qual a ação você deseja?");

  switch (answer) {
    case "1":
      await listCustomers();
      break;
    case "2":
      await startRegistration();
      break;
    case "3":
      await startUpdate();
      break;
    case "4":
      await startDelete();
      break;
    case "5":
      console.clear();
      process.exit(0);
  }

  await rl.question("Pressione Enter para continuar...");
}

printMenu();
db.getCostumers();
