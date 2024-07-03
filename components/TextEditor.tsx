// components/TextEditor.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import useProposalStore from "@/stores/proposalStore";
import { saveProposal } from "@/app/actions/saveProposal";

const MenuBar = ({
  editor,
  onButtonClick,
}: {
  editor: any;
  onButtonClick: (e: React.MouseEvent) => void;
}) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="menuBar">
      <button
        onClick={(e) => {
          onButtonClick(e);
          editor.chain().focus().toggleBold().run();
        }}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        bold
      </button>
      <button
        onClick={(e) => {
          onButtonClick(e);
          editor.chain().focus().toggleItalic().run();
        }}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        italic
      </button>
      <button
        onClick={(e) => {
          onButtonClick(e);
          editor.chain().focus().toggleStrike().run();
        }}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        strike
      </button>
      <button
        onClick={(e) => {
          onButtonClick(e);
          editor.chain().focus().toggleHeading({ level: 1 }).run();
        }}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        h1
      </button>
      <button
        onClick={(e) => {
          onButtonClick(e);
          editor.chain().focus().toggleHeading({ level: 2 }).run();
        }}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        h2
      </button>
      <button
        onClick={(e) => {
          onButtonClick(e);
          editor.chain().focus().toggleBulletList().run();
        }}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        bullet list
      </button>
      <button
        onClick={(e) => {
          onButtonClick(e);
          editor.chain().focus().toggleOrderedList().run();
        }}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        ordered list
      </button>
      <button
        onClick={(e) => {
          onButtonClick(e);
          editor
            .chain()
            .focus()
            .setImage({ src: window.prompt("URL") || "" })
            .run();
        }}
      >
        image
      </button>
    </div>
  );
};

export default function TextEditor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [title, setTitle] = useState("");
  const [templateId, setTemplateId] = useState("");
  const { addProposal } = useProposalStore();

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: "",
  });

  useEffect(() => {
    const name = searchParams.get("name");
    const template = searchParams.get("template");
    if (name) setTitle(name);
    if (template) {
      setTemplateId(template);
      // Fetch template content
      fetch(`/api/templates/${template}`)
        .then((response) => response.json())
        .then((data) => {
          if (editor) {
            editor.commands.setContent(data.content);
          }
        })
        .catch((error) => console.error("Error fetching template:", error));
    }
  }, [searchParams, editor]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editor) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("templateId", templateId);
    formData.append("content", editor.getHTML());

    try {
      const savedProposal = await saveProposal(formData);
      addProposal({
        id: savedProposal.id,
        title: savedProposal.title,
        templateId: savedProposal.templateId,
        content: savedProposal.content as string,
      });
      router.push("/proposals");
    } catch (error) {
      console.error("Failed to save proposal:", error);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
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
      <MenuBar editor={editor} onButtonClick={handleButtonClick} />
      <EditorContent editor={editor} className="border p-2 min-h-[400px]" />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Save Proposal
      </button>
    </form>
  );
}
