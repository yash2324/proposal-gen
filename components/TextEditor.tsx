// components/TextEditor.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import useProposalStore from "@/stores/proposalStore";
import { saveProposal } from "@/app/actions/saveProposal";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

import "react-quill/dist/quill.bubble.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "link",
  "image",
  "align",
];

export default function TextEditor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [id, setId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [content, setContent] = useState("");
  const { addProposal, updateProposal, getProposal } = useProposalStore();

  useEffect(() => {
    const proposalId = searchParams.get("id");
    const name = searchParams.get("name");
    const template = searchParams.get("template");

    if (proposalId) {
      setId(proposalId);
      // Fetch existing proposal data
      // This assumes you have a function to get a proposal by ID
      const existingProposal = getProposal(proposalId);
      if (existingProposal) {
        setTitle(existingProposal.title);
        setTemplateId(existingProposal.templateId);
        setContent(existingProposal.content);
      }
    } else {
      if (name) setTitle(name);
      if (template) {
        setTemplateId(template);
        // Fetch template content
        fetch(`/api/templates/${template}`)
          .then((response) => response.json())
          .then((data) => {
            setContent(data.content);
          })
          .catch((error) => console.error("Error fetching template:", error));
      }
    }
  }, [searchParams]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("templateId", templateId);
    formData.append("content", content);

    try {
      const savedProposal = await saveProposal(formData);
      if (id) {
        updateProposal(id, {
          title: savedProposal.title,
          templateId: savedProposal.templateId,
          content: savedProposal.content as string,
        });
      } else {
        addProposal({
          id: savedProposal.id,
          title: savedProposal.title,
          templateId: savedProposal.templateId,
          content: savedProposal.content as string,
        });
      }

      router.push("/proposals");
    } catch (error) {
      console.error("Failed to save proposal:", error);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Proposal Title"
        required
        className="w-full p-2 border rounded"
      />
      <ReactQuill
        theme="bubble"
        value={content}
        onChange={setContent}
        modules={modules}
        formats={formats}
        className=" mb-12"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Save Proposal
      </button>
    </form>
  );
}
