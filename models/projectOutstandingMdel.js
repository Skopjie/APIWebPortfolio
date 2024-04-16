import db from "../database/db.js";
import { DataTypes } from "sequelize";

const projectOutstandingModel = db.define("projects_outstanding",{
    idProject:{type: DataTypes.INTEGER},
});

export default projectOutstandingModel;