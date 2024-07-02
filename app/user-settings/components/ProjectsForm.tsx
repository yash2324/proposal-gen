import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useFormStore from "@/stores/formStore";

const ProjectsForm = () => {
  const { projects, addProject, updateProject } = useFormStore();
  return (
    <div id="projects" className="space-y-4">
      <h3 className="text-xl font-bold">Projects</h3>
      {projects.map((project, index) => (
        <div key={project.id} className="space-y-2">
          <div>
            <Label htmlFor={`project-name-${index}`}>Name</Label>
            <Input
              id={`project-name-${index}`}
              name="name"
              value={project.name}
              onChange={(e) => updateProject(index, { name: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor={`project-description-${index}`}>Description</Label>
            <Textarea
              id={`project-description-${index}`}
              name="description"
              value={project.description}
              onChange={(e) =>
                updateProject(index, { description: e.target.value })
              }
            />
          </div>
          {projects.length > 1 && <hr />}
        </div>
      ))}
      <Button
        onClick={() =>
          addProject({ id: Date.now(), name: "", description: "" })
        }
        variant="outline"
      >
        Add Project
      </Button>
    </div>
  );
};

export default ProjectsForm;
