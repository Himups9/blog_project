import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    Calendar,
    Edit,
    FileText,
    Image as ImageIcon,
    ImagePlus,
    Link2,
    Layers3,
} from "lucide-react";
import toast from "react-hot-toast";

import categoryService from "../../services/categoryService";
import { getImageUrl } from "../../../utils/imageUrl";

const ViewCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const loadCategory = async () => {
            try {
                setLoading(true);

                const response =
                    await categoryService.getCategory(id);

                const data =
                    response?.data?.data ||
                    response?.data?.category ||
                    response?.data;

                if (mounted) {
                    setCategory(data);
                }
            } catch (error) {
                console.error(
                    "VIEW CATEGORY ERROR:",
                    error
                );

                toast.error(
                    error?.response?.data?.message ||
                        "Unable to load category."
                );

                if (mounted) {
                    navigate("/admin/categories");
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        if (id) {
            loadCategory();
        }

        return () => {
            mounted = false;
        };
    }, [id, navigate]);

    if (loading) {
        return <CategoryLoading />;
    }

    if (!category) {
        return null;
    }

    const imageUrl = getImageUrl(category.image);
    const featuredImageUrl = getImageUrl(
        category.featuredImage
    );

    return (
        <div className="min-h-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl space-y-6">

                {/* =====================================================
                    HEADER
                ====================================================== */}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/admin/categories"
                                )
                            }
                            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Categories
                        </button>

                        <div className="mt-4">
                            <p className="text-sm font-medium text-blue-600">
                                Category Details
                            </p>

                            <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                {category.name}
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                View and manage category information.
                            </p>
                        </div>
                    </div>

                    <Link
                        to={`/admin/categories/edit/${category.id}`}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
                    >
                        <Edit className="h-4 w-4" />
                        Edit Category
                    </Link>
                </div>

                {/* =====================================================
                    IMAGE GALLERY
                ====================================================== */}

                <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

                    <div className="border-b border-gray-100 px-6 py-5 sm:px-7">
                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                <ImageIcon className="h-5 w-5" />
                            </div>

                            <div>
                                <h2 className="font-semibold text-gray-900">
                                    Category Images
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Main and featured images for this category.
                                </p>
                            </div>

                        </div>
                    </div>

                    <div className="grid gap-5 p-5 md:grid-cols-2 sm:p-7">

                        {/* Main Image */}

                        <CategoryImageCard
                            title="Category Image"
                            description="Primary image used for the category."
                            image={imageUrl}
                            alt={category.name}
                            icon={
                                <ImageIcon className="h-5 w-5" />
                            }
                        />

                        {/* Featured Image */}

                        <CategoryImageCard
                            title="Featured Image"
                            description="Image used when this category is featured."
                            image={featuredImageUrl}
                            alt={`${category.name} featured`}
                            icon={
                                <ImagePlus className="h-5 w-5" />
                            }
                        />

                    </div>
                </section>

                {/* =====================================================
                    CATEGORY INFORMATION
                ====================================================== */}

                <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

                    <div className="border-b border-gray-100 px-6 py-5 sm:px-7">
                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                                <Layers3 className="h-5 w-5" />
                            </div>

                            <div>
                                <h2 className="font-semibold text-gray-900">
                                    Category Information
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Basic details and category metadata.
                                </p>
                            </div>

                        </div>
                    </div>

                    <div className="p-6 sm:p-7">

                        {/* Name / Slug */}

                        <div className="grid gap-5 sm:grid-cols-2">

                            <InfoCard
                                icon={
                                    <FileText className="h-4 w-4" />
                                }
                                label="Category Name"
                                value={
                                    category.name || "—"
                                }
                            />

                            <InfoCard
                                icon={
                                    <Link2 className="h-4 w-4" />
                                }
                                label="Slug"
                                value={
                                    category.slug
                                        ? `/${category.slug}`
                                        : "—"
                                }
                            />

                        </div>

                        {/* Description */}

                        <div className="mt-5 rounded-2xl border border-gray-100 bg-gray-50 p-5">

                            <p className="text-sm font-semibold text-gray-700">
                                Description
                            </p>

                            <p className="mt-2 whitespace-pre-line text-sm leading-7 text-gray-600">
                                {category.description ||
                                    "No description has been added to this category."}
                            </p>

                        </div>

                        {/* Created / Updated */}

                        <div className="mt-5 grid gap-5 sm:grid-cols-2">

                            <InfoCard
                                icon={
                                    <Calendar className="h-4 w-4" />
                                }
                                label="Created"
                                value={formatDate(
                                    category.createdAt
                                )}
                            />

                            <InfoCard
                                icon={
                                    <Calendar className="h-4 w-4" />
                                }
                                label="Last Updated"
                                value={formatDate(
                                    category.updatedAt
                                )}
                            />

                        </div>
                    </div>
                </section>

                {/* =====================================================
                    IMAGE PATH DEBUG / DETAILS
                ====================================================== */}

                <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
                            <ImageIcon className="h-5 w-5" />
                        </div>

                        <div>
                            <h2 className="font-semibold text-gray-900">
                                Image Information
                            </h2>

                            <p className="text-sm text-gray-500">
                                Uploaded image paths.
                            </p>
                        </div>

                    </div>

                    <div className="mt-5 space-y-4">

                        <ImagePath
                            label="Category Image"
                            value={category.image}
                        />

                        <ImagePath
                            label="Featured Image"
                            value={
                                category.featuredImage
                            }
                        />

                    </div>
                </section>

            </div>
        </div>
    );
};

