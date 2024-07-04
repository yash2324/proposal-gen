import { create } from "zustand";

const generateId = () => Math.random().toString(36).substr(2, 9);

interface CompanyInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  logo?: string;
  website: string;
  executiveSummary?: string;
}

interface Testimonial {
  id: string;
  name: string;
  content: string;
  company: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
}

interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio?: string;
}

interface PricingItem {
  description: string;
  amount: number;
}

interface PricingSection {
  items: PricingItem[];
  totalAmount: number;
  currency: string;
}

interface Proposal {
  id: string;
  title: string;
  templateId: string;
  content?: string;
  images: string[];
}

interface FormState {
  email: string;
  setEmail: (email: string) => void;
  companyInfo: CompanyInfo;
  testimonials: Testimonial[];
  projects: Project[];
  teamMembers: TeamMember[];
  proposals: Proposal[];
  pricingSection: PricingSection;
  setCompanyInfo: (info: CompanyInfo) => void;
  addTestimonial: (testimonial: Testimonial) => void;
  updateTestimonial: (index: number, testimonial: Partial<Testimonial>) => void;
  addProject: (project: Project) => void;
  updateProject: (index: number, project: Partial<Project>) => void;
  addTeamMember: (teamMember: TeamMember) => void;
  updateTeamMember: (index: number, teamMember: Partial<TeamMember>) => void;
  addProposal: (proposal: Proposal) => void;
  updateProposal: (index: number, proposal: Partial<Proposal>) => void;
  setPricingSection: (pricingSection: PricingSection) => void;
  setAllData: (data: {
    email: string;
    companyInfo: CompanyInfo;
    testimonials: Testimonial[];
    projects: Project[];
    teamMembers: TeamMember[];
    proposals: Proposal[];
    pricingSection: PricingSection;
  }) => void;
}

const useFormStore = create<FormState>((set) => ({
  email: "",
  setEmail: (email) => set({ email }),
  companyInfo: { name: "", address: "", phone: "", email: "", website: "" },
  testimonials: [{ id: generateId(), name: "", content: "", company: "" }],
  projects: [{ id: generateId(), name: "", description: "" }],
  teamMembers: [{ id: generateId(), name: "", position: "" }],
  proposals: [{ id: generateId(), title: "", templateId: "", images: [] }],
  pricingSection: { items: [], totalAmount: 0, currency: "USD" },
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
  addTeamMember: (teamMember) =>
    set((state) => ({ teamMembers: [...state.teamMembers, teamMember] })),
  updateTeamMember: (index, teamMember) =>
    set((state) => {
      const updatedTeamMembers = [...state.teamMembers];
      updatedTeamMembers[index] = {
        ...updatedTeamMembers[index],
        ...teamMember,
      };
      return { teamMembers: updatedTeamMembers };
    }),
  addProposal: (proposal) =>
    set((state) => ({ proposals: [...state.proposals, proposal] })),
  updateProposal: (index, proposal) =>
    set((state) => {
      const updatedProposals = [...state.proposals];
      updatedProposals[index] = { ...updatedProposals[index], ...proposal };
      return { proposals: updatedProposals };
    }),
  setPricingSection: (pricingSection) => set({ pricingSection }),
  setAllData: (data) =>
    set((state) => {
      console.log("Setting all data in store:", data);
      return data;
    }),
}));

export default useFormStore;
