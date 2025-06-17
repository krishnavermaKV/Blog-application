import { useEffect, useState } from "react";
import { Backend_Url } from "../config";
import axios from "axios";

export interface Blog {
  id: string;
  title: string;
  content: string;
  author: { name: string };
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${Backend_Url}/api/v1/blog/${id}`, {
          headers: token ? { Authorization: `${token}` } : {},
        });

        setBlog(response.data?.blog);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  return { loading, blog };
};

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${Backend_Url}/api/v1/blog/bulk`, {
          headers: token ? { Authorization: `${token}` } : {},
        });

        setBlogs(response.data?.blogs || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return { loading, blogs };
};
