import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { contactSchema } from "../src/validators/contact.validator.js";
import {
    updateUserSchema,
    userQuerySchema,
} from "../src/models/users/user.validation.js";
import categoryMapper from "../src/models/category/category.mapper.js";
import {
    createTagValidation,
    tagListValidation,
} from "../src/models/tag/tag.validation.js";
import {
    createBlogSchema,
} from "../src/models/blogs/blog.validation.js";
import validate from "../src/middleware/validate.middleware.js";
import {
    commentSchema,
    commentUpdateSchema,
} from "../src/validators/comment.validator.js";
import commentMapper from "../src/models/comment/comment.mapper.js";
import { buildBlogWhere } from "../src/models/blogs/blog.filters.js";

const testDirectory = path.dirname(fileURLToPath(import.meta.url));
const backendDirectory = path.resolve(testDirectory, "..");
const frontendDirectory = path.resolve(backendDirectory, "../frontend");

const read = (...parts) => fs.readFileSync(path.join(...parts), "utf8");

test("contact contract rejects invalid input before persistence", () => {
    const result = contactSchema.safeParse({ name: "A", email: "invalid" });

    assert.equal(result.success, false);
});

test("contact route mounts the validated POST endpoint", () => {
    const routeSource = read(
        backendDirectory,
        "src/models/contact/contact.routes.js"
    );
    const apiSource = read(backendDirectory, "src/routes/index.js");

    assert.match(routeSource, /router\.post\("\/", validate\(contactSchema\)/);
    assert.match(apiSource, /router\.use\("\/contact", contactRoutes\)/);
});

test("blog, tag, and comment clients use implemented backend paths", () => {
    const blog = read(frontendDirectory, "src/features/blog/services/blogService.js");
    const tag = read(frontendDirectory, "src/features/tag/services/tagService.js");
    const comment = read(frontendDirectory, "src/features/comment/services/commentService.js");
    const commentRoutes = read(
        backendDirectory,
        "src/models/comment/comment.routes.js"
    );

    assert.match(blog, /\$\{BASE_URL\}\/id\/\$\{id\}/);
    assert.match(blog, /\$\{BASE_URL\}\/admin\/all/);
    assert.match(tag, /api\.post\(BASE_URL, data\)/);
    assert.match(tag, /api\.patch\(`\$\{BASE_URL\}\/\$\{id\}`/);
    assert.match(comment, /"\/comments\/admin\/all"/);
    assert.match(comment, /`\/comments\/replies\/\$\{replyId\}`/);
    assert.match(comment, /"\/comments\/admin\/bulk\/approve"/);
    assert.match(commentRoutes, /"\/admin\/bulk\/:action"/);
});

test("blog inline image uploads use the existing optimized-image pipeline", () => {
    const routes = read(
        backendDirectory,
        "src/models/blogs/blog.routes.js"
    );
    const service = read(
        backendDirectory,
        "src/models/blogs/blog.service.js"
    );
    const editor = read(
        frontendDirectory,
        "src/features/blog/components/BlogEditor.jsx"
    );
    const blog = read(
        frontendDirectory,
        "src/features/blog/services/blogService.js"
    );

    assert.match(routes, /"\/inline-images"/);
    assert.match(routes, /upload\.array\("images", 20\)/);
    assert.match(service, /optimizeImage\(file, "blogs\/inline", \{/);
    assert.match(service, /preserveOriginal: false/);
    assert.match(editor, /multiple/);
    assert.match(editor, /uploadInlineImages/);
    assert.match(editor, /insertContent\(content\)/);
    assert.match(blog, /BASE_URL\}\/inline-images/);
});

test("admin users contract preserves list filters and editable profile fields", () => {
    const query = userQuerySchema.parse({
        page: "2",
        limit: "10",
        search: "Ada",
        ordering: "-createdAt",
    });
    const update = updateUserSchema.parse({
        gender: "FEMALE",
        facebookUsername: "ada.lovelace",
    });

    assert.equal(query.page, 2);
    assert.equal(query.limit, 10);
    assert.equal(query.search, "Ada");
    assert.equal(query.ordering, "-createdAt");
    assert.deepEqual(update, {
        gender: "FEMALE",
        facebookUsername: "ada.lovelace",
    });
});

test("category contract preserves featured images across API responses", () => {
    const category = categoryMapper.toResponse({
        id: "category-1",
        name: "Technology",
        slug: "technology",
        description: null,
        image: "/uploads/categories/image.webp",
        featuredImage: "/uploads/categories/featured.webp",
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z",
    });

    assert.equal(
        category.featuredImage,
        "/uploads/categories/featured.webp"
    );

    const repository = read(
        backendDirectory,
        "src/models/category/category.repository.js"
    );
    const editPage = read(
        frontendDirectory,
        "src/features/category/pages/admin/EditCategory.jsx"
    );

    assert.match(repository, /featuredImage: true/);
    assert.match(editPage, /formData\.append\(\s*"featuredImage"/s);
});

test("tag contract validates supported CRUD fields and list pagination", () => {
    const create = createTagValidation.validate({
        name: "JavaScript",
        slug: "javascript",
        description: "Programming language",
    });
    const list = tagListValidation.validate({
        page: "2",
        limit: "10",
        search: "script",
    });
    const tagManagement = read(
        frontendDirectory,
        "src/features/tag/pages/admin/TagManagement.jsx"
    );
    const tagForm = read(
        frontendDirectory,
        "src/features/tag/components/TagForm.jsx"
    );

    assert.equal(create.error, undefined);
    assert.equal(list.error, undefined);
    assert.equal(list.value.page, 2);
    assert.equal(list.value.limit, 10);
    assert.match(tagManagement, /data\.items/);
    assert.match(tagManagement, /pageData\.totalPages/);
    assert.match(tagForm, /name: values\.name/);
    assert.match(tagForm, /description: values\.description/);
});

test("tag routes can execute Joi validation through the shared middleware", () => {
    const request = {
        body: {
            name: "JavaScript",
            slug: "javascript",
            description: "",
        },
    };
    let nextCalled = false;

    const middleware = validate(createTagValidation);

    middleware(
        request,
        {
            status() {
                throw new Error("Expected valid tag data.");
            },
        },
        () => {
            nextCalled = true;
        }
    );

    assert.equal(nextCalled, true);
    assert.equal(request.validatedData.name, "JavaScript");
});

test("blog CRUD preserves multipart fields, tag IDs, and validated controller input", () => {
    const result = createBlogSchema.validate({
        title: "A valid blog title",
        slug: "a-valid-blog-title",
        excerpt: "A useful excerpt",
        content: "A".repeat(100),
        categoryId: "category-1",
        tagIds: "tag-1",
        status: "DRAFT",
    });
    const form = read(
        frontendDirectory,
        "src/features/blog/components/BlogForm.jsx"
    );
    const controller = read(
        backendDirectory,
        "src/models/blogs/blog.controller.js"
    );
    const management = read(
        frontendDirectory,
        "src/features/blog/pages/admin/BlogManagement.jsx"
    );

    assert.equal(result.error, undefined);
    assert.deepEqual(result.value.tagIds, ["tag-1"]);
    assert.match(form, /featuredImage/);
    assert.match(form, /categoryId/);
    assert.match(form, /tagIds/);
    assert.match(controller, /req\.validatedData \|\| req\.body/);
    assert.match(management, /getAdminBlogs/);
    assert.match(management, /blogResponse\.data\.pagination/);
});

test("blog create preserves supplied slugs for English and Unicode titles", () => {
    const service = read(
        backendDirectory,
        "src/models/blogs/blog.service.js"
    );
    const cases = [
        {
            title: "Nepal has a small thing",
            slug: "nepal-has-a-small-thing",
        },
        {
            title: "काष्ठमण्डपमा नयाँ मूर्ति हटाउनु नपर्ने सर्वोच्चको फैसला",
            slug: "kathmandu-new-murti",
        },
    ];

    for (const input of cases) {
        const result = createBlogSchema.validate({
            ...input,
            content: "A valid blog body",
            categoryId: "category-1",
        });

        assert.equal(result.error, undefined);
        assert.equal(result.value.slug, input.slug);
    }

    assert.match(
        service,
        /const slug\s*=\s*data\.slug \|\| generateSlug\(data\.title\)/s
    );
    assert.match(service, /blogRepository\.findBySlug\(slug\)/);
    assert.match(
        service,
        /STATUS_CODES\.CONFLICT[\s\S]*MESSAGES\.BLOG_SLUG_EXISTS/
    );
});

test("published blog detail and list contracts use current response and repository shapes", () => {
    const service = read(
        backendDirectory,
        "src/models/blogs/blog.service.js"
    );
    const repository = read(
        backendDirectory,
        "src/models/blogs/blog.repository.js"
    );
    const hook = read(
        frontendDirectory,
        "src/features/blog/hooks/useBlog.js"
    );
    const details = read(
        frontendDirectory,
        "src/features/blog/pages/public/BlogDetails.jsx"
    );

    assert.match(service, /blogRepository\.count\(\{[\s\S]*status:\s*BLOG_STATUS\.PUBLISHED/);
    assert.doesNotMatch(service, /blogRepository\.countPublished/);
    assert.match(repository, /where: buildBlogWhere\(\{[\s\S]*status:\s*BLOG_STATUS\.PUBLISHED/);
    assert.match(hook, /response\.data\?\.data \?\?/);
    assert.match(details, /blog\.featuredImage/);
    assert.match(details, /blog\.author/);
    assert.match(details, /blog\.publishedAt/);
    assert.match(details, /blog\.readingTime/);
    assert.match(details, /blog\.viewCount/);
});

test("admin blog edit waits for and unwraps the blog detail response", () => {
    const editPage = read(
        frontendDirectory,
        "src/features/blog/pages/admin/EditAnyBlog.jsx"
    );
    const hook = read(
        frontendDirectory,
        "src/features/blog/hooks/useBlog.js"
    );

    assert.match(editPage, /if \(!blog\)/);
    assert.match(hook, /const blogData\s*=\s*\n\s*response\.data\?\.data \?\?/);
});

test("admin blog list translates API filters into one valid Prisma where contract", () => {
    const emptyFilters = buildBlogWhere({
        search: "",
        status: "",
        categoryId: "",
        authorId: undefined,
    });
    const filtered = buildBlogWhere({
        search: "  Prisma  ",
        status: "PUBLISHED",
        categoryId: "category-1",
        authorId: "author-1",
    });
    const repository = read(
        backendDirectory,
        "src/models/blogs/blog.repository.js"
    );

    assert.deepEqual(emptyFilters, {});
    assert.deepEqual(filtered, {
        OR: [
            {
                title: {
                    contains: "Prisma",
                    mode: "insensitive",
                },
            },
            {
                excerpt: {
                    contains: "Prisma",
                    mode: "insensitive",
                },
            },
        ],
        status: "PUBLISHED",
        categoryId: "category-1",
        authorId: "author-1",
    });
    assert.match(repository, /where: buildBlogWhere\(\{/);
    assert.match(repository, /where: buildBlogWhere\(filters\)/);
});

test("my blogs reuses the repository list and count contracts", () => {
    const service = read(
        backendDirectory,
        "src/models/blogs/blog.service.js"
    );
    const repository = read(
        backendDirectory,
        "src/models/blogs/blog.repository.js"
    );

    assert.match(service, /blogRepository\.findAll\(\{[\s\S]*authorId:/);
    assert.match(service, /blogRepository\.count\(\{[\s\S]*authorId:/);
    assert.doesNotMatch(service, /blogRepository\.findAuthorBlogs/);
    assert.doesNotMatch(service, /blogRepository\.countAuthorBlogs/);
    assert.match(repository, /async findAll\(\{/);
    assert.match(repository, /async count\(filters = \{\}\)/);
});

test("blog featured image contract stores the optimized path for create and update", () => {
    const service = read(
        backendDirectory,
        "src/models/blogs/blog.service.js"
    );

    assert.match(
        service,
        /featuredImage\s*=\s*imagePaths\?\.optimizedPath\s*\n\s*\?\s*`\/uploads\/\$\{imagePaths\.optimizedPath\}`/
    );
    assert.match(
        service,
        /newFeaturedImage\s*=\s*uploadedNewImage\?\.optimizedPath\s*\n\s*\?\s*`\/uploads\/\$\{uploadedNewImage\.optimizedPath\}`/
    );
    assert.match(
        service,
        /deleteUploadedFile\(\s*uploadedNewImage\.optimizedPath/s
    );
    assert.doesNotMatch(
        service,
        /featuredImage\s*=\s*await optimizeImage\(/s
    );
    assert.doesNotMatch(
        service,
        /newFeaturedImage\s*=\s*uploadedNewImage;\s*$/m
    );
});

test("comment contract uses validated CRUD input and the registered bulk endpoint", () => {
    const create = commentSchema.safeParse({
        blogId: "blog-1",
        content: "A valid comment",
    });
    const update = commentUpdateSchema.safeParse({
        content: "An edited comment",
    });
    const routes = read(
        backendDirectory,
        "src/models/comment/comment.routes.js"
    );
    const controller = read(
        backendDirectory,
        "src/models/comment/comment.controller.js"
    );
    const service = read(
        frontendDirectory,
        "src/features/comment/services/commentService.js"
    );
    const management = read(
        frontendDirectory,
        "src/features/comment/pages/admin/CommentManagement.jsx"
    );
    const spam = read(
        frontendDirectory,
        "src/features/comment/pages/admin/SpamComments.jsx"
    );
    const reported = read(
        frontendDirectory,
        "src/features/comment/pages/admin/ReportedComments.jsx"
    );

    assert.equal(create.success, true);
    assert.equal(update.success, true);
    assert.match(routes, /validate\(commentSchema\)/);
    assert.match(routes, /validate\(commentUpdateSchema\)/);
    assert.match(controller, /req\.validatedData \|\| req\.body/);
    assert.match(service, /api\.post\(\s*"\/comments\/admin\/bulk\/approve"/s);
    assert.match(service, /ids: commentIds/);
    assert.match(management, /hasNextPage/);
    assert.match(spam, /response\.data\.data/);
    assert.match(spam, /response\.data\.pagination/);
    assert.match(reported, /response\.data\.data/);
    assert.match(reported, /response\.data\.pagination/);
});

test("dashboard contract preserves active response fields and registered user routes", () => {
    const adminDashboard = read(
        frontendDirectory,
        "src/features/admin/components/dashboard/RecentBlogs.jsx"
    );
    const recentUsers = read(
        frontendDirectory,
        "src/features/admin/components/dashboard/RecentUsers.jsx"
    );
    const userDashboard = read(
        frontendDirectory,
        "src/features/dashboard/pages/UserDashboard.jsx"
    );
    const recentBlogs = read(
        frontendDirectory,
        "src/features/dashboard/components/RecentBlogs.jsx"
    );
    const dashboardRoutes = read(
        backendDirectory,
        "src/models/dashboard/dashboard.routes.js"
    );

    assert.match(adminDashboard, /blog\.category\?\.name/);
    assert.match(adminDashboard, /blog\.createdAt/);
    assert.match(recentUsers, /user\.firstName/);
    assert.match(userDashboard, /\/dashboard\/blogs/);
    assert.match(recentBlogs, /\/dashboard\/blogs\/create/);
    assert.match(dashboardRoutes, /"\/admin"/);
    assert.match(dashboardRoutes, /"\/user"/);
});

test("general settings contract adapts the active form to backend field names", () => {
    const settingsPage = read(
        frontendDirectory,
        "src/features/settings/pages/GeneralSettings.jsx"
    );
    const settingsRoutes = read(
        backendDirectory,
        "src/models/settings/settings.routes.js"
    );
    const settingsForm = read(
        frontendDirectory,
        "src/features/settings/components/GeneralSettingsForm.jsx"
    );
    const settingsSchema = read(
        frontendDirectory,
        "src/features/settings/schemas/settingsSchema.js"
    );

    assert.match(settingsPage, /site_name: "siteName"/);
    assert.match(settingsPage, /site_description: "siteDescription"/);
    assert.doesNotMatch(settingsPage, /site_tagline: "siteDescription"/);
    assert.doesNotMatch(settingsPage, /homepage_description: "siteDescription"/);
    assert.match(settingsPage, /formData\.set\(/);
    assert.match(settingsForm, /settingsSchemas\.generalSettingsSchema/);
    assert.match(settingsForm, /name="site_description"/);
    assert.doesNotMatch(settingsForm, /default_language|timezone|date_format|time_format|homepage_title/);
    assert.match(settingsSchema, /site_description/);
    assert.match(settingsRoutes, /router\.put\(/);
    assert.match(settingsRoutes, /authorize\("ADMIN"\)/);
});

test("comment responses preserve the normalized shape and nested replies", () => {
    const response = commentMapper.toResponse({
        id: "comment-1",
        content: "Parent comment",
        status: "APPROVED",
        blogId: "blog-1",
        userId: "user-1",
        parentId: null,
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z",
        user: {
            id: "user-1",
            firstName: "Ada",
            lastName: "Lovelace",
            email: "ada@example.com",
        },
        blog: {
            id: "blog-1",
            title: "A Blog",
            slug: "a-blog",
        },
        replies: [{
            id: "reply-1",
            content: "Reply",
            status: "APPROVED",
            blogId: "blog-1",
            userId: "user-2",
            parentId: "comment-1",
            createdAt: "2026-01-02T00:00:00.000Z",
            updatedAt: "2026-01-02T00:00:00.000Z",
            user: {
                id: "user-2",
                firstName: "Grace",
                lastName: "Hopper",
                email: "grace@example.com",
            },
            blog: null,
        }],
    });

    assert.equal(response.createdAt, "2026-01-01T00:00:00.000Z");
    assert.equal(response.user.firstName, "Ada");
    assert.equal(response.blog.slug, "a-blog");
    assert.equal(response.replies[0].id, "reply-1");
    assert.equal(response.replies[0].user.email, "grace@example.com");
});

test("comment detail authorization remains admin-or-owner only", () => {
    const service = read(
        backendDirectory,
        "src/models/comment/comment.service.js"
    );
    const controller = read(
        backendDirectory,
        "src/models/comment/comment.controller.js"
    );
    const routes = read(
        backendDirectory,
        "src/models/comment/comment.routes.js"
    );

    assert.match(service, /user\.role !== ROLES\.ADMIN/);
    assert.match(service, /comment\.userId !== user\.id/);
    assert.match(controller, /commentService\.getById\(id, req\.user\)/);
    assert.match(routes, /router\.get\(\s*"\/:id",\s*authenticate/s);
});
