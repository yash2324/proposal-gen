import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import useFormStore from "../stores/formStore";

const TeamMembersForm = () => {
  const { teamMembers, addTeamMember, updateTeamMember } = useFormStore();

  return (
    <div id="team-members" className="space-y-4">
      <h3 className="text-xl font-bold">Team Members</h3>
      {teamMembers.map((member, index) => (
        <div key={member.id} className="space-y-2 border p-4 rounded">
          <div>
            <Label htmlFor={`member-name-${index}`}>Name</Label>
            <Input
              id={`member-name-${index}`}
              value={member.name}
              onChange={(e) =>
                updateTeamMember(index, { name: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor={`member-position-${index}`}>Position</Label>
            <Input
              id={`member-position-${index}`}
              value={member.position}
              onChange={(e) =>
                updateTeamMember(index, { position: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor={`member-bio-${index}`}>Bio</Label>
            <Textarea
              id={`member-bio-${index}`}
              value={member.bio || ""}
              onChange={(e) => updateTeamMember(index, { bio: e.target.value })}
            />
          </div>
        </div>
      ))}
      <Button
        variant={"outline"}
        onClick={() =>
          addTeamMember({ id: Date.now().toString(), name: "", position: "" })
        }
        type="button"
      >
        Add Team Member
      </Button>
    </div>
  );
};

export default TeamMembersForm;
