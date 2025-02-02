import { Node, mergeAttributes } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    iframe: {
      setIframe: (options: { src: string; width?: number; height?: number }) => ReturnType;
    };
  }
}

const Iframe = Node.create({
  name: "iframe",

  group: "block",

  atom: true,

  addAttributes() {
    return {
      src: { default: "" },
      width: { default: 560 },
      height: { default: 315 },
    };
  },

  parseHTML() {
    return [{ tag: "iframe" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["iframe", mergeAttributes(HTMLAttributes)];
  },

  addCommands() {
    return {
      setIframe:
        (options: { src: string; width?: number; height?: number }) =>
        ({ chain }) => {
          return chain()
            .insertContent({
              type: this.name,
              attrs: options,
            })
            .run();
        },
    };
  },
});

export default Iframe;
