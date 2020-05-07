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

## Организация кода

1. CSS - по методологии [БЭМ](https://ru.bem.info/methodology);
2. JavaScript - ООП (классы); ES6-модули.

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

## Тестирование состояний интерфейса (до реализации на JS)

### Главная

**Хедер** - Авторизован / Не авторизован

```
document.querySelector('#menu-item-login').classList.toggle('header__item_hidden');
document.querySelector('#menu-item-saved-articles').classList.toggle('header__item_hidden');
document.querySelector('#menu-item-logout').classList.toggle('header__item_hidden');
```

**Форма поиска: Ошибка** - Показать / Скрыть

```
document.querySelector('.search-form__error').classList.toggle('search-form__error_active');
```

**Форма поиска: Поле ввода и кнопка "Искать"** - Заблокировать / Разблокировать

Заблокировать:

```
document.querySelector('.search-form__input').setAttribute('disabled', 'true');
document.querySelector('.search-form__input').classList.add('search-form__input_disabled');
document.querySelector('.search-form__button').setAttribute('disabled', 'true');
document.querySelector('.search-form__button').classList.add('button_disabled');
```

Разблокировать:

```
document.querySelector('.search-form__input').removeAttribute('disabled', 'true');
document.querySelector('.search-form__input').classList.remove('search-form__input_disabled');
document.querySelector('.search-form__button').removeAttribute('disabled', 'true');
document.querySelector('.search-form__button').classList.remove('button_disabled');
```

**Преулоудер** - Показать / Скрыть

```
document.querySelector('.loading').classList.toggle('loading_active');
```

**Блок "Нет результатов"** - Показать / Скрыть

```
document.querySelector('.no-results').classList.toggle('no-results_active');
```

**Блок "Ошибка запроса"** - Показать / Скрыть

```
document.querySelector('.request-error').classList.toggle('request-error_active');
```

**Блок "Результаты поиска"** - Показать / Скрыть

```
document.querySelector('.results').classList.toggle('results_active');
```

**Блок "Результаты поиска": Кнопка "Показать ещё"** - Показать / Скрыть

```
document.querySelector('.results__button').classList.toggle('results__button_active');
```

**Карточка: Tooltip** - Авторизован / Не авторизован

Для первой карточки:

```
document.querySelector('.card__controls-tooltip').classList.toggle('card__controls-tooltip_active');
```

**Карточка: Bookmark** - Сохранить / Удалить

```
document.querySelector('.card__controls-item').classList.toggle('card__controls-item_marked');
```

**Popup** - Открыть / Закрыть

"Регистрация":

```
document.querySelector('#popup-signup').classList.toggle('popup_opened');
document.querySelector('.body').classList.toggle('body_scroll-disabled');
```

"Вход":

```
document.querySelector('#popup-login').classList.toggle('popup_opened');
document.querySelector('.body').classList.toggle('body_scroll-disabled');
```

"Зарегистрирован":

```
document.querySelector('#popup-registered').classList.toggle('popup_opened');
document.querySelector('.body').classList.toggle('body_scroll-disabled');
```

**Popup: Ошибка инпута** - Показать / Скрыть

"Регистрация":

```
"Email" - document.querySelector('#error-signup-email').classList.toggle('auth-form__error_active');
"Password" - document.querySelector('#error-signup-password').classList.toggle('auth-form__error_active');
"Username" - document.querySelector('#error-signup-username').classList.toggle('auth-form__error_active');
```

Для "Вход" заменить 'signup' в селекторе на 'login'.

**Popup: Ошибка сервера** - Показать / Скрыть

"Регистрация":

```
document.querySelector('#error-signup-server').classList.toggle('auth-form__error_active');
```

Для "Вход" заменить 'signup' в селекторе на 'login'.

**Popup: Кнопка "Зарегистрироваться" / "Войти"** - Разблокировать / Заблокировать

"Регистрация" - Разблокировать:

```
document.querySelector('#submit-button-signup').removeAttribute('disabled', 'true');
document.querySelector('#submit-button-signup').classList.remove('button_disabled');
```

"Регистрация" - Заблокировать:

```
document.querySelector('#submit-button-signup').setAttribute('disabled', 'true');
document.querySelector('#submit-button-signup').classList.add('button_disabled');
```

Для "Вход" заменить 'signup' в селекторе на 'login'.

**Popup: Инпуты** - Заблокировать / Разблокировать

"Регистрация" - Заблокировать:

```
document.querySelector('#popup-signup').querySelectorAll('.auth-form__input').forEach(input => input.setAttribute('disabled', 'true'));
document.querySelector('#popup-signup').querySelectorAll('.auth-form__input').forEach(input => input.classList.add('auth-form__input_disabled'));
```

"Регистрация" - Разблокировать:

```
document.querySelector('#popup-signup').querySelectorAll('.auth-form__input').forEach(input => input.removeAttribute('disabled', 'true'));
document.querySelector('#popup-signup').querySelectorAll('.auth-form__input').forEach(input => input.classList.remove('auth-form__input_disabled'));
```

Для "Вход" заменить 'signup' в селекторе на 'login'.

### Главная - Mobile

**Меню** - Показать / Скрыть

```
document.querySelector('.header__burger').classList.toggle('header__burger_active');
document.querySelector('.header__overlay').classList.toggle('header__overlay_active');
document.querySelector('.header__container').classList.toggle('header__container_mobile-menu-active');
document.querySelector('.header__menu').classList.toggle('header__menu_mobile-menu-active');
document.querySelector('.body').classList.toggle('body_scroll-disabled');
```

### Сохранённые статьи

Переведите хедер в состояние "Авторизован" и нажмите "Сохранённые статьи" или добавьте к URL веб-приложения `/articles`.
