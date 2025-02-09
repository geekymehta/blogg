import { ChangeEvent } from "react";
import Editor from "./Editor";

const TextEditor = ({
  onChange,
  setButtonPosition,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  setButtonPosition: any;
}) => {
  return (
    <div className="mt-2 mb-4 flex items-center justify-between border ">
      <div className="my-2 bg-white rounded-b-lg w-full">
        <label className="sr-only">Publish post</label>

        <Editor setButtonPosition={setButtonPosition}/>
      </div>
    </div>
  );
};

export default TextEditor;
