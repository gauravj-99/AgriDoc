# Project Registration Feature

## Overview
The Project Registration feature allows farmers to register their farm projects in the AgriDoc system. This feature enables farmers to maintain a profile of their farming operations and connect with potential buyers.

## Components Added

### Backend

#### 1. **Project Controller** (`backend/controllers/projectController.js`)
Handles all project-related operations:

- **`registerProject(req, res)`** - Register a new farm project
  - Input: projectName, farmerName, email, phone, location, cropType, landSize, description
  - Validates required fields
  - Prevents duplicate registrations
  - Returns: Project object with ID and registration timestamp

- **`getProjects(req, res)`** - Retrieve all registered projects
  - Returns: Array of all projects

- **`getProjectById(req, res)`** - Retrieve a specific project by ID
  - Returns: Single project object

- **`updateProject(req, res)`** - Update project details
  - Allows partial updates
  - Returns: Updated project object

- **`deleteProject(req, res)`** - Delete a project
  - Returns: Confirmation with deleted project

#### 2. **API Routes** (`backend/routes/apiRoutes.js`)
Added the following endpoints:

```
POST   /api/projects/register    - Register a new project
GET    /api/projects            - Get all projects
GET    /api/projects/:id        - Get project by ID
PUT    /api/projects/:id        - Update project
DELETE /api/projects/:id        - Delete project
```

#### 3. **Data Store** (`backend/data/store.js`)
Added projects array to store project data in memory.

### Frontend

#### 1. **Register Page** (`src/pages/Register.jsx`)
A comprehensive form for farmers to register their projects with:
- Project name
- Farmer name
- Email address
- Phone number
- Farm location
- Primary crop selection (dropdown with predefined options)
- Land size in acres
- Project description
- Form validation and error handling
- Success message and redirect to home

#### 2. **Projects Page** (`src/pages/Projects.jsx`)
Displays all registered projects in a card-based grid layout:
- Shows project details
- Displays farmer information
- Shows farm location and land size
- Includes delete functionality
- Responsive design

#### 3. **Updated Navigation** (`src/components/Navbar.jsx`)
Added navigation links to:
- Register page
- Projects listing page

#### 4. **Updated App Router** (`src/App.jsx`)
Added routes for:
- `/register` - Project registration page
- `/projects` - Projects listing page

## Project Data Structure

```javascript
{
  id: number,
  projectName: string,
  farmerName: string,
  email: string,
  phone: string,
  location: string,
  cropType: string,
  landSize: number,
  description: string,
  status: string,        // "active" by default
  registeredAt: ISO8601  // Timestamp
}
```

## Supported Crops
- Wheat
- Maize
- Rice
- Potato
- Cotton
- Sugarcane
- Tomato
- Onion

## Features

### Registration
✅ Form validation for required fields
✅ Email-based duplicate prevention
✅ Support for multiple crop types
✅ Land size tracking
✅ Automatic timestamp generation
✅ Responsive form design

### Project Management
✅ View all registered projects
✅ View individual project details
✅ Update project information
✅ Delete projects
✅ Project status tracking

## API Examples

### Register a Project
```bash
curl -X POST http://localhost:5000/api/projects/register \
  -H "Content-Type: application/json" \
  -d '{
    "projectName": "North Farm 2024",
    "farmerName": "John Farmer",
    "email": "john@farm.com",
    "phone": "+91 9876543210",
    "location": "Punjab, India",
    "cropType": "Wheat",
    "landSize": 5.5,
    "description": "Modern wheat farming operation"
  }'
```

### Get All Projects
```bash
curl http://localhost:5000/api/projects
```

### Get Project by ID
```bash
curl http://localhost:5000/api/projects/1
```

### Update Project
```bash
curl -X PUT http://localhost:5000/api/projects/1 \
  -H "Content-Type: application/json" \
  -d '{
    "landSize": 6.0,
    "description": "Updated description"
  }'
```

### Delete Project
```bash
curl -X DELETE http://localhost:5000/api/projects/1
```

## Usage Flow

1. **Navigate to Register** - Click "Register" in the navigation menu
2. **Fill Registration Form** - Enter farm and project details
3. **Submit** - Click "Register Project" button
4. **View Projects** - Click "Projects" to see all registered projects
5. **Manage** - Update or delete projects as needed

## Future Enhancements

Potential improvements:
- Database persistence (MongoDB, PostgreSQL, etc.)
- Authentication and authorization
- Project image upload
- Project verification/approval workflow
- Farmer profile page
- Project performance tracking
- Integration with listing system

## Notes

- Currently uses in-memory storage (data resets on server restart)
- For production, implement a proper database
- Add authentication for secure project management
- Consider adding file upload for project documents/images
