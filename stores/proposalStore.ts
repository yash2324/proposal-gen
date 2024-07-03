import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Proposal {
  id: string;
  title: string;
  templateId: string;
  content: string;
  images?: string[];
}

interface ProposalState {
  proposals: Proposal[];
  addProposal: (proposal: Proposal) => void;
  updateProposal: (id: string, proposal: Partial<Proposal>) => void;
  deleteProposal: (id: string) => void;
  getProposal: (id: string) => Proposal | undefined;
}

const useProposalStore = create<ProposalState>()(
  persist(
    (set, get) => ({
      proposals: [],
      addProposal: (proposal) =>
        set((state) => ({ proposals: [...state.proposals, proposal] })),
      updateProposal: (id, proposal) =>
        set((state) => ({
          proposals: state.proposals.map((p) =>
            p.id === id ? { ...p, ...proposal } : p
          ),
        })),
      deleteProposal: (id) =>
        set((state) => ({
          proposals: state.proposals.filter((p) => p.id !== id),
        })),
      getProposal: (id) => get().proposals.find((p) => p.id === id),
    }),
    {
      name: "proposal-storage",
    }
  )
);

export default useProposalStore;
