"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import useProposalStore from "@/stores/proposalStore";
import { saveProposal } from "@/app/actions/saveProposal";
import { getProposal } from "@/app/actions/getProposal";
import "react-quill/dist/quill.bubble.css";
import "@/styles/TextEditor.css";

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    if (typeof window !== "undefined") {
      const Quill = require("quill");
      const Block = Quill.import("blots/block");

      class CustomBlock extends Block {
        static create(value: any) {
          const node = super.create();
          if (value && typeof value === "object" && value.class) {
            node.setAttribute("class", value.class);
          }
          return node;
        }

        static formats(node: any) {
          const format: { class?: string } = {};
          if (node.hasAttribute("class")) {
            format.class = node.getAttribute("class");
          }
          return format;
        }
      }

      CustomBlock.blotName = "custom-block";
      CustomBlock.tagName = "DIV";
      Quill.register(CustomBlock, true);
    }
    return RQ;
  },
  {
    ssr: false,
    loading: () => <p>Loading editor...</p>,
  }
);

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["link", "image"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
    matchers: [
      [
        "DIV",
        function (
          node: { getAttribute: (arg0: string) => any },
          delta: { ops: any[] }
        ) {
          const className = node.getAttribute("class");
          if (className) {
            delta.ops.forEach((op) => {
              if (op.insert && typeof op.insert === "string") {
                op.attributes = op.attributes || {};
                op.attributes["custom-block"] = { class: className };
              }
            });
          }
          return delta;
        },
      ],
    ],
  },
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
  "class",
  "indent",
  "blockquote",
  "table",
  "color",
  "background",
  "font",
  "size",
];

export default function TextEditor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [id, setId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {
    addProposal,
    updateProposal,
    generatedProposal,
    clearGeneratedProposal,
  } = useProposalStore();

  useEffect(() => {
    const loadProposalData = async () => {
      setIsLoading(true);
      setError(null);
      const proposalId = searchParams.get("id");
      const name = searchParams.get("name");
      const template = searchParams.get("template");

      if (proposalId) {
        // Editing existing proposal
        setId(proposalId);
        try {
          const existingProposal = await getProposal(proposalId);
          if (existingProposal) {
            setTitle(existingProposal.title);
            setTemplateId(existingProposal.templateId);
            setContent(existingProposal.content || "");
          } else {
            setError("Proposal not found");
          }
        } catch (error) {
          console.error("Error fetching proposal:", error);
          setError("Error fetching proposal");
        }
      } else if (template) {
        setTemplateId(template);
        if (name) setTitle(decodeURIComponent(name));
        if (generatedProposal) {
          setContent(generatedProposal);
          clearGeneratedProposal(); // Clear after use
        } else if (template) {
          try {
            const response = await fetch(`/api/templates/${template}`);
            const data = await response.json();
            setContent(data.content);
          } catch (error) {
            console.error("Error fetching template:", error);
          }
        }
      } else {
        // Creating new proposal without template
        if (name) setTitle(decodeURIComponent(name));
      }
      setIsLoading(false);
    };

    loadProposalData();
  }, [searchParams, clearGeneratedProposal, generatedProposal]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("templateId", templateId);
    formData.append("content", content);
    if (id) formData.append("id", id);

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

  if (isLoading) {
    return <div>Loading editor...</div>;
  }

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
      <div className="editor-container">
        <ReactQuill
          theme="bubble"
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
          className="mb-12"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {id ? "Update Proposal" : "Save Proposal"}
      </button>
    </form>
  );
}
