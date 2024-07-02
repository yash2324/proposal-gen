import { create } from "zustand";

interface CompanyInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  logo?: string;
  website: string;
}

interface Testimonial {
  id: number;
  name: string;
  content: string;
  company: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
}

interface FormState {
  email: string;
  setEmail: (email: string) => void;
  companyInfo: CompanyInfo;
  testimonials: Testimonial[];
  projects: Project[];
  setCompanyInfo: (info: CompanyInfo) => void;
  addTestimonial: (testimonial: Testimonial) => void;
  updateTestimonial: (index: number, testimonial: Partial<Testimonial>) => void;
  addProject: (project: Project) => void;
  updateProject: (index: number, project: Partial<Project>) => void;
}

const useFormStore = create<FormState>((set) => ({
  email: "",
  setEmail: (email) => set({ email }),
  companyInfo: { name: "", address: "", phone: "", email: "", website: "" },
  testimonials: [{ id: Date.now(), name: "", content: "", company: "" }],
  projects: [{ id: Date.now(), name: "", description: "" }],
  setCompanyInfo: (info) => set({ companyInfo: info }),
  addTestimonial: (testimonial) =>
    set((state) => ({ testimonials: [...state.testimonials, testimonial] })),
  updateTestimonial: (index, testimonial) =>
    set((state) => {
      const updatedTestimonials = [...state.testimonials];
      updatedTestimonials[index] = {
        ...updatedTestimonials[index],
        ...testimonial,
      };
      return { testimonials: updatedTestimonials };
    }),
  addProject: (project) =>
    set((state) => ({ projects: [...state.projects, project] })),
  updateProject: (index, project) =>
    set((state) => {
      const updatedProjects = [...state.projects];
      updatedProjects[index] = { ...updatedProjects[index], ...project };
      return { projects: updatedProjects };
    }),
}));

export default useFormStore;
