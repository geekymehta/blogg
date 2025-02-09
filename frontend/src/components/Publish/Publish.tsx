import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import TextEditor from "../TextEditor/TextEditor";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

import styles from "./Publish.module.css";

const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [buttonPosition, setButtonPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const navigate = useNavigate();

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

  return (
    <div className="flex justify-center w-full pt-8 bg-white">
      <div className="max-w-screen-lg w-full">
        {buttonPosition && (
          <button
            className={styles.plus_btn}
            style={{ top: buttonPosition.top }}
          >
            <AiOutlinePlus size={20} />
          </button>
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

          <TextEditor
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            setButtonPosition={setButtonPosition}
          />
          <button
            onClick={onSubmit}
            type="submit"
            className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Publish post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Publish;
