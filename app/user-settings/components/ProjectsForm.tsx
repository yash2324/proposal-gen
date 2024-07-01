import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ProjectsForm = () => {
  const [projects, setProjects] = useState([
    { id: Date.now(), name: "", description: "" },
  ]);

  const addProject = () => {
    setProjects([...projects, { id: Date.now(), name: "", description: "" }]);
  };

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updatedProjects = projects.map((project, i) =>
      i === index
        ? { ...project, [event.target.name]: event.target.value }
        : project
    );
    setProjects(updatedProjects);
  };
  return (
    <div className="space-y-4" id="projects">
      <h3 className="text-xl font-bold">Projects</h3>
      {projects.map((project, index) => (
        <div key={project.id} className="space-y-2">
          <div>
            <Label htmlFor={`project-name-${index}`}>Name</Label>
            <Input
              id={`project-name-${index}`}
              name="name"
              value={project.name}
              onChange={(e) => handleInputChange(index, e)}
            />
          </div>
          <div>
            <Label htmlFor={`project-description-${index}`}>Description</Label>
            <Textarea
              id={`project-description-${index}`}
              name="description"
              value={project.description}
              onChange={(e) => handleInputChange(index, e)}
            />
          </div>
          {projects.length > 1 && <hr />}
        </div>
      ))}
      <Button onClick={addProject} variant="outline">
        Add More Projects
      </Button>
    </div>
  );
};

export default ProjectsForm;
