"use strict";

/*
###Задание 2
Вы управляете рестораном, в котором работают разные повара, специализирующиеся 
на определенных блюдах. Клиенты приходят и делают заказы на разные блюда.
Необходимо реализовать функцию newOrder. Создавать вспомогательные функции, 
коллекции, не запрещается. Старайтесь использовать коллекции Map/Set, где это 
актуально. Представленный ниже код должен работать.

Повара и их специализации:
Олег - специализация: Пицца.
Андрей - специализация: Суши.
Анна - специализация: Десерты.

Блюда, которые могут заказать посетители:
Пицца "Маргарита"
Пицца "Пепперони"
Пицца "Три сыра"
Суши "Филадельфия"
Суши "Калифорния"
Суши "Чизмаки"
Суши "Сеякемаки"
Десерт Тирамису
Десерт Чизкейк
*/

class Specialization {
  constructor(name) {
    this.name = name;
  }
}
const pizzaSpecialization = new Specialization('Пицца');
const sushiSpecialization = new Specialization('Суши');
const dessertSpecialization = new Specialization('Десерт');

const dishes = new Map();
dishes.set('Маргарита', pizzaSpecialization);
dishes.set('Пепперони', pizzaSpecialization);
dishes.set('Три сыра', pizzaSpecialization);
dishes.set('Филадельфия', sushiSpecialization);
dishes.set('Калифорния', sushiSpecialization);
dishes.set('Чизмаки', sushiSpecialization);
dishes.set('Сеякемаки', sushiSpecialization);
dishes.set('Тирамису', dessertSpecialization);
dishes.set('Чизкейк', dessertSpecialization);

class Chef {
  constructor(name, specialization) {
    this.name = name;
  }
}
const chefOleg = new Chef('Олег');
const chefAndrey = new Chef('Андрей');
const chefAnna = new Chef('Анна');

const chefSpecialization = new Map();
chefSpecialization.set(pizzaSpecialization, chefOleg)
chefSpecialization.set(sushiSpecialization, chefAndrey)
chefSpecialization.set(dessertSpecialization, chefAnna)

class Product {
  constructor(position) {
    const specialization = dishes.get(position.name);
    if (specialization) {
      this.specialization = specialization;
      this.name = position.name;
      this.quantity = position.quantity;
      this.chef = chefSpecialization.get(specialization);
    }
    else {
      throw new Error('Такого блюда: "' + position.name + '" не существует!');
    }
  }
}

class Order {
  products = []

  constructor(client, products) {
    this.client = client;

    for (const el of products) {
      const product = new Product(el);
      this.products.push(product);
    }
  }

  print() {
    let out = 'Клиент ' +  this.client.firstname + ' заказал: \n';
    for (const el of this.products) {
      out = out + el.specialization.name + ' "' + el.name + '" - ' + el.quantity + '; ' +
        'готовит повар ' + el.chef.name + '\n';
    }
    console.log(out);
  }
}

// Посетитель ресторана.
class Client {
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }
}

// Вам необходимо реализовать класс, который управляет заказами и поварами.
class Manager {
  orders = [];

  newOrder(client, ...products) {
    try {
      const order = new Order(client, products);
      this.orders.push(order);
      order.print();
    }
    catch(err) {
      console.log(err.message);
    }
  }

  printAllOrders() {
    for (const el of this.orders) {
      el.print();
    }
  }
}

// Можно передать внутрь конструктора что-либо, если необходимо.
const manager = new Manager();


// Вызовы ниже должны работать верно, менять их нельзя, удалять тоже.
manager.newOrder(
  new Client("Иван", "Иванов"), 
  { name: "Маргарита", quantity: 1, type: "Пицца" },
  { name: "Пепперони", quantity: 2, type: "Пицца" },
  { name: "Чизкейк", quantity: 1, type: "Десерт" },
);
// // Вывод:
// // Клиент Иван заказал: 
// // Пицца "Маргарита" - 1; готовит повар Олег
// // Пицца "Пепперони" - 2; готовит повар Олег
// // Десерт "Чизкейк" - 1; готовит повар Анна

// // ---

const clientPavel = new Client("Павел", "Павлов");
manager.newOrder(
  clientPavel, 
  { name: "Филадельфия", quantity: 5, type: "Суши" },
  { name: "Калифорния", quantity: 3, type: "Суши" },
);
// Вывод:
// Клиент Павел заказал: 
// Суши "Филадельфия" - 5; готовит повар Андрей
// Суши "Калифорния" - 3; готовит повар Андрей

manager.newOrder(
  clientPavel, 
  { name: "Филадельфия", quantity: 5, type: "Суши" },
  { name: "Калифорния", quantity: 4, type: "Суши" },
  { name: "Тирамису", quantity: 2, type: "Десерт" },
);
// Вывод:
// Клиент Павел заказал: 
// Суши "Филадельфия" - 5; готовит повар Андрей
// Суши "Калифорния" - 4; готовит повар Андрей
// Десерт "Тирамису" - 2; готовит повар Анна

manager.newOrder(
  clientPavel, 
  { name: "Филадельфия", quantity: 1, type: "Суши" },
  { name: "Трубочка с вареной сгущенкой", quantity: 1, type: "Десерт" },
);
// Ничего не должно быть добавлено, должна быть выброшена ошибка:
// Десерт "Трубочка с вареной сгущенкой" - такого блюда не существует.

//manager.printAllOrders();   