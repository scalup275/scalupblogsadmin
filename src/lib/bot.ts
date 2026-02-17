const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// TYPES

export interface BlogPayload {
  title: string;
  excerpt: string;
  content: string;
  isPublished?: boolean;
}
// HELPER/

async function handleResponse(res: Response) {
  if (!res.ok) {
    let errorMsg = "Request failed";

    try {
      const err = await res.json();
      errorMsg = err?.error || err?.message || errorMsg;
    } catch {}

    throw new Error(errorMsg);
  }

  return res.json();
}

//BLOG PUBLI

export async function getAllBlogs() {
  const res = await fetch(`${API_BASE_URL}/api/blogs`);
  return handleResponse(res);
}

export async function getBlogBySlug(slug: string) {
  const res = await fetch(`${API_BASE_URL}/api/blogs/${slug}`);
  return handleResponse(res);
}

/* ---------------- BLOG ADMIN (PROTECTED) ---------------- */

export async function createBlog(data: BlogPayload) {
  const res = await fetch(`${API_BASE_URL}/api/blogs`, {
    method: "POST",
    credentials: "include", //  IMPORTANT FOR AUTH
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse(res);
}

export async function updateBlog(id: string, data: BlogPayload) {
  const res = await fetch(`${API_BASE_URL}/api/blogs/${id}`, {
    method: "PUT",
    credentials: "include", //  IMPORTANT
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse(res);
}

export async function deleteBlog(id: string) {
  const res = await fetch(`${API_BASE_URL}/api/blogs/${id}`, {
    method: "DELETE",
    credentials: "include", //  IMPORTANT
  });

  return handleResponse(res);
}
// AUTH

export async function loginAdmin(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
    method: "POST",
    credentials: "include", //  SET COOKIE
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return handleResponse(res);
}

export async function getCurrentAdmin() {
  const res = await fetch(`${API_BASE_URL}/api/admin/me`, {
    credentials: "include",
  });

  return handleResponse(res);
}

export async function logoutAdmin() {
  const res = await fetch(`${API_BASE_URL}/api/admin/logout`, {
    method: "POST",
    credentials: "include",
  });

  return handleResponse(res);
}

export async function signupAdmin(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/api/admin/create`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return handleResponse(res);
}
