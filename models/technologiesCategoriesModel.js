import db from "../database/db.js";
import { DataTypes } from "sequelize";

const technologyCategoryModel = db.define("techs_categories",{
    name:{type: DataTypes.STRING},

});

export default technologyCategoryModel;