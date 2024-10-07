import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import useFormStore from "../stores/formStore";
const generateId = () => Math.random().toString(36).substr(2, 9);
const TestimonialsForm = () => {
  const { testimonials, addTestimonial, updateTestimonial } = useFormStore();

  return (
    <div
      id="testimonials"
      className="space-y-6 bg-white p-6 rounded-lg shadow-md"
    >
      <h3 className="text-xl font-bold">Testimonials</h3>
      {testimonials.map((testimonial, index) => (
        <div key={testimonial.id} className="space-y-2">
          <div>
            <Label htmlFor={`testimonial-name-${index}`}>Name</Label>
            <Input
              id={`testimonial-name-${index}`}
              name="name"
              value={testimonial.name}
              onChange={(e) =>
                updateTestimonial(index, { name: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor={`testimonial-content-${index}`}>Content</Label>
            <Textarea
              id={`testimonial-content-${index}`}
              name="content"
              value={testimonial.content}
              onChange={(e) =>
                updateTestimonial(index, { content: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor={`testimonial-company-${index}`}>Company</Label>
            <Input
              id={`testimonial-company-${index}`}
              name="company"
              value={testimonial.company}
              onChange={(e) =>
                updateTestimonial(index, { company: e.target.value })
              }
            />
          </div>
          {testimonials.length > 1 && <hr />}
        </div>
      ))}
      <Button
        onClick={() =>
          addTestimonial({
            id: generateId(),
            name: "",
            content: "",
            company: "",
          })
        }
        type="button"
        variant="outline"
      >
        Add Testimonial
      </Button>
    </div>
  );
};

export default TestimonialsForm;
