import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const TestimonialsForm = () => {
  const [testimonials, setTestimonials] = useState([
    { id: Date.now(), name: "", content: "", company: "" },
  ]);

  const addTestimonial = () => {
    setTestimonials([
      ...testimonials,
      { id: Date.now(), name: "", content: "", company: "" },
    ]);
  };

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updatedTestimonials = testimonials.map((testimonial, i) =>
      i === index
        ? { ...testimonial, [event.target.name]: event.target.value }
        : testimonial
    );
    setTestimonials(updatedTestimonials);
  };

  return (
    <div className="space-y-4" id="testimonials">
      <h3 className="text-xl font-bold">Testimonials</h3>
      {testimonials.map((testimonial, index) => (
        <div key={testimonial.id} className="space-y-2 ">
          <div>
            <Label htmlFor={`testimonial-name-${index}`}>Name</Label>
            <Input
              id={`testimonial-name-${index}`}
              name="name"
              value={testimonial.name}
              onChange={(e) => handleInputChange(index, e)}
            />
          </div>
          <div>
            <Label htmlFor={`testimonial-content-${index}`}>Content</Label>
            <Textarea
              id={`testimonial-content-${index}`}
              name="content"
              value={testimonial.content}
              onChange={(e) => handleInputChange(index, e)}
            />
          </div>
          <div>
            <Label htmlFor={`testimonial-company-${index}`}>Company</Label>
            <Input
              id={`testimonial-company-${index}`}
              name="company"
              value={testimonial.company}
              onChange={(e) => handleInputChange(index, e)}
            />
          </div>
          {testimonials.length > 1 && <hr />}
        </div>
      ))}
      <Button onClick={addTestimonial} variant="outline">
        Add More Testimonials
      </Button>
    </div>
  );
};

export default TestimonialsForm;
