import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useBlog } from '../../../hooks/useBlog';
import { categoryService, tagService } from '../../../api';
import RichTextEditor from '../../blog/components/RichTextEditor';
import Select from 'react-select';
import { toast } from 'react-hot-toast';
import './BlogForm.css';

const BlogCreate = () => {
    const navigate = useNavigate();
    const { createBlog } = useBlog();
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');
    const [featuredImage, setFeaturedImage] = useState(null);
    const [additionalImages, setAdditionalImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    // Fetch categories and tags
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesRes, tagsRes] = await Promise.all([
                    categoryService.getCategories(),
                    tagService.getTags(),
                ]);
                setCategories(categoriesRes.results || []);
                setTags(tagsRes.results || []);
            } catch (error) {
                toast.error('Failed to load categories and tags');
            }
        };
        fetchData();
    }, []);

    const handleFeaturedImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Image size must be less than 5MB');
                return;
            }
            setFeaturedImage(file);
        }
    };

    const handleAdditionalImagesChange = (e) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter(file => file.size <= 5 * 1024 * 1024);
        if (validFiles.length !== files.length) {
            toast.error('Some images exceeded 5MB limit');
        }
        setAdditionalImages(prev => [...prev, ...validFiles]);
    };

    const removeImage = (index) => {
        setAdditionalImages(prev => prev.filter((_, i) => i !== index));
    };

    const onSubmit = async (data) => {
        setLoading(true);
        
        try {
            const formData = {
                title: data.title,
                content: content,
                status: data.status || 'draft',
                category_id: selectedCategory?.value,
                tag_ids: selectedTags.map(tag => tag.value),
                featured_image: featuredImage,
                images: additionalImages.map(file => ({
                    image: file,
                    caption: '',
                    order: 0,
                })),
                is_featured: data.is_featured || false,
                allow_comments: data.allow_comments !== false,
                meta_title: data.meta_title || data.title,
                meta_description: data.meta_description || '',
                meta_keywords: data.meta_keywords || '',
                scheduled_at: data.scheduled_at || null,
            };

            const result = await createBlog(formData);
            toast.success('Blog created successfully!');
            navigate(`/blog/${result.slug}`);
        } catch (error) {
            console.error('Error creating blog:', error);
        } finally {
            setLoading(false);
        }
    };

    const categoryOptions = categories.map(cat => ({
        value: cat.id,
        label: cat.name,
    }));

    const tagOptions = tags.map(tag => ({
        value: tag.id,
        label: tag.name,
    }));

    return (
        <div className="blog-form-container">
            <h1>Create New Blog Post</h1>
            
            <form onSubmit={handleSubmit(onSubmit)} className="blog-form">
                {/* Title */}
                <div className="form-group">
                    <label htmlFor="title">Title *</label>
                    <input
                        id="title"
                        type="text"
                        {...register('title', { required: 'Title is required' })}
                        className={`form-input ${errors.title ? 'error' : ''}`}
                        placeholder="Enter blog title"
                    />
                    {errors.title && (
                        <span className="error-message">{errors.title.message}</span>
                    )}
                </div>

                {/* Content */}
                <div className="form-group">
                    <label>Content *</label>
                    <RichTextEditor
                        value={content}
                        onChange={setContent}
                        placeholder="Write your blog content here..."
                    />
                    {!content && (
                        <span className="error-message">Content is required</span>
                    )}
                </div>

                {/* Featured Image */}
                <div className="form-group">
                    <label>Featured Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFeaturedImageChange}
                        className="file-input"
                    />
                    {featuredImage && (
                        <div className="image-preview">
                            <img 
                                src={URL.createObjectURL(featuredImage)} 
                                alt="Featured"
                            />
                            <button 
                                type="button"
                                onClick={() => setFeaturedImage(null)}
                                className="remove-image"
                            >
                                ×
                            </button>
                        </div>
                    )}
                </div>

                {/* Additional Images */}
                <div className="form-group">
                    <label>Additional Images</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleAdditionalImagesChange}
                        className="file-input"
                    />
                    <div className="images-grid">
                        {additionalImages.map((file, index) => (
                            <div key={index} className="image-preview">
                                <img 
                                    src={URL.createObjectURL(file)} 
                                    alt={`Additional ${index + 1}`}
                                />
                                <button 
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="remove-image"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Category */}
                <div className="form-group">
                    <label>Category</label>
                    <Select
                        options={categoryOptions}
                        value={selectedCategory}
                        onChange={setSelectedCategory}
                        placeholder="Select a category..."
                        isClearable
                        className="react-select"
                    />
                </div>

                {/* Tags */}
                <div className="form-group">
                    <label>Tags</label>
                    <Select
                        options={tagOptions}
                        value={selectedTags}
                        onChange={setSelectedTags}
                        placeholder="Select tags..."
                        isMulti
                        className="react-select"
                    />
                </div>

                {/* Status */}
                <div className="form-group">
                    <label>Status</label>
                    <select {...register('status')} className="form-select">
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="scheduled">Scheduled</option>
                    </select>
                </div>

                {/* Scheduled Date */}
                <div className="form-group">
                    <label>Scheduled Date</label>
                    <input
                        type="datetime-local"
                        {...register('scheduled_at')}
                        className="form-input"
                    />
                </div>

                {/* Featured */}
                <div className="form-group checkbox">
                    <label>
                        <input
                            type="checkbox"
                            {...register('is_featured')}
                        />
                        Feature this post
                    </label>
                </div>

                {/* Allow Comments */}
                <div className="form-group checkbox">
                    <label>
                        <input
                            type="checkbox"
                            {...register('allow_comments')}
                            defaultChecked
                        />
                        Allow comments
                    </label>
                </div>

                {/* Meta Tags */}
                <div className="form-group">
                    <label>Meta Title</label>
                    <input
                        type="text"
                        {...register('meta_title')}
                        className="form-input"
                        placeholder="SEO title"
                    />
                </div>

                <div className="form-group">
                    <label>Meta Description</label>
                    <textarea
                        {...register('meta_description')}
                        className="form-input"
                        rows={2}
                        placeholder="SEO description"
                    />
                </div>

                <div className="form-group">
                    <label>Meta Keywords</label>
                    <input
                        type="text"
                        {...register('meta_keywords')}
                        className="form-input"
                        placeholder="comma, separated, keywords"
                    />
                </div>

                <div className="form-actions">
                    <button 
                        type="button"
                        onClick={() => navigate('/dashboard')}
                        className="btn-secondary"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        className="btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Create Blog'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BlogCreate;
