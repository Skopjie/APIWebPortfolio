import express from "express";
import { getAllProjects, getProject, /*createProject, updateProject, deleteProject,*/ getProjectCategories, getWorkExperiece, getTechnologies, getEducation, getProjectsOutstanding} from "../controllers/portfolioController.js";

const router = express.Router();

router.get("/project", getAllProjects);
router.get("/project/:id", getProject);
/*router.post("/", createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);*/


router.get("/category", getProjectCategories);
router.get("/projectsOutstanding", getProjectsOutstanding);

router.get("/about/technologies", getTechnologies);
router.get("/about/WorkExperience", getWorkExperiece);
router.get("/about/EducationExperience", getEducation);

export default router;