import { Sequelize } from 'sequelize';

import { User } from '../models/user';

export const sequelize = new Sequelize({
    host: process.env.host,
    port: process.env.port,
    database: process.env.dbName,
    username: process.env.username,
    password: process.env.password,
    dialect: "mysql",
})

export const Users = sequelize.define('user', User)

sequelize
    .authenticate()
    .then(() => {
            console.log("Connection established successfully.")
            Users.sync()
        }   
    )
    .catch(err => console.error("Unable to connect to the database:", err));