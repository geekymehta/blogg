import React from "react";
import { Editor } from "@tiptap/react";

const Toolbar = ({ editor }: { editor: Editor }) => {
  const addCodeBlock = () => {
    editor
      .chain()
      .focus()
      .insertContent([{ type: "codeBlock" }, { type: "paragraph" }])
      .run();
  };
  return (
    <div className="mb-2 p-2 flex gap-2 flex-wrap">
      {/* Basic Formatting */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={buttonStyle(editor.isActive("bold"))}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={buttonStyle(editor.isActive("italic"))}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={buttonStyle(editor.isActive("underline"))}
      >
        Underline
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={buttonStyle(editor.isActive("strike"))}
      >
        Strikethrough
      </button>
      <button
        onClick={addCodeBlock}
        className="px-2 py-1 border border-[#575757] rounded"
      >
        Add Code Block
      </button>

      {/* Headings */}
      {([1, 2, 3] as const).map((level) => (
        <button
          key={level}
          onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
          className={buttonStyle(editor.isActive("heading", { level }))}
        >
          H{level}
        </button>
      ))}

      {/* Lists */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={buttonStyle(editor.isActive("bulletList"))}
      >
        Bullet List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={buttonStyle(editor.isActive("orderedList"))}
      >
        Numbered List
      </button>

      {/* Blockquote & Horizontal Line */}
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={buttonStyle(editor.isActive("blockquote"))}
      >
        Blockquote
      </button>
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={buttonStyle(false)}
      >
        HR
      </button>

      {/* Links */}
      <button
        onClick={() => {
          const url = prompt("Enter URL");
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }}
        className={buttonStyle(editor.isActive("link"))}
      >
        Link
      </button>

      {/* Images & Iframes */}
      <button
        onClick={() => {
          const url = prompt("Enter image URL");
          if (url) editor.chain().focus().setImage({ src: url }).run();
        }}
        className={buttonStyle(false)}
      >
        Image
      </button>
      <button
        onClick={() => {
          const url = prompt("Enter iframe URL");
          if (url)
            editor
              .chain()
              .focus()
              .setIframe({ src: url, width: 560, height: 315 })
              .run();
        }}
        className={buttonStyle(false)}
      >
        Iframe
      </button>
      <button
        onClick={() => {
          console.log(editor?.getHTML());
        }}
        className={buttonStyle(false)}
      >
        print
      </button>
    </div>
  );
};

// Function to style buttons based on active state
const buttonStyle = (isActive: boolean) =>
  `px-2 py-1 border border-[#575757] rounded ${isActive ? "bg-gray-300" : ""}`;

export default Toolbar;
