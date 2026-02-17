import { useState } from "react";

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  status: "draft" | "published";
  author: string;
  createdAt: string;
  updatedAt: string;
  views: number;
}

const initialBlogs: Blog[] = [
  {
    id: "1",
    title: "10 Tips to Scale Your Startup",
    excerpt: "Learn the essential strategies for growing your business quickly and sustainably.",
    content: "Full content here...",
    status: "published",
    author: "John Doe",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
    views: 1234,
  },
  {
    id: "2",
    title: "The Future of Digital Marketing",
    excerpt: "Explore upcoming trends that will shape how brands connect with audiences.",
    content: "Full content here...",
    status: "published",
    author: "Jane Smith",
    createdAt: "2024-01-12",
    updatedAt: "2024-01-14",
    views: 892,
  },
  {
    id: "3",
    title: "Building a Strong Brand Identity",
    excerpt: "A comprehensive guide to creating a memorable and impactful brand.",
    content: "Full content here...",
    status: "draft",
    author: "Mike Johnson",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-10",
    views: 0,
  },
];

export function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);

  const addBlog = (blog: Omit<Blog, "id" | "createdAt" | "updatedAt" | "views">) => {
    const newBlog: Blog = {
      ...blog,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      views: 0,
    };
    setBlogs((prev) => [newBlog, ...prev]);
    return newBlog;
  };

  const updateBlog = (id: string, updates: Partial<Blog>) => {
    setBlogs((prev) =>
      prev.map((blog) =>
        blog.id === id
          ? { ...blog, ...updates, updatedAt: new Date().toISOString().split("T")[0] }
          : blog
      )
    );
  };

  const deleteBlog = (id: string) => {
    setBlogs((prev) => prev.filter((blog) => blog.id !== id));
  };

  return { blogs, addBlog, updateBlog, deleteBlog };
}
