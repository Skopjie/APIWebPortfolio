import dotenv from 'dotenv';
dotenv.config(); 

import { Sequelize } from "sequelize";
/*
const db = new Sequelize("webportfolio", "root","",{
    host:"localhost",
    dialect: "mysql"
})
*/

const db = new Sequelize(process.env.DDBB_TABLE, process.env.DDBB_USER, process.env.DDBB_PASS,{
    host:"srv1124.hstgr.io",
    dialect: "mysql"
})


export default db;
