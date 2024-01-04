"use strict";

/*
###Задание 1
Необходимо создать класс Library. Конструктор класса, должен принимать начальный 
список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив 
не содержит дубликатов; в противном случае необходимо выбросить ошибку.
1. Класс должен содержать приватное свойство #books, которое должно хранить 
книги, переданные при создании объекта.
2. Реализуйте геттер-функцию allBooks, которая возвращает текущий список книг.
3. Реализуйте метод addBook(title), который позволяет добавлять книгу в список. 
Если книга с таким названием уже существует в списке, выбросьте ошибку с 
соответствующим сообщением.
4. Реализуйте метод removeBook(title), который позволит удалять книгу из списка 
по названию. Если книги с таким названием нет в списке, выбросьте ошибку с 
соответствующим сообщением.
5. Реализуйте метод hasBook(title), который будет проверять наличие книги в 
библиотеке и возвращать true или false в зависимости от того, есть ли такая 
книга в списке или нет.
*/

class Book {
    constructor(title) {
        this.title = title;
    }
} 

class Library {
    #books = [];

    constructor(...books) {
        if ((new Set(books)).size === books.length) {
            for (const el of books) {
                this.#books.push(new Book(el));
            }
            console.log('Начальный список книг библиотеки:\n' + books.join('\n'));
        } else {
            throw new Error(`Среди списка книг есть дубликаты`);
        }
    }

    allBooks() {
        let bookList = 'Список книг в библиотеке:\n';
        for (const el of this.#books) {
          bookList = bookList + el.title + '\n';
        } 
        console.log(bookList);  
    }
    
    addBook(title) {
        if (!this.hasBook(title)) {
            this.#books.push(new Book(title));
            console.log(`Книга с названием "${title}" добавлена в библиотеку`);
        } else {
            throw new Error(`Книга с названием "${title}" уже есть в библиотеке`)
        }
    }

    removeBook(title) {
        if (this.hasBook(title)) {
            this.#books = this.#books.filter(el => el.title !== title);
            console.log(`Книга с названием "${title}" удалена из библиотеки`);
        } else {
            throw new Error(`Книги с названием "${title}" нет библиотеке`)
        }
    }    

    hasBook(title) {
        return this.#books.filter(el => el.title === title).length > 0 
    }
}

const library = new Library('День затмения', 'Мир Полудня', 'За миллиард лет до конца света');
library.addBook('Обитаемый остров');
library.addBook('Пикник на обочине');
library.addBook('Понедельник начинается в субботу');
library.addBook('Трудно быть богом');
library.removeBook('Трудно быть богом');
library.allBooks();