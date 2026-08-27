import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { ImagePlus, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import blogService from "../services/blogService";
import { getImageUrl } from "../../utils/imageUrl";

const BlogEditor = ({
    value = "",
    onChange,
    placeholder = "Write your blog content...",
    error,
}) => {
    const imageInputRef = useRef(null);
    const [uploadingImages, setUploadingImages] = useState(false);
    const [uploadError, setUploadError] = useState("");

    const editor = useEditor({
        extensions: [StarterKit, Image.configure({ inline: false })],
        content: value,
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class:
                    "min-h-[350px] rounded-b-xl border border-t-0 border-gray-300 p-4 focus:outline-none prose max-w-none",
            },
        },
        onUpdate: ({ editor }) => {
            onChange?.(editor.getHTML());
        },
    });

    const handleInlineImages = async (event) => {
        const files = Array.from(event.target.files || []);

        event.target.value = "";

        if (!files.length || !editor) return;

        setUploadingImages(true);
        setUploadError("");

        try {
            const response = await blogService.uploadInlineImages(files);
            const images =
                response.data?.data?.images ||
                response.data?.images ||
                [];

            const content = images.flatMap((image) => [
                {
                    type: "image",
                    attrs: {
                        src: getImageUrl(image.url),
                        alt: "",
                        title: null,
                    },
                },
                {
                    type: "paragraph",
                },
            ]);

            if (!content.length) {
                throw new Error("No images were uploaded.");
            }

            editor.chain().focus().insertContent(content).run();
        } catch (error) {
            setUploadError(
                error.response?.data?.message ||
                    "Unable to upload inline images."
            );
        } finally {
            setUploadingImages(false);
        }
    };

    useEffect(() => {
        if (!editor) return;

        if (value !== editor.getHTML()) {
            editor.commands.setContent(value || "", false);
        }
    }, [value, editor]);

    if (!editor) return null;

    return (
        <div className="w-full">
            <div className="flex flex-wrap gap-2 rounded-t-xl border border-gray-300 bg-gray-50 p-3">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`rounded px-3 py-1 text-sm ${
                        editor.isActive("bold")
                            ? "bg-blue-600 text-white"
                            : "bg-white"
                    }`}
                >
                    Bold
                </button>

                <button
                    type="button"
                    onClick={() => {
                        const source = window.prompt("Image URL");

                        if (source) {
                            editor.chain().focus().setImage({ src: source }).run();
                        }
                    }}
                    className="rounded bg-white px-3 py-1 text-sm"
                >
                    Image URL
                </button>

                <button
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                    disabled={uploadingImages}
                    className="inline-flex items-center gap-2 rounded bg-white px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {uploadingImages ? (
                        <Loader2 size={14} className="animate-spin" />
                    ) : (
                        <ImagePlus size={14} />
                    )}
                    {uploadingImages ? "Uploading..." : "Insert Images"}
                </button>

                <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    className="hidden"
                    onChange={handleInlineImages}
                />

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`rounded px-3 py-1 text-sm ${
                        editor.isActive("italic")
                            ? "bg-blue-600 text-white"
                            : "bg-white"
                    }`}
                >
                    Italic
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                    className={`rounded px-3 py-1 text-sm ${
                        editor.isActive("heading", { level: 2 })
                            ? "bg-blue-600 text-white"
                            : "bg-white"
                    }`}
                >
                    H2
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    className={`rounded px-3 py-1 text-sm ${
                        editor.isActive("bulletList")
                            ? "bg-blue-600 text-white"
                            : "bg-white"
                    }`}
                >
                    List
                </button>
            </div>

            <EditorContent editor={editor} />

            {error && (
                <p className="mt-2 text-sm text-red-600">
                    {error}
                </p>
            )}

            {uploadError && (
                <p className="mt-2 text-sm text-red-600">
                    {uploadError}
                </p>
            )}
        </div>
    );
};

export default BlogEditor;
