import { useEffect, useState } from "react";
import { Backend_Url } from "../config";
import axios from "axios";
export interface Blog {
    id: string;
    title: string;
    content: string;
    author: { name: string}; 
  };

export const useBlog = ({id}: {id: string})  => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        const fetchBlogs = async () => {
           try {
                const token = localStorage.getItem("token");

                const response = await axios.get(`${Backend_Url}/api/v1/blog/${id}`, {
                    headers: token ? { authorization: token } : {},
                });

          setBlog(response.data.blog);
          setLoading(false);
            }
            catch(error){
                console.error("Error fetching blogs:");
                setLoading(false);
              };
            }
            fetchBlogs();
        }, [])
    return { loading, blog };
}

export const useBlogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]); // Ensure blogs is always an array
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchBlogs = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(`${Backend_Url}/api/v1/blog/bulk`, {
            headers: { Authorization: `${token}` },
          });
  
          setBlogs(response.data.blogs || []); // Ensure response.data is always an array
        } catch (error) {
          console.error("Error fetching blogs:", error);
          setBlogs([]); // Ensure blogs is always an array even on failure
        } finally {
          setLoading(false);
        }
      };
  
      fetchBlogs();
    }, []);
  
    return { loading, blogs };
  };