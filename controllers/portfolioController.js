import { Op } from 'sequelize';
import db from "../database/db.js";
import { QueryTypes } from "sequelize";

import projectsModel from "../models/portfolioModel.js";
import categoryModel from "../models/categoriesModel.js";
import technologyModel from "../models/technologiesModel.js";
import technologyCategoryModel from "../models/technologiesCategoriesModel.js";
import projectOutstandingModel from "../models/projectOutstandingMdel.js";

export const getAllProjects = async (req, res) => {
    try {
        const projectWithTechNames = await db.query(`
        SELECT p.* , tt.name AS tagName
        FROM projects p
        JOIN projects_to_tech_tags ptt ON p.id = ptt.idProject
        JOIN techs_tags tt ON ptt.idTech = tt.id
        `, {
        type: QueryTypes.SELECT
      });

      const result = {};
      projectWithTechNames.forEach(project => {
          if (!result[project.id]) {
              result[project.id] = {
                  id: project.id,
                  name: project.name,
                  resume: project.resume,
                  description: project.description,
                  URLImage: project.URLImage,
                  githubUrl	: project.githubUrl,
                  moreInfoUrl: project.moreInfoUrl,
                  tags: []
              };
          }
          if (project.tagName) {
              result[project.id].tags.push(project.tagName);
          }
      });
      
      res.json(Object.values(result));
    } catch (error) {
        res.json({message: error.message});
    }
}

export const getProject = async (req, res)=>{
    try {
        const projectWithTechNames = await db.query(`
        SELECT p.* , tt.name AS tagName
        FROM projects p
        JOIN projects_to_tech_tags ptt ON p.id = ptt.idProject
        JOIN techs_tags tt ON ptt.idTech = tt.id
        WHERE p.id = :projectId;
        `, {
        type: QueryTypes.SELECT,
        replacements: { projectId : req.params.id}
      });

      const result = {};
      projectWithTechNames.forEach(project => {
          if (!result[project.id]) {
              result[project.id] = {
                  id: project.id,
                  name: project.name,
                  resume: project.resume,
                  description: project.description,
                  URLImage: project.URLImage,
                  githubUrl	: project.githubUrl,
                  moreInfoUrl: project.moreInfoUrl,
                  tags: []
              };
          }
          if (project.tagName) {
            result[project.id].tags.push(project.tagName);
          }
      });
      
      res.json(Object.values(result));
    } catch (error) {
        res.json({message: error.message});
    }
}

export const getProjectsOutstanding = async (req, res) => {
    try {

        const projectsOutstandings = await db.query(`
            SELECT idProject
            FROM projects_outstandings;
            `, {
            type: QueryTypes.SELECT
        });

        const projectsOutstandingsId = [];
        projectsOutstandings.forEach(project => {
            projectsOutstandingsId.push(project.idProject);
        });

        const projectWithTechNames = await db.query(`
        SELECT p.* , tt.name AS tagName
        FROM projects p
        JOIN projects_to_tech_tags ptt ON p.id = ptt.idProject
        JOIN techs_tags tt ON ptt.idTech = tt.id
        WHERE p.id IN(:projectId);
        `, {
        type: QueryTypes.SELECT,
        replacements: { projectId : projectsOutstandingsId}
      });

      const result = {};
      projectWithTechNames.forEach(project => {
          if (!result[project.id]) {
              result[project.id] = {
                  id: project.id,
                  name: project.name,
                  resume: project.resume,
                  description: project.description,
                  URLImage: project.URLImage,
                  githubUrl	: project.githubUrl,
                  moreInfoUrl: project.moreInfoUrl,
                  tags: []
              };
          }
          if (project.tagName) {
            result[project.id].tags.push(project.tagName);
          }
      });
      
      res.json(Object.values(result));
    } catch (error) {
        res.json({message: error.message});
    }
};

export const getProjectCategories = async (req, res)=>{
    try {
        const categories = await db.query('SELECT * FROM categories_project', { type: QueryTypes.SELECT });
        res.json(categories);
    } catch (error) {
        res.json({message: error.message});
    }
}

export const getTechnologies = async (req, res) => {
    try {
        const techCategories = await db.query(`
            SELECT 
                tc.id AS categoryId, 
                tc.name AS categoryName,
                tt.id AS techId,
                tt.name AS techName
                tt.iconURL AS iconURL
            FROM techs_categories AS tc
            LEFT JOIN techs_tags AS tt ON tc.id = tt.idCategoryTechnology
        `, {
            type: QueryTypes.SELECT
        });
        
        const result = {};
        techCategories.forEach(category => {
            if (!result[category.categoryId]) {
                result[category.categoryId] = {
                    categoryId: category.categoryId,
                    categoryName: category.categoryName,
                    techs: []
                };
            }
            if (category.techId) {
                result[category.categoryId].techs.push({
                    techId: category.techId,
                    techName: category.techName,
                    iconURL: category.iconURL
                });
            }
        });
        
        res.json(Object.values(result));
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getWorkExperiece = async (req, res)=>{
    try {
        const workExperience = await db.query('SELECT * FROM about_work_experiences', { type: QueryTypes.SELECT });
        res.json(workExperience);
    } catch (error) {
        res.json({message: error.message});
    }
}

export const getEducation = async (req, res)=>{
    try {
        const education = await db.query('SELECT * FROM about_education_experiences', { type: QueryTypes.SELECT });
        res.json(education);
    } catch (error) {
        res.json({message: error.message});
    }
}



/*
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
 */