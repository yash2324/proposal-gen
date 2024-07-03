// app/editor/page.tsx
import React from "react";
import TextEditor from "../../components/TextEditor";

export default function EditorPage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Proposal Editor</h1>
      <TextEditor />
    </main>
  );
}
