import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import CodeBlockComponent from "../CodeBlockComponent"; // This will be the UI

const CodeBlock = Node.create({
  name: "codeBlock",

  group: "block",
  atom: true, // Makes this node independent

  addAttributes() {
    return {
      language: { default: "javascript" },
      code: { default: "" },
    };
  },

  parseHTML() {
    return [{ tag: "code" }];
  },

  renderHTML({ node }) {
    return [
      "pre",
      {},
      [
        "code",
        mergeAttributes({ class: `language-${node.attrs.language}` }),
        node.attrs.code,
      ],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockComponent);
  },
});

export default CodeBlock;
