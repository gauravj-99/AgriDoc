import { useState, useEffect } from "react";
import BackHome from "../components/BackHome";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/projects");
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        setProjects(projects.filter(p => p.id !== id));
      }
    } catch (err) {
      alert("Failed to delete project");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-8">
      <BackHome />
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-green-700 mb-2 text-center">
          Registered Farm Projects
        </h1>
        <p className="text-gray-600 text-center mb-8">
          View all registered farm projects in the system
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {projects.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-gray-600 text-xl">No projects registered yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="bg-green-600 px-6 py-4">
                  <h2 className="text-xl font-bold text-white">{project.projectName}</h2>
                  <p className="text-green-100 text-sm">{project.cropType}</p>
                </div>

                <div className="px-6 py-4 space-y-2">
                  <div>
                    <p className="text-sm text-gray-500">Farmer</p>
                    <p className="font-semibold text-gray-900">{project.farmerName}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-semibold text-gray-900">{project.location}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Land Size</p>
                    <p className="font-semibold text-gray-900">{project.landSize} acres</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold text-gray-900 text-sm">{project.email}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-semibold text-gray-900">{project.phone}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span className="inline-block px-3 py-1 bg-green-200 text-green-800 text-sm rounded-full">
                      {project.status}
                    </span>
                  </div>

                  {project.description && (
                    <div>
                      <p className="text-sm text-gray-500">Description</p>
                      <p className="text-gray-700 text-sm">{project.description}</p>
                    </div>
                  )}

                  <div className="text-xs text-gray-400 pt-2">
                    Registered: {new Date(project.registeredAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="px-6 py-4 border-t flex gap-2">
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
