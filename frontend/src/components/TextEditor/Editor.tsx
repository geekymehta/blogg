import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Iframe from "./CustomComponent/Iframe"; // Custom iframe extension
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import CodeBlock from "./CustomComponent/CodeBlock";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import { useState } from "react";
import Toolbar from "./Toolbar";

const Editor = ({ setButtonPosition }: { setButtonPosition: any }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Image,
      Iframe,
      Link,
      Underline,
      TextStyle,
      CodeBlock,
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: "<p>Start writing...</p>",
    onUpdate: ({ editor }) => {
      const { state } = editor;
      const { from } = state.selection; // Get cursor position

      // Get cursor coordinates
      const coords = editor.view.coordsAtPos(from);
      setButtonPosition({ top: coords.top, left: coords.left });
    },
  });

  if (!editor) return null;

  return (
    <div className="border p-2 rounded">
      {/* Toolbar */}
      <Toolbar editor={editor} />

      {/* Editor Content */}
      <EditorContent editor={editor} className="p-4 border rounded prose" />
    </div>
  );
};

export default Editor;
