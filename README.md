# Hasob shop - client/server course project

### check out the heroku version

https://csclientserverapp.herokuapp.com/
## 📝 Table of Contents

- [Instruction for setting up the database](#database)
- [Instruction for running the server](#server)
- [Instruction for running the client](#client)
- [Test Accounts](#testaccounts)
- [Authors](#authors)


## 🏁 Getting Started <a name = "getting_started"></a>


### Prerequisites
- [Node.JS](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)


### Technologies
- [React](https://reactjs.org/)
- [Bootstrap](https://getbootstrap.com/)


## 🧪 Test Accounts <a name = "testaccounts"></a>

Use these predefined accounts to test the application.

| Account email  | Password |
| ------------- | ------------- |
| bshara23@gmail.com   | 1234%qwerT 


## Instruction for setting up the database:<a name = "database"></a>
0.1 Download the latest release of [pgAdmin](https://www.pgadmin.org/download/pgadmin-4-windows/).<br>
1.1 Open pgAdmin, right click on ```Databases```, selected ```Create``` and then ```Database...```.<br>

[![1](instructions/1.jpg)]()

2.1 Set the database name as ```school```.<br>
2.2 Click on ```save```.<br>

[![2](instructions/2.jpg)]()

3.1 Open ```Databases```, right click on ```school```.<br>
3.2 Click on ```Restore...```.<br>

[![3](instructions/3.jpg)]()


4.1 Click on ```...``` to select the database file.<br>

[![4](instructions/4.jpg)]()

5.1 Browes to the directory of this project.<br>
5.2 Select the ```Format``` as ```sq``` to see the database file ```db.sql```.<br>
5.3 Select the file ```db.sql```.<br>
5.4 Click on ```Select```.<br>

[![5](instructions/5.jpg)]()

And that's it, the database is ready!

Note: database username and password: <br>
```user: 'postgres'```<br>
```password: 'admin'```<br>

## Instruction for running the server:<a name = "server"></a>

1. Install dependencies using:<br>
```yarn```<br>
or<br>
```npm install```<br>

1. Download the nodemon package if it doesn't exits, using: <br>
```yarn global nodemon```<br>
or<br>
```npm install -g nodemon```<br>


2. Start the server using the command: ```nodemon start```
3. Start the client using ``` cd csfrontend && yarn start ```

4. if you want to check it using heroku account use the following:
- Email: bshara23demo@gmail.com
- Password: Bshara12#

## Instruction for running the client:<a name = "client"></a>
1. Navigate to the csfronend folder:<br>
```cd csfrontend```<br>

2. Install dependencies using:<br>
```yarn```<br>
or<br>
```npm install```<br>

3. Start the client:<br>
```yarn start```<br>
or<br>
```npm start```<br>

## ✍️ Authors <a name = "authors"></a>

- [@bshara23](https://github.com/bshara23)
- [@ahmad-masalha](https://github.com/ahmad-masalha)
