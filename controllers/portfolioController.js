import { Op } from 'sequelize';

import projectsModel from "../models/portfolioModel.js";
import categoryModel from "../models/categoriesModel.js";
import workExperinceModel from "../models/experienceWorkModel.js";
import technologyModel from "../models/technologiesModel.js";
import technologyCategoryModel from "../models/technologiesCategoriesModel.js";
import educationModel from "../models/educationModel.js";
import projectOutstandingModel from "../models/projectOutstandingMdel.js";

export const getAllProjects = async (req, res) => {
    try {
        const projectsWithTags = [];
        const projectData = await projectsModel.findAll();

        for (const project of projectData) {
            let projectCopy = project.toJSON(); // Convertir a JSON al principio

            if (project.tags != null) {
                const projectTags = JSON.parse(project.tags);

                const techTags = await technologyModel.findAll({
                    where: { id: { [Op.in]: projectTags } },
                });

                const tagMap = techTags.reduce((acc, techTag) => {
                    acc[techTag.id] = techTag.name;
                    return acc;
                }, {});

                const tags = projectTags.map(tagId => tagMap[tagId]);
                projectCopy = { ...projectCopy, tags }; 
            } 

            if (project.idCategory != null) {
                const projecCategory = JSON.parse(project.idCategory);

                const idCategory = await categoryModel.findAll({
                    where: { id: { [Op.in]: projecCategory } },
                });
                
                projectCopy = { ...projectCopy, idCategory }; 
            } 

            projectsWithTags.push(projectCopy);
        }

        res.json(projectsWithTags);
    } catch (error) {
        res.json({ message: error.message });
    }
}



export const getProject = async (req, res)=>{
    try {
        const projectData  = await projectsModel.findAll({
            where:{
            id:req.params.id
            }
        });

        // Obtener los IDs de los tags
        const tagIds = projectData.reduce((acc, project) => {
            return acc.concat(JSON.parse(project.tags));
        }, []);

        // Obtener los datos de los tags
        const techTags = await technologyModel.findAll({
            where: { id: { [Op.in]: tagIds } },
        });

        // Crear un mapa de ID de tag a nombre de tag
        const tagMap = techTags.reduce((acc, techTag) => {
            acc[techTag.id] = techTag.name;
            return acc;
        }, {});

        // Sustituir los IDs de tag por sus nombres en cada proyecto
        const projectsWithTags = projectData.map(project => {
            const tags = JSON.parse(project.tags).map(tagId => tagMap[tagId]);
            return { ...project.toJSON(), tags };
        });

        res.json(projectsWithTags);
    } catch (error) {
        res.json({message: error.message});
    }
}

export const createProject = async (req, res)=>{
    try {
        await projectsModel.create(req.body);
        res.json({"message":"Registro creado"});
    } catch (error) {
        res.json({message: error.message});
    }
}

export const updateProject = async (req, res)=>{
    try {
        await projectsModel.update(req.body, {
            where:{id: req.params.id}
        });
        res.json({"message":"Registro actualizado"});
    } catch (error) {
        res.json({message: error.message});
    }
}

export const deleteProject = async (req, res)=>{
    try {
        await projectsModel.destroy({
            where:{id: req.params.id}
        });
        
        res.json({"message":"Registro borrado"});
    } catch (error) {
        res.json({message: error.message});
    }
}



export const getProjectCategories = async (req, res)=>{
    try {
        const categories = await categoryModel.findAll();
        res.json(categories);
    } catch (error) {
        res.json({message: error.message});
    }
}

export const getWorkExperiece = async (req, res)=>{
    try {
        const workExperience = await workExperinceModel.findAll();
        res.json(workExperience);
    } catch (error) {
        res.json({message: error.message});
    }
}

export const getTechnologies = async (req, res)=>{
    try {
        const techs = [];

        const technologiesCategories = await technologyCategoryModel.findAll();
        for (const technologyCategory of technologiesCategories) {
            const techTags = await technologyModel.findAll({
                where: { idCategoryTechnology: technologyCategory.id },
            });

            techs.push(
                {
                    "name":technologyCategory.name,
                    "techs": techTags,
                }
            );
        }

        res.json(techs);
    } catch (error) {
        res.json({message: error.message});
    }
}

export const getTechnologiesCategory = async (req, res)=>{
    try {
        const technologies = await technologyCategoryModel.findAll();
        res.json(technologies);
    } catch (error) {
        res.json({message: error.message});
    }
}

export const getEducation = async (req, res)=>{
    try {
        const education = await educationModel.findAll();
        res.json(education);
    } catch (error) {
        res.json({message: error.message});
    }
}

export const getProjectsOutstanding = async (req, res) => {
    try {
        const projectsOutstanding = await projectOutstandingModel.findAll();
        const idProjects = projectsOutstanding.map(project => project.idProject);

        const projectData = await projectsModel.findAll({
            where: { id: idProjects },
        });

         const tagIds = projectData.reduce((acc, project) => {
            return acc.concat(JSON.parse(project.tags));
        }, []);

        const techTags = await technologyModel.findAll({
            where: { id: { [Op.in]: tagIds } },
        });

        const tagMap = techTags.reduce((acc, techTag) => {
            acc[techTag.id] = techTag.name;
            return acc;
        }, {});

        const projectsWithTags = projectData.map(project => {
            const tags = JSON.parse(project.tags).map(tagId => tagMap[tagId]);
            return { ...project.toJSON(), tags };
        });

        res.json(projectsWithTags);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
