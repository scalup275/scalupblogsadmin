import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useState } from "react";
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
} from "lucide-react";

interface Props {
  value: string;
  onChange: (html: string) => void;
}

interface ToolbarButtonProps {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}

const ToolbarButton = ({
  onClick,
  active,
  title,
  children,
}: ToolbarButtonProps) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "30px",
      height: "30px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      transition: "all 0.15s ease",
      background: active ? "rgba(139, 92, 246, 0.15)" : "transparent",
      color: active ? "#8b5cf6" : "#94a3b8",
    }}
    onMouseEnter={(e) => {
      if (!active)
        (e.currentTarget as HTMLButtonElement).style.background =
          "rgba(255,255,255,0.06)";
      (e.currentTarget as HTMLButtonElement).style.color = "#e2e8f0";
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLButtonElement).style.background = active
        ? "rgba(139, 92, 246, 0.15)"
        : "transparent";
      (e.currentTarget as HTMLButtonElement).style.color = active
        ? "#8b5cf6"
        : "#94a3b8";
    }}
  >
    {children}
  </button>
);

const Divider = () => (
  <div
    style={{
      width: "1px",
      height: "18px",
      background: "rgba(255,255,255,0.1)",
      margin: "0 4px",
    }}
  />
);

export default function RichTextEditor({ value, onChange }: Props) {
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({
        placeholder: "Start writing something beautiful...",
      }),
    ],
    content: value || "",
    onUpdate({ editor }) {
      const html = editor.getHTML();
      const text = editor.getText();
      onChange(html);
      setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0);
      setCharCount(text.length);
    },
    editorProps: {
      attributes: {
        class: "tiptap-editor",
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

  const addImage = () => {
    const url = prompt("Paste an image URL");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const addLink = () => {
    const url = prompt("Enter URL");
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  return (
    <>
      <style>{`
        .tiptap-editor {
          outline: none;
          min-height: 320px;
          padding: 28px 32px;
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 17px;
          line-height: 1.85;
          color: #e2e8f0;
          caret-color: #8b5cf6;
        }
        .tiptap-editor p { margin: 0 0 1.1em; }
        .tiptap-editor h2 {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 22px; font-weight: 600;
          color: #f1f5f9; margin: 1.6em 0 0.5em;
          letter-spacing: -0.02em;
        }
        .tiptap-editor h3 {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 17px; font-weight: 600;
          color: #cbd5e1; margin: 1.4em 0 0.4em;
          letter-spacing: -0.01em;
        }
        .tiptap-editor strong { color: #f1f5f9; font-weight: 700; }
        .tiptap-editor em { color: #c4b5fd; font-style: italic; }
        .tiptap-editor a { color: #818cf8; text-decoration: underline; text-decoration-color: rgba(129,140,248,0.4); }
        .tiptap-editor ul, .tiptap-editor ol { padding-left: 1.4em; margin: 0.8em 0; }
        .tiptap-editor li { margin: 0.3em 0; color: #cbd5e1; }
        .tiptap-editor ul li::marker { color: #6366f1; }
        .tiptap-editor blockquote {
          border-left: 3px solid #8b5cf6;
          padding: 4px 0 4px 20px;
          margin: 1.2em 0;
          color: #94a3b8;
          font-style: italic;
        }
        .tiptap-editor code {
          background: rgba(99, 102, 241, 0.12);
          color: #a5b4fc;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 14px;
        }
        .tiptap-editor pre {
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 8px;
          padding: 16px 20px;
          overflow-x: auto;
          margin: 1em 0;
        }
        .tiptap-editor pre code {
          background: transparent;
          padding: 0;
          color: #a5b4fc;
          font-size: 13.5px;
        }
        .tiptap-editor hr {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.08);
          margin: 2em 0;
        }
        .tiptap-editor img {
          max-width: 100%; border-radius: 8px;
          margin: 1em 0;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .tiptap-editor .is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          color: rgba(148, 163, 184, 0.4);
          pointer-events: none;
          position: absolute;
          font-style: italic;
        }
        .tiptap-editor ::selection {
          background: rgba(139, 92, 246, 0.25);
        }
      `}</style>

      <div
        style={{
          background: "#0f172a",
          border: `1px solid ${isFocused ? "rgba(139, 92, 246, 0.4)" : "rgba(255,255,255,0.07)"}`,
          borderRadius: "12px",
          overflow: "hidden",
          transition: "border-color 0.2s ease",
          boxShadow: isFocused ? "0 0 0 3px rgba(139, 92, 246, 0.08)" : "none",
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        {/* Toolbar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
            padding: "10px 14px",
            background: "rgba(255,255,255,0.02)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            flexWrap: "wrap",
          }}
        >
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

          <Divider />

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
            title="Inline code"
            onClick={() => editor.chain().focus().toggleCode().run()}
            active={editor.isActive("code")}
          >
            <Code size={15} />
          </ToolbarButton>

          <Divider />

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

          <Divider />

          <ToolbarButton
            title="Add link"
            onClick={addLink}
            active={editor.isActive("link")}
          >
            <Link2 size={15} />
          </ToolbarButton>
          <ToolbarButton title="Add image" onClick={addImage}>
            <ImageIcon size={15} />
          </ToolbarButton>
          <ToolbarButton
            title="Horizontal rule"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <Minus size={15} />
          </ToolbarButton>
        </div>

        {/* Editor area */}
        <div style={{ position: "relative" }}>
          <EditorContent editor={editor} />
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "16px",
            padding: "8px 20px",
            borderTop: "1px solid rgba(255,255,255,0.04)",
            background: "rgba(255,255,255,0.01)",
          }}
        >
          <span
            style={{
              fontSize: "11.5px",
              color: "rgba(148, 163, 184, 0.4)",
              fontFamily: "monospace",
            }}
          >
            {wordCount} words
          </span>
          <span
            style={{
              fontSize: "11.5px",
              color: "rgba(148, 163, 184, 0.25)",
              fontFamily: "monospace",
            }}
          >
            {charCount} chars
          </span>
        </div>
      </div>
    </>
  );
}
