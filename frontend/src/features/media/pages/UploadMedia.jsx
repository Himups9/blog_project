import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import UploadDropzone from "../components/UploadDropzone";

import { uploadMedia } from "../services/mediaService";

const UploadMedia = () => {

    const navigate = useNavigate();

    const [files, setFiles] = useState([]);

    const [uploading, setUploading] =
        useState(false);

    const [altText, setAltText] =
        useState("");

    const handleFiles = (
        selectedFiles
    ) => {

        setFiles(selectedFiles);

    };

    const handleUpload = async () => {

        if (files.length === 0) {

            toast.error(
                "Please select at least one file."
            );

            return;

        }

        setUploading(true);

        try {

            const formData = new FormData();

            files.forEach((file) => {

                formData.append(
                    "files",
                    file
                );

            });

            formData.append(
                "alt_text",
                altText
            );

            await uploadMedia(formData);

            toast.success(
                "Media uploaded successfully."
            );

            navigate("/admin/media");

        } catch (error) {

            console.error(error);

            toast.error(
                "Upload failed."
            );

        } finally {

            setUploading(false);

        }

    };

    /* Continue in Message 2 */
        return (

        <div className="mx-auto max-w-5xl space-y-6">

            {/* ==========================================
                Header
            ========================================== */}

            <div>

                <h1 className="text-3xl font-bold text-gray-900">

                    Upload Media

                </h1>

                <p className="mt-2 text-gray-500">

                    Upload one or more images to your media library.

                </p>

            </div>

            {/* ==========================================
                Upload Area
            ========================================== */}

            <UploadDropzone
                multiple
                files={files}
                onFilesSelected={handleFiles}
            />

            {/* ==========================================
                Alt Text
            ========================================== */}

            <div className="rounded-2xl border border-gray-200 bg-white p-6">

                <label
                    htmlFor="altText"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >

                    Default Alt Text

                </label>

                <input
                    id="altText"
                    type="text"
                    value={altText}
                    onChange={(event) =>
                        setAltText(event.target.value)
                    }
                    placeholder="Describe the uploaded image(s)"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                />

                <p className="mt-2 text-sm text-gray-500">

                    This alt text will be applied to all uploaded files.
                    You can edit each image individually later.

                </p>

            </div>

            {/* ==========================================
                Summary
            ========================================== */}

            <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 md:flex-row md:items-center md:justify-between">

                <div>

                    <p className="font-semibold text-gray-900">

                        Selected Files

                    </p>

                    <p className="text-sm text-gray-500">

                        {files.length} file
                        {files.length !== 1 ? "s" : ""} selected

                    </p>

                </div>

                <div className="flex flex-wrap gap-3">

                    <button
                        type="button"
                        onClick={() => navigate("/admin/media")}
                        disabled={uploading}
                        className="rounded-xl border border-gray-300 px-5 py-3 font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        Cancel

                    </button>

                    <button
                        type="button"
                        onClick={handleUpload}
                        disabled={
                            uploading ||
                            files.length === 0
                        }
                        className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        {uploading
                            ? "Uploading..."
                            : "Upload Files"}

                    </button>

                </div>

            </div>

            {/* Continue in Message 3 */}
                        {/* ==========================================
                Selected Files Preview
            ========================================== */}

            {files.length > 0 && (

                <div className="rounded-2xl border border-gray-200 bg-white p-6">

                    <h2 className="mb-5 text-lg font-semibold text-gray-900">

                        Files Ready for Upload

                    </h2>

                    <div className="space-y-3">

                        {files.map((file, index) => (

                            <div
                                key={`${file.name}-${index}`}
                                className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3"
                            >

                                <div className="min-w-0 flex-1">

                                    <p
                                        className="truncate font-medium text-gray-900"
                                        title={file.name}
                                    >
                                        {file.name}
                                    </p>

                                    <p className="mt-1 text-sm text-gray-500">

                                        {(file.size / 1024 / 1024).toFixed(2)} MB

                                    </p>

                                </div>

                                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">

                                    Ready

                                </span>

                            </div>

                        ))}

                    </div>

                </div>

            )}

        </div>

    );

};

export default UploadMedia;