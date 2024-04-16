import db from "../database/db.js";
import { DataTypes } from "sequelize";

const workExperinceModel = db.define("work_experiences",{
    rol:{type: DataTypes.STRING},
    company:{type: DataTypes.STRING},
    dateStart:{type: DataTypes.DATE},
    dateEnd:{type: DataTypes.DATE},
    description:{type: DataTypes.JSON},
    url:{type: DataTypes.STRING},

});

export default workExperinceModel;