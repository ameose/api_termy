# API Termy

## Описание

Информация по проекту: [termy.proj.mse.su](https://termy.proj.mse.su/general_info_about_the_project)

## Установка зависимостей

```bash
yarn
```

## Development

1. Создание конфига

```bash
cp .env_development .env
```

2. Запуск приложения

**development**
```bash
$ yarn start:dev
```

### Production

1. Создание конфига

```bash
cp .env_production .env
```

2. Запуск приложения

```bash
yarn start:prod
```

## Тесты

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```