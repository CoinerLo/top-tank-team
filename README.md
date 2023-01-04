<h1 align="center">Top Tank Team</h1>

# Навигация

- [Запуск проекта](#запуск-проекта)
    - [Как запускать](#как-запускать)
    - [Как добавить зависимости](#как-добавить-зависимости)
- [Тесты](#тесты)
- [Линтинг](#линтинг)
- [Форматирование prettier](#форматирование-prettier)
- [Production build](#production-build)
- [Хуки](#хуки)
- [Ой, ничего не работает :(](#ой-ничего-не-работает)
- [Автодеплой статики на vercel](#автодеплой-статики-на-vercel)
- [Production окружение в докере](#production-окружение-в-докере)

## Запуск проекта

### Как запускать?

1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. Выполните команду `yarn dev`
3. Выполните команду `yarn dev --scope=client` чтобы запустить только клиент
4. Выполните команду `yarn dev --scope=server` чтобы запустить только server


### Как добавить зависимости?
В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента 
```yarn lerna add {your_dep} --scope client```

Для сервера
```yarn lerna add {your_dep} --scope server```

И для клиента и для сервера
```yarn lerna add {your_dep}```


Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
```yarn lerna add {your_dep} --dev --scope server```


## Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

Запуск тестов на клиенте и сервере

    yarn test

Запуск тестов на клиенте с детализацией

    cd packages/client
    yarn test

Запуск тестов на клиенте с детализацией и покрытием

    cd packages/client
    yarn test:coverage

## Линтинг

    yarn lint

## Форматирование prettier

    yarn format

## Production build

    yarn build

И чтобы посмотреть что получилось

    yarn preview --scope client
    yarn preview --scope server

## Хуки
В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

## Ой, ничего не работает :(

Откройте issue, я приду :)

## Автодеплой статики на vercel
Зарегистрируйте аккаунт на [vercel](https://vercel.com/)
Следуйте [инструкции](https://vitejs.dev/guide/static-deploy.html#vercel-for-git)
В качестве `root directory` укажите `packages/client`

Все ваши PR будут автоматически деплоиться на vercel. URL вам предоставит деплоящий бот

## Production окружение в докере
Перед первым запуском выполните `node init.js`


`docker compose up` - запустит три сервиса
1. nginx, раздающий клиентскую статику (client)
2. node, ваш сервер (server)
3. postgres, вашу базу данных (postgres)

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up server`

## Postgres
Запуск:

    docker compose up postgres

Запуск pgadmin4:

    docker compose up pgadmin

Pgadmin4 запустится на [8080 порту](http://localhost:8080)

