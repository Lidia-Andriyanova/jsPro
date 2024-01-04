"use strict";

/*
###Задание 2
Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут 
оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные 
сообщения, вы решаете установить ограничение, отзыв должен быть не менее 50 
символов в длину и не более 500. В случае неверной длины, необходимо выводить 
сообщение об ошибке, рядом с полем для ввода.

Создайте HTML-структуру. 
На странице должны отображаться товары, под каждым товаром должен быть список 
отзывов на данный товар. Под каждым списком отзывов должна быть форма, где можно
добавить отзыв для продукта.

При добавлении отзыва, он должен отображаться на странице под предыдущими 
отзывами, а не заменять их.
Массив initialData должен использоваться для начальной загрузки данных 
при запуске вашего приложения.

Каждый отзыв, как и продукт, должен иметь уникальное id, для упрощения, используем 
`Date.now()`.

ВНИМАНИЕ! Если вы не проходили на курсе работу с DOM, то можно это задание не 
делать, пока рано.
*/

const initialData = [
  {
    id: Date.now(),
    product: "Apple iPhone 13",
    reviews: [
      {
        id: Date.now(),
        text: "Отличный телефон! Батарея держится долго.",
      },
      {
        id: Date.now(),
        text: "Камера супер, фото выглядят просто потрясающе.",
      },
    ],
  },
  {
    id: Date.now() + 1,
    product: "Samsung Galaxy Z Fold 3",
    reviews: [
      {
        id: Date.now(),
        text: "Интересный дизайн, но дорогой.",
      },
    ],
  },
  {
    id: Date.now() + 2,
    product: "Sony PlayStation 5",
    reviews: [
      {
        id: Date.now(),
        text: "Люблю играть на PS5, графика на высоте.",
      },
    ],
  },
];


const contentDiv = document.getElementById("content");

function initialFill() {
  for (const productEl of initialData) {
    const productTitle = document.createElement("h1");
    productTitle.innerText = `${productEl.product}`;
    contentDiv.appendChild(productTitle);

    const listEl = document.createElement('ul');
    listEl.classList.add("ul");
    listEl.setAttribute("id", "ul-" + productEl.id);
    contentDiv.appendChild(listEl);

    for (const reviewEl of productEl.reviews) {
       const listItem = document.createElement('li');
       listItem.textContent = reviewEl.text + productEl.id;
       listEl.appendChild(listItem);
    };      

    const inputEl = document.createElement("input");
    inputEl.classList.add("input");
    inputEl.setAttribute("id", "input-" + productEl.id);
    contentDiv.appendChild(inputEl);

    const buttonEl = document.createElement("button");
    buttonEl.classList.add("button");
    buttonEl.setAttribute("id", "button-" + productEl.id);
    buttonEl.innerText = "Добавить отзыв";
    contentDiv.appendChild(buttonEl);    
  }
}

initialFill();

const buttons = document.querySelectorAll(".button");

for (let i = 0; i < buttons.length; i++) {
  const button = buttons[i];

  button.addEventListener("click", () => {
    const idButton = button.getAttribute('id')
    const id = idButton.substring(idButton.indexOf('-') + 1);

    const inputEl = document.getElementById("input-" + id);
    const listEl = document.getElementById("ul-" + id);

    const newReview = inputEl.value;
    console.log(newReview);
    if (newReview.length < 10 || newReview.length > 500) {
      throw new Error('Некорректная длина отзыва');
    } else {
      const listItem = document.createElement('li');
      listItem.textContent = newReview;
      listEl.appendChild(listItem);
    }
  })
}

