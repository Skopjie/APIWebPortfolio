import db from "../database/db.js";
import { DataTypes } from "sequelize";

const technologyModel = db.define("techs_tags",{
    name:{type: DataTypes.STRING},
    idCategoryTechnology:{type: DataTypes.INTEGER},
    iconURL:{type: DataTypes.STRING},

});

export default technologyModel;