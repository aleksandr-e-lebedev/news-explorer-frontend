# NewsExplorer Frontend

Версия: v1.0.0

## Описание

Данный проект является выпускной квалификационной работой и реализован в рамках учебной программы [Яндекс.Практикум](https://praktikum.yandex.ru) по профессии веб-разработчик для подтверждения следующих навыков:

1. вёрстка отзывчивого интерфейса веб-приложения по макету;
2. объектно-ориентированное программирование;
3. работа с API;
4. настройка и работа с Git;
5. сборка проекта с помощью Webpack.

Цель проекта — создать фронтенд для сервиса NewsExplorer, в котором можно найти новости по запросу и сохранить в личном кабинете.

## Используемые технологии

1. HTML,
2. CSS,
3. JavaScript,
4. Git,
5. Webpack.

## Используемые API

1. [News API](https://newsapi.org/),
2. [NewsExplorer API](https://github.com/aleksandr-e-lebedev/news-explorer-api#readme).

## Организация кода

1. CSS - по методологии [БЭМ](https://ru.bem.info/methodology);
2. JavaScript - ООП (классы); ES6-модули; по методологии [БЭМ](https://ru.bem.info/methodology).

## Функциональные возможности

1. регистрация пользователя;
2. авторизация пользователя;
3. поиск статей по ключевому слову;
4. сохранение найденной статьи;
5. удаление ранее сохранённой статьи;
6. загрузка всех статей, сохранённых пользователем.

## Демо

[NewsExplorer](https://aleksandr-e-lebedev.github.io/news-explorer-frontend)

## Как развернуть проект

Клонируйте репозиторий:

`git clone https://github.com/aleksandr-e-lebedev/news-explorer-frontend.git`

Для установки необходимых пакетов выполните:

`npm install`

Запуск:

* открыть Webpack dev server в режиме development с hot reload: `npm run dev`;
* открыть Webpack dev server в режиме production: `npm run start`;
* собрать проект для production: `npm run build`;
* развернуть собранный проект на GitHub Pages: `npm run deploy`.
