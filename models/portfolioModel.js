import db from "../database/db.js";
import { DataTypes } from "sequelize";

const projectsModel = db.define("projects",{
    name:{type: DataTypes.STRING},
    resume:{type: DataTypes.STRING},
    description:{type: DataTypes.STRING},
    idCategory:{type: DataTypes.STRING},
    URLImage:{type: DataTypes.STRING},
    githubUrl:{type: DataTypes.STRING},
    moreInfoUrl	:{type: DataTypes.STRING},
    tags:{type: DataTypes.STRING},
});

export default projectsModel;