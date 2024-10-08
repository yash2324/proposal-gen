import React from "react";
import TextEditor from "../../components/TextEditor";

export default function EditorPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Proposal Editor
        </h1>
        <TextEditor />
      </div>
    </main>
  );
}
