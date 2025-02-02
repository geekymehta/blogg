import { ChangeEvent } from "react";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
import Editor from "./Editor";
// import CodeEditor from "./CodeBlockComponent";

const TextEditor = ({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  // const editor = useEditor({
  //   extensions: [StarterKit],
  //   content: "<p>Start writing...</p>",
  // });
  return (
    <div className="mt-2 mb-4 flex items-center justify-between border">
      <div className="my-2 bg-white rounded-b-lg w-full">
        <label className="sr-only">Publish post</label>
        {/* <textarea
          onChange={onChange}
          id="editor"
          rows={8}
          className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2"
          placeholder="Write an article..."
          required
        /> */}
        <Editor/>
        {/* <CodeEditor /> */}
      </div>
    </div>
  );
};

export default TextEditor;
