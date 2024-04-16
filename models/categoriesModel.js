import db from "../database/db.js";
import { DataTypes } from "sequelize";

const categoryModel = db.define("project_categories",{
    name:{type: DataTypes.STRING},
    description:{type: DataTypes.STRING},
    URLIcon:{type: DataTypes.STRING},
});

export default categoryModel;