import { projects } from "../data/store.js";

export const registerProject = (req, res) => {
  const { projectName, farmerName, email, phone, location, cropType, landSize, description } = req.body;

  // Validation
  if (!projectName || !farmerName || !email || !phone || !location || !cropType || !landSize) {
    return res.status(400).json({ error: "Missing required project registration details" });
  }

  // Check if project already exists
  const existingProject = projects.find(p => p.email === email && p.projectName === projectName);
  if (existingProject) {
    return res.status(409).json({ error: "Project already registered for this email" });
  }

  const project = {
    id: projects.length + 1,
    projectName,
    farmerName,
    email,
    phone,
    location,
    cropType,
    landSize,
    description: description || "",
    status: "active",
    registeredAt: new Date().toISOString()
  };

  projects.push(project);

  return res.status(201).json({
    message: "Project registered successfully",
    project
  });
};

export const getProjects = (req, res) => {
  res.json(projects);
};

export const getProjectById = (req, res) => {
  const { id } = req.params;
  const project = projects.find(p => p.id === parseInt(id));

  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }

  res.json(project);
};

export const updateProject = (req, res) => {
  const { id } = req.params;
  const { projectName, farmerName, email, phone, location, cropType, landSize, description, status } = req.body;

  const project = projects.find(p => p.id === parseInt(id));
  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }

  // Update fields if provided
  if (projectName) project.projectName = projectName;
  if (farmerName) project.farmerName = farmerName;
  if (email) project.email = email;
  if (phone) project.phone = phone;
  if (location) project.location = location;
  if (cropType) project.cropType = cropType;
  if (landSize) project.landSize = landSize;
  if (description) project.description = description;
  if (status) project.status = status;

  return res.json({
    message: "Project updated successfully",
    project
  });
};

export const deleteProject = (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex(p => p.id === parseInt(id));

  if (projectIndex === -1) {
    return res.status(404).json({ error: "Project not found" });
  }

  const deletedProject = projects.splice(projectIndex, 1);

  return res.json({
    message: "Project deleted successfully",
    project: deletedProject[0]
  });
};
