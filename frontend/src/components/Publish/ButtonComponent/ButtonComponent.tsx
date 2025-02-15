import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Editor } from "@tiptap/react";
import { CiImageOn } from "react-icons/ci";
import { motion } from "framer-motion";
import styles from "./ButtonComponent.module.css";
import { IoCode } from "react-icons/io5";
import { FaCode } from "react-icons/fa";

const ButtonComponent = ({
  position,
  editor,
  isButtonVisible,
}: {
  position: number;
  editor: Editor;
  isButtonVisible: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const iconSize = 18;

  const addCodeBlock = () => {
    editor
      .chain()
      .focus()
      .insertContent([{ type: "codeBlock" }, { type: "paragraph" }])
      .run();
  };

  useEffect(() => {
    if (!isButtonVisible) setIsOpen(false);
  }, [isButtonVisible]);

  return (
    <div
      className={`z-10 transition-all ${
        isButtonVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <motion.div
        className={styles.plus_btn_container}
        style={{ top: position }}
        animate={{ width: isOpen ? "max-content" : "2rem" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <button
          className={`${styles.btn} ${isOpen ? "rotate-45" : "rotate-0"}`}
          onClick={() => {
            if (isButtonVisible) setIsOpen(!isOpen);
          }}
        >
          <AiOutlinePlus size={iconSize} />
        </button>

        {/* Image Button with Smooth Appearance */}
        <motion.button
          className={styles.btn}
          onClick={() => {
            const url = prompt("Enter image URL");
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.1 }}
        >
          <CiImageOn size={iconSize} />
        </motion.button>
        {/* Code Button with Smooth Appearance */}
        <motion.button
          className={styles.btn}
          onClick={addCodeBlock}
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.15 }}
        >
          <FaCode size={iconSize} />
        </motion.button>
        {/* IFrame Button with Smooth Appearance */}
        <motion.button
          className={styles.btn}
          onClick={() => {
            const url = prompt("Enter iframe URL");
            if (url)
              editor
                .chain()
                .focus()
                .setIframe({ src: url, width: 560, height: 315 })
                .run();
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.2 }}
        >
          <IoCode size={iconSize} />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ButtonComponent;
