"use strict";

/*
###Задание 1
Создайте обычный объект "Музыкальная коллекция", который можно итерировать. 
Каждая итерация должна возвращать следующий альбом из коллекции. Коллекция 
альбомов - это массив внутри нашего объекта (создать несколько альбомов самому).
Каждый альбом имеет следующую структуру:
{
  title: "Название альбома",
  artist: "Исполнитель",
  year: "Год выпуска"
}
Используйте цикл for...of для перебора альбомов в музыкальной коллекции и 
вывода их в консоль в формате:
"Название альбома - Исполнитель (Год выпуска)"
*/

const albums = [
  {title: 'Power Up', artist: 'AC/DC', year: 2020},
  {title: 'Return of the Dream Canteen', artist: 'Red Hot Chili Peppers', year: 2022},
  {title: 'America', artist: 'Thirty Seconds to Mars', year: 2018},
  {title: 'One More Light', artist: 'Linkin Park', year: 2017},
  {title: '72 Seasons', artist: 'Metallica', year: 2023},
];

const musicCollection = {
  name: 'Rock',
  albums,

  *[Symbol.iterator]() {
    for (const el of albums) {
        yield el;
    }
  } 
}

for (const el of musicCollection) {
     console.log(`${el.title} - ${el.artist} (${el.year})`);
}