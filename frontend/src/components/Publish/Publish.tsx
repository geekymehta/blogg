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
import Placeholder from "@tiptap/extension-placeholder";
import { BACKEND_URL } from "../../config";
import Toolbar from "../EditorUtils/Toolbar";

const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [buttonPosition, setButtonPosition] = useState<number>(0);
  const [isButtonVisible, setIsButtonVisible] = useState<boolean>(true);
  const [placeholderText, setPlaceholderText] = useState(
    "Start writing your blog..."
  );
  const navigate = useNavigate();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: "editor-paragraph",
          },
        },
        codeBlock: false,
      }),
      Placeholder.configure({
        placeholder: () => placeholderText, // Custom placeholder
        showOnlyWhenEditable: true, // Shows only if the editor is editable
        showOnlyCurrent: false, // Ensures it appears only when the editor is completely empty
      }),
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
    content: "",
    onUpdate: updateButtonPosition,
    onSelectionUpdate: updateButtonPosition,
    onFocus: updateButtonPosition,
  });

  function updateButtonPosition({ editor }: any) {
    const { state } = editor;
    const { from } = state.selection;

    const coords = editor.view.coordsAtPos(from);
    const editorElement = editor.view.dom as HTMLElement;

    // Get text at current cursor position
    const textInCurrentLine = editor.state.doc
      .textBetween(from - 1, from)
      .trim();

    // Always show button when editor is first focused
    if (editor.state.doc.textContent.length === 0 || textInCurrentLine === "") {
      setButtonPosition(coords.top + editorElement.scrollTop + window.scrollY);
      setIsButtonVisible(true);
    } else {
      setIsButtonVisible(false);
    }
  }

  useEffect(() => {
    if (editor) {
      updateButtonPosition({ editor });
      const updatePlaceholder = () => {
        const newPlaceholder = editor.isEmpty
          ? "Start writing your blog..."
          : "";
        setPlaceholderText(newPlaceholder);

        // Reconfigure the placeholder extension
        editor.extensionManager.extensions.forEach((ext) => {
          if (ext.name === "placeholder") {
            ext.options.placeholder = newPlaceholder;
          }
        });

        // Force a re-render to apply new placeholder
        editor.view.dispatch(editor.state.tr);
      };

      editor.on("update", updatePlaceholder);
      editor.on("selectionUpdate", updatePlaceholder);

      return () => {
        editor.off("update", updatePlaceholder);
        editor.off("selectionUpdate", updatePlaceholder);
      };
    }
  }, [editor]);

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
      <div className="flex justify-center pt-8 bg-background max-w-screen-lg w-full px-8">
        <ButtonComponent
          position={buttonPosition}
          editor={editor}
          isButtonVisible={isButtonVisible}
        />
        <div className="px-[30px] w-full">
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            className="w-full bg-background border border-[#575757] text-foreground text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            placeholder="Title"
          />
          <div className="border border-[#575757] p-2 rounded">
            {/* Toolbar */}
            {/* <Toolbar editor={editor} /> */}

            {/* Editor Content */}
            <EditorContent editor={editor} className="text-foreground" />
          </div>

          <button
            onClick={onSubmit}
            type="submit"
            className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-foreground bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Publish post
          </button>
        </div>
      </div>
    </EditorContext.Provider>
  );
};

export default Publish;
