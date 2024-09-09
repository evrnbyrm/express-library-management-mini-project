After installing packages:

1) generate your .env file and add DB_NAME for database name

2) run following commands to set db tables

```bash
$ yarn migration:generate
```

```bash
$ yarn migration:run
```

3) use following command for running the project

```bash
$ yarn start:prod
```