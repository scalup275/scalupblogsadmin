import { useEffect, useState, memo, useCallback } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RichTextEditor from "@/components/editor/RichTextEditor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, Search, EyeOff, Globe } from "lucide-react";
import { toast } from "sonner";
import {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  toggleBlogPublish,
} from "@/lib/bot";

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  isPublished: boolean;
  createdAt: string;
}

interface FormData {
  title: string;
  excerpt: string;
  content: string;
  isPublished: boolean;
}

//  MOVED OUTSIDE — this is the fix, BlogForm no longer remounts on every render
const BlogForm = memo(
  ({
    formData,
    setFormData,
    onSubmit,
    submitLabel,
  }: {
    formData: FormData;
    setFormData: (updater: (prev: FormData) => FormData) => void;
    onSubmit: () => void;
    submitLabel: string;
  }) => (
    <div className="space-y-4">
      <Input
        placeholder="Title"
        value={formData.title}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, title: e.target.value }))
        }
      />
      <Input
        placeholder="Excerpt"
        value={formData.excerpt}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
        }
      />
      <RichTextEditor
        value={formData.content}
        onChange={(html) => setFormData((prev) => ({ ...prev, content: html }))}
      />
      <Select
        value={formData.isPublished ? "published" : "draft"}
        onValueChange={(v) =>
          setFormData((prev) => ({ ...prev, isPublished: v === "published" }))
        }
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="draft">Draft</SelectItem>
          <SelectItem value="published">Published</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={onSubmit} className="w-full">
        {submitLabel}
      </Button>
    </div>
  ),
);

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState<FormData>({
    title: "",
    excerpt: "",
    content: "",
    isPublished: false,
  });

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await getAllBlogs();
      setBlogs(data);
    } catch (err) {
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleCreate = async () => {
    if (!formData.title || !formData.excerpt || !formData.content) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      await createBlog(formData);
      toast.success("Blog created successfully");
      setIsCreateOpen(false);
      setFormData({ title: "", excerpt: "", content: "", isPublished: false });
      fetchBlogs();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      isPublished: blog.isPublished,
    });
    setIsEditOpen(true);
  };

  const handleUpdate = async () => {
    if (!editingBlog) return;
    try {
      await updateBlog(editingBlog._id, formData);
      toast.success("Blog updated successfully");
      setIsEditOpen(false);
      setEditingBlog(null);
      fetchBlogs();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBlog(id);
      toast.success("Blog deleted successfully");
      fetchBlogs();
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  const handleTogglePublish = async (id: string) => {
    try {
      await toggleBlogPublish(id);
      fetchBlogs();
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  return (
    <AdminLayout title="Blogs" subtitle="Manage your blog posts">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 sm:w-64"
            />
          </div>

          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" /> New Blog
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Blog</DialogTitle>
              </DialogHeader>
              <BlogForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleCreate}
                submitLabel="Create"
              />
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Blogs ({filteredBlogs.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBlogs.map((blog) => (
                    <TableRow key={blog._id}>
                      <TableCell>{blog.title}</TableCell>
                      <TableCell>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleTogglePublish(blog._id)}
                        >
                          {blog.isPublished ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Globe className="h-4 w-4" />
                          )}
                        </Button>
                      </TableCell>
                      <TableCell>
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleEdit(blog)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleDelete(blog._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Blog</DialogTitle>
            </DialogHeader>
            <BlogForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleUpdate}
              submitLabel="Update"
            />
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
