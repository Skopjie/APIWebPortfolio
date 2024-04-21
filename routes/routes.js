import express from "express";
import { getAllProjects, getProject, /*createProject, updateProject, deleteProject,*/ getProjectCategories, getWorkExperiece, getTechnologies, getEducation, getProjectsOutstanding} from "../controllers/portfolioController.js";

const router = express.Router();

router.get("/project", getAllProjects);
router.get("/project/:id", getProject);
/*router.post("/", createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);*/


router.get("/category/all", getProjectCategories);
router.get("/projectsOutstanding/all", getProjectsOutstanding);
router.get("/technologies/all", getTechnologies);

router.get("/aboutWorkExperience/all", getWorkExperiece);
router.get("/aboutEducationExperience/all", getEducation);

export default router;