/*
|--------------------------------------------------------------------------
| Category Image Card
|--------------------------------------------------------------------------
*/

const CategoryImageCard = ({
    title,
    description,
    image,
    alt,
    icon,
}) => {
    const [failed, setFailed] = useState(false);

    const showImage = image && !failed;

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">

            <div className="border-b border-gray-200 bg-white px-4 py-4">

                <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        {icon}
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                            {title}
                        </h3>

                        <p className="text-xs text-gray-500">
                            {description}
                        </p>
                    </div>

                </div>

            </div>

            <div className="aspect-[1200/630] overflow-hidden bg-gray-100">

                {showImage ? (
                    <img
                        src={image}
                        alt={alt}
                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                        onError={() => {
                            console.error(
                                "Failed to load image:",
                                image
                            );

                            setFailed(true);
                        }}
                    />
                ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center text-gray-400">

                        <ImageIcon className="h-12 w-12" />

                        <p className="mt-3 text-sm font-medium">
                            {image
                                ? "Image could not be loaded"
                                : "No image uploaded"}
                        </p>

                    </div>
                )}

            </div>
        </div>
    );
};

/*
|--------------------------------------------------------------------------
| Info Card
|--------------------------------------------------------------------------
*/

const InfoCard = ({
    icon,
    label,
    value,
}) => (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">

        <div className="flex items-center gap-2 text-sm text-gray-500">
            {icon}

            <span>{label}</span>
        </div>

        <p className="mt-2 break-words text-sm font-semibold text-gray-900">
            {value}
        </p>

    </div>
);

/*
|--------------------------------------------------------------------------
| Image Path
|--------------------------------------------------------------------------
*/

const ImagePath = ({
    label,
    value,
}) => (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">

        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {label}
        </p>

        <p className="mt-2 break-all font-mono text-xs text-gray-600">
            {value || "No image uploaded"}
        </p>

    </div>
);

/*
|--------------------------------------------------------------------------
| Date
|--------------------------------------------------------------------------
*/

const formatDate = (date) => {
    if (!date) {
        return "—";
    }

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
        return "—";
    }

    return parsed.toLocaleDateString(
        undefined,
        {
            year: "numeric",
            month: "long",
            day: "numeric",
        }
    );
};

/*
|--------------------------------------------------------------------------
| Loading
|--------------------------------------------------------------------------
*/

const CategoryLoading = () => (
    <div className="min-h-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-6xl space-y-6">

            <div className="h-8 w-48 animate-pulse rounded-lg bg-gray-200" />

            <div className="overflow-hidden rounded-3xl bg-white shadow-sm">

                <div className="h-72 animate-pulse bg-gray-200" />

                <div className="space-y-4 p-7">

                    <div className="h-8 w-64 animate-pulse rounded-lg bg-gray-200" />

                    <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />

                    <div className="h-20 w-full animate-pulse rounded-xl bg-gray-100" />

                </div>

            </div>
        </div>
    </div>
);

export default ViewCategory;