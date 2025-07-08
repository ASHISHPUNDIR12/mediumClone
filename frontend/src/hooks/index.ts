  import axios from "axios";
  import { useEffect, useState } from "react";
  import { BACKEND_URL } from "../config";

  export interface Blog {
      content: string;
      title: string;
      id: number;
      author: {
        name: string;
      };
    }

  export const useBlogs = () => {

    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
      axios
        .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          setBlogs(response.data.blogs);
          setLoading(false);
        });
    }, []);

    return {
      loading,
      blogs,
    };
  };


  export const useBlog = ({ id }: { id: string }) => {

    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
      axios
        .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          setBlog(response.data.blog);
          setLoading(false);
        });
    }, [id]);

    return {
      loading,
      blog,
    };
  };


export interface User {
  id: number;
  name: string;
  email: string;
}

export const useUser = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User >();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get(`${BACKEND_URL}/api/v1/user/me`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log(response.data.user)
        setUser(response.data.user);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    user,
  };
};