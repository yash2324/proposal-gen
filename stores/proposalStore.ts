// stores/proposalStore.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Proposal {
  id: string;
  title: string;
  templateId: string;
  content: string;
  images?: string[];
}

interface ProposalState {
  proposals: Proposal[];
  generatedProposal: string | null;
  addProposal: (proposal: Proposal) => void;
  updateProposal: (id: string, proposal: Partial<Proposal>) => void;
  deleteProposal: (id: string) => void;
  getProposal: (id: string) => Proposal | undefined;
  setGeneratedProposal: (content: string) => void;
  clearGeneratedProposal: () => void;
}

const useProposalStore = create<ProposalState>()(
  devtools(
    persist(
      (set, get) => ({
        proposals: [],
        generatedProposal: null,
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
        setGeneratedProposal: (content) => set({ generatedProposal: content }),
        clearGeneratedProposal: () => set({ generatedProposal: null }),
      }),
      {
        name: "proposal-storage",
      }
    )
  )
);

export default useProposalStore;
