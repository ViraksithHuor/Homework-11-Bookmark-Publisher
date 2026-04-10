const { bookmarks } = require('../data/mock');

module.exports = (req, res, next) => {
  const { title, slug, url } = req.body;
  const currentSlug = req.params.slug;

  const errors = [];

  if (!title || !title.trim()) {
    errors.push('Title is required.');
  }

  if (!slug || !slug.trim()) {
    errors.push('Slug is required.');
  }

  if (!url || !url.trim()) {
    errors.push('URL is required.');
  } else if (!/^https?:\/\//i.test(url.trim())) {
    errors.push('URL must start with http:// or https://');
  }

  const duplicateUrl = bookmarks.find(
    (bookmark) =>
      bookmark.url.toLowerCase() === url.trim().toLowerCase() &&
      bookmark.slug !== currentSlug
  );

  if (duplicateUrl) {
    errors.push('Duplicate URLs are not allowed.');
  }

  const duplicateSlug = bookmarks.find(
    (bookmark) =>
      bookmark.slug.toLowerCase() === slug.trim().toLowerCase() &&
      bookmark.slug !== currentSlug
  );

  if (duplicateSlug) {
    errors.push('Slug must be unique.');
  }

  if (errors.length > 0) {
    return res.status(400).render(
      currentSlug ? 'admin/edit-bookmark' : 'admin/new-bookmark',
      {
        layout: 'main',
        title: currentSlug ? 'Edit Bookmark' : 'New Bookmark',
        errors,
        bookmark: req.body,
        tags: req.body.tags || '',
      }
    );
  }

  req.body.title = title.trim();
  req.body.slug = slug.trim();
  req.body.url = url.trim();

  next();
};