import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useRef, useState } from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link2,
  Image as ImageIcon,
  Heading2,
  Heading3,
  Quote,
  Code,
  Minus,
  Upload,
} from "lucide-react";

interface Props {
  value: string;
  onChange: (html: string) => void;
}

const ToolbarButton = ({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    className={`
      flex items-center justify-center w-8 h-8 rounded-md border-none cursor-pointer
      transition-all duration-150 text-sm
      ${
        active
          ? "bg-violet-100 text-violet-700"
          : "bg-transparent text-slate-400 hover:bg-slate-100 hover:text-slate-700"
      }
    `}
  >
    {children}
  </button>
);

const Sep = () => <div className="w-px h-5 bg-slate-200 mx-1" />;

export default function RichTextEditor({ value, onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [wordCount, setWordCount] = useState(0);
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image.configure({ inline: false, allowBase64: true }),
      Placeholder.configure({
        placeholder: "Write your blog content here...",
      }),
    ],
    content: value || "",
    onUpdate({ editor }) {
      const text = editor.getText();
      onChange(editor.getHTML());
      setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0);
    },
    editorProps: {
      attributes: {
        class: "tiptap-prose",
      },
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && value && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  // Insert image from URL
  const addImageUrl = () => {
    const url = prompt("Paste an image URL");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  // Insert image from device file
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    setUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      editor.chain().focus().setImage({ src: base64 }).run();
      setUploading(false);
    };
    reader.onerror = () => {
      alert("Failed to read the file.");
      setUploading(false);
    };
    reader.readAsDataURL(file);

    // reset so same file can be re-selected
    e.target.value = "";
  };

  const addLink = () => {
    const url = prompt("Enter URL");
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  return (
    <>
      <style>{`
        .tiptap-prose {
          outline: none;
          min-height: 300px;
          padding: 24px 28px;
          font-family: 'Georgia', serif;
          font-size: 16.5px;
          line-height: 1.85;
          color: #1e293b;
          caret-color: #7c3aed;
        }
        .tiptap-prose p { margin: 0 0 1em; }
        .tiptap-prose h2 {
          font-family: system-ui, sans-serif;
          font-size: 21px; font-weight: 700;
          color: #0f172a; margin: 1.6em 0 0.4em;
          letter-spacing: -0.02em;
        }
        .tiptap-prose h3 {
          font-family: system-ui, sans-serif;
          font-size: 16px; font-weight: 700;
          color: #334155; margin: 1.4em 0 0.3em;
        }
        .tiptap-prose strong { color: #0f172a; }
        .tiptap-prose em { color: #4338ca; }
        .tiptap-prose a { color: #6d28d9; text-decoration: underline; text-underline-offset: 3px; }
        .tiptap-prose ul, .tiptap-prose ol { padding-left: 1.5em; margin: 0.7em 0; }
        .tiptap-prose li { margin: 0.25em 0; }
        .tiptap-prose ul li::marker { color: #7c3aed; }
        .tiptap-prose blockquote {
          border-left: 3px solid #7c3aed;
          padding: 2px 0 2px 18px;
          margin: 1.2em 0;
          color: #64748b;
          font-style: italic;
        }
        .tiptap-prose code {
          background: #f1f0ff;
          color: #5b21b6;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Fira Code', monospace;
          font-size: 13.5px;
        }
        .tiptap-prose pre {
          background: #fafafa;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 14px 18px;
          overflow-x: auto;
          margin: 1em 0;
        }
        .tiptap-prose pre code { background: transparent; padding: 0; color: #4338ca; }
        .tiptap-prose hr { border: none; border-top: 1px solid #e2e8f0; margin: 2em 0; }
        .tiptap-prose img {
          max-width: 100%;
          border-radius: 8px;
          margin: 1.2em 0;
          border: 1px solid #e2e8f0;
          display: block;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
        }
        .tiptap-prose p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          color: #cbd5e1;
          pointer-events: none;
          float: left;
          height: 0;
          font-style: italic;
        }
        .tiptap-prose ::selection { background: rgba(124, 58, 237, 0.12); }
      `}</style>

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm focus-within:border-violet-300 focus-within:ring-2 focus-within:ring-violet-100 transition-all duration-200">
        {/* Toolbar */}
        <div className="flex items-center flex-wrap gap-0.5 px-3 py-2 bg-slate-50 border-b border-slate-100">
          <ToolbarButton
            title="Heading 2"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            active={editor.isActive("heading", { level: 2 })}
          >
            <Heading2 size={15} />
          </ToolbarButton>
          <ToolbarButton
            title="Heading 3"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            active={editor.isActive("heading", { level: 3 })}
          >
            <Heading3 size={15} />
          </ToolbarButton>

          <Sep />

          <ToolbarButton
            title="Bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
          >
            <Bold size={15} />
          </ToolbarButton>
          <ToolbarButton
            title="Italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
          >
            <Italic size={15} />
          </ToolbarButton>
          <ToolbarButton
            title="Code"
            onClick={() => editor.chain().focus().toggleCode().run()}
            active={editor.isActive("code")}
          >
            <Code size={15} />
          </ToolbarButton>

          <Sep />

          <ToolbarButton
            title="Bullet list"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
          >
            <List size={15} />
          </ToolbarButton>
          <ToolbarButton
            title="Numbered list"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
          >
            <ListOrdered size={15} />
          </ToolbarButton>
          <ToolbarButton
            title="Blockquote"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive("blockquote")}
          >
            <Quote size={15} />
          </ToolbarButton>

          <Sep />

          <ToolbarButton
            title="Add link"
            onClick={addLink}
            active={editor.isActive("link")}
          >
            <Link2 size={15} />
          </ToolbarButton>
          <ToolbarButton title="Image from URL" onClick={addImageUrl}>
            <ImageIcon size={15} />
          </ToolbarButton>

          {/* Device image upload */}
          <ToolbarButton
            title="Upload image from device"
            onClick={() => fileInputRef.current?.click()}
          >
            {uploading ? (
              <span className="text-[10px] text-violet-500 font-mono">...</span>
            ) : (
              <Upload size={15} />
            )}
          </ToolbarButton>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />

          <Sep />

          <ToolbarButton
            title="Divider"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <Minus size={15} />
          </ToolbarButton>
        </div>

        {/* Writing area */}
        <EditorContent editor={editor} />

        {/* Footer */}
        <div className="flex justify-end gap-4 px-5 py-2 border-t border-slate-50 bg-slate-50/50">
          <span className="text-[11px] text-slate-300 font-mono">
            {wordCount} words
          </span>
        </div>
      </div>
    </>
  );
}
