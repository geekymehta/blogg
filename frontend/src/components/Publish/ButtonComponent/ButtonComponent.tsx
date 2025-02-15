import React, { useState } from "react";
import styles from "./ButtonComponent.module.css";
import { AiOutlinePlus } from "react-icons/ai";
import { Editor } from "@tiptap/react";
import { CiImageOn } from "react-icons/ci";
import { motion } from "framer-motion";

const ButtonComponent = ({
  position,
  editor,
}: {
  position: number;
  editor: Editor;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const iconSize = 18;
  return (
    <div>
      <motion.div
        className={styles.plus_btn_container}
        style={{ top: position }}
        animate={{ width: isOpen ? "max-content" : "2rem" }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      >
        <button
          className={`${styles.btn} ${isOpen ? "rotate-45" : "rotate-0"}`}
          onClick={() => {
            console.log(isOpen);
            setIsOpen(!isOpen);
          }}
        >
          <AiOutlinePlus size={iconSize} />
        </button>
        <button
          onClick={() => {
            const url = prompt("Enter image URL");
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
          className={buttonStyle(false)}
        >
          <CiImageOn size={iconSize} />
        </button>
        <button
          onClick={() => {
            const url = prompt("Enter image URL");
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
          className={buttonStyle(false)}
        >
          <CiImageOn size={iconSize} />
        </button>
        <button
          onClick={() => {
            const url = prompt("Enter image URL");
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
          className={buttonStyle(false)}
        >
          <CiImageOn size={iconSize} />
        </button>
        <button
          onClick={() => {
            const url = prompt("Enter image URL");
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
          className={buttonStyle(false)}
        >
          <CiImageOn size={iconSize} />
        </button>
        <button
          onClick={() => {
            const url = prompt("Enter image URL");
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
          className={buttonStyle(false)}
        >
          <CiImageOn size={iconSize} />
        </button>
      </motion.div>
    </div>
  );
};

const buttonStyle = (isActive: boolean) =>
  `${styles.btn} ${isActive ? "bg-gray-300" : ""}`;

export default ButtonComponent;
