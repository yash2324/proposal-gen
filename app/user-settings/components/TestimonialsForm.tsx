import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useFormStore from "@/stores/formStore";

const TestimonialsForm = () => {
  const { testimonials, addTestimonial, updateTestimonial } = useFormStore();

  return (
    <div id="testimonials" className="space-y-4">
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
          addTestimonial({ id: Date.now(), name: "", content: "", company: "" })
        }
        variant="outline"
      >
        Add Testimonial
      </Button>
    </div>
  );
};

export default TestimonialsForm;
