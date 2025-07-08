import axios from "axios";
import Appbar from "../components/Appbar";
import { BACKEND_URL } from "../config";
import { useState, type ChangeEvent } from "react";
import {  useNavigate } from "react-router-dom";
import { useUser } from "../hooks";

const Publish = () => {
  const {user} = useUser()
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="">
      <div>
        <Appbar authorName={user?.name || "Anonymous"}    />
      </div>
      <div className=" w-full  flex justify-center mt-10 ">
        <div className="w-80 ">
          <div>
            <div className="w-full mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title
              </label>
              <input
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                id="title"
                name="title"
                type="text"
                aria-describedby="title-helper"
                placeholder="Enter your title"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-150 ease-in-out"
              />
              <p id="title-helper" className="mt-1 text-sm text-gray-500">
                Keep it short and meaningful.
              </p>
            </div>
          </div>
          <div className="mt-4">
            <TextEditor
              onchange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div className="flex items-center justify-between px-4 py-2">
            <button
              onClick={async () => {
                const response = await axios.post(
                  `${BACKEND_URL}/api/v1/blog`,
                  {
                    title,
                    content : description,
                  },
                  {
                    headers: {
                      Authorization: localStorage.getItem("token"),
                    },
                  }
                );
                navigate(`/blog/${response.data.id}`);
              }}
              className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Publish
            </button>

            {/* Add-on buttons or icons can go here */}
            <div className="flex space-x-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
const TextEditor = ({
  onchange,
}: {
  onchange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <form>
        <div className="w-full mb-4 border border-gray-300 rounded-xl bg-gray-50 shadow-sm overflow-hidden">
          {/* Textarea section */}
          <div className="px-4 py-3 bg-white">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              onChange={onchange}
              id="comment"
              rows={6}
              className="w-full text-sm text-gray-900 bg-white border-none focus:outline-none focus:ring-0 resize-none"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>

          {/* Button section */}
        </div>
      </form>
    </div>
  );
};

export default Publish;
