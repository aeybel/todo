# To-do app

Simple to-do app

## API

Tools: Node.js

Docker build:
```
docker build . -t todo-api
```

Docker run command:
```
docker run -dp 3001:3001 `
--network todo-app `
-e MYSQL_HOST=mysql `
-e MYSQL_USER=root `
-e MYSQL_PASSWORD=secret `
-e MYSQL_DB=todos `
--name todo-api
todo-api
```

## Front end

Tools: Vue.js, Vueitfy

Docker build:
```
docker build -t todo-vuetify .
```

Docker run:
```
docker run -it -p 8080:8080 --name todo-vuetify todo-vuetify
```
