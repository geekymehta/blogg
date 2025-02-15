import React, { useState } from "react";
import { NodeViewWrapper, NodeViewProps } from "@tiptap/react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { Extension } from "@codemirror/state";

const CodeBlockComponent: React.FC<NodeViewProps> = ({
  node,
  updateAttributes,
  deleteNode,
}) => {
  const [code, setCode] = useState(node.attrs.code);
  const [language, setLanguage] = useState(node.attrs.language);

  const extensions: Record<string, Extension> = {
    javascript: javascript(),
    python: python(),
    java: java(),
  };

  const handleSubmit = () => {
    updateAttributes({ code, language });
  };

  return (
    <NodeViewWrapper className="border border-[#575757] p-2 rounded bg-gray-900">
      <div>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>

        <CodeMirror
          value={code}
          height="300px"
          theme={vscodeDark}
          extensions={[extensions[language] || javascript()]}
          onChange={(value) => setCode(value)}
        />

        <button
          onClick={handleSubmit}
          className="px-2 py-1 border border-[#575757] rounded mt-2 bg-blue-500 text-foreground"
        >
          Submit
        </button>
        <button
          onClick={deleteNode}
          className="px-2 py-1 border border-[#575757] rounded mt-2 bg-red-500 text-foreground ml-2"
        >
          Delete
        </button>
      </div>
    </NodeViewWrapper>
  );
};

export default CodeBlockComponent;
