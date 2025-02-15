import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Iframe from "../EditorUtils/CustomComponent/Iframe"; // Custom iframe extension
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import CodeBlock from "../EditorUtils/CustomComponent/CodeBlock";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import ButtonComponent from "./ButtonComponent/ButtonComponent";
import { BACKEND_URL } from "../../config";
import Toolbar from "../EditorUtils/Toolbar";

const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [buttonPosition, setButtonPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const navigate = useNavigate();

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
    onUpdate: updateButtonPosition,
    onSelectionUpdate: updateButtonPosition,
  });

  function updateButtonPosition({ editor }: any) {
    const { state } = editor;
    const { from } = state.selection;

    const coords = editor.view.coordsAtPos(from);
    const editorElement = editor.view.dom as HTMLElement;

    setButtonPosition({
      top: coords.top + editorElement.scrollTop + window.scrollY, // Adjust for scroll
      left: coords.left,
    });
  }

  const onSubmit = async () => {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/blog`,
      {
        title,
        content: description,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    navigate(`/blog/${response.data.id}`);
  };

  if (!editor) return null;

  return (
    <EditorContext.Provider value={editor as any}>
      <div className="flex justify-center pt-8 bg-[#222222] max-w-screen-lg w-full px-8">
        {buttonPosition && (
          <ButtonComponent position={buttonPosition.top} editor={editor} />
        )}
        <div className="px-[30px]">
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            placeholder="Title"
          />
          <div className="border p-2 rounded">
            {/* Toolbar */}
            <Toolbar editor={editor} />

            {/* Editor Content */}
            <EditorContent editor={editor} />
          </div>

          <button
            onClick={onSubmit}
            type="submit"
            className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Publish post
          </button>
        </div>
      </div>
    </EditorContext.Provider>
  );
};

export default Publish;
