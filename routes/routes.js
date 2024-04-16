import express from "express";
import { getAllProjects, getProject, createProject, updateProject, deleteProject, getProjectCategories, getWorkExperiece, getTechnologies, getTechnologiesCategory, getEducation, getProjectsOutstanding} from "../controllers/portfolioController.js";

const router = express.Router();

router.get("/", getAllProjects);
router.get("/:id", getProject);
router.post("/", createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);


router.get("/category/all", getProjectCategories);
router.get("/workExperience/all", getWorkExperiece);
router.get("/technologies/all", getTechnologies);
router.get("/technologiesCategory/all", getTechnologiesCategory);
router.get("/education/all", getEducation);
router.get("/projectsOutstanding/all", getProjectsOutstanding);

export default router;