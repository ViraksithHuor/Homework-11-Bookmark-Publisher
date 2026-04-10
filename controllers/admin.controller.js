const { bookmarks } = require('../data/mock');

exports.getLogin = (req, res) => {
  res.render('admin/login', {
    layout: 'main',
    title: 'Admin Login',
  });
};

exports.postLogin = (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'password123') {
    req.session.isAdmin = true;
    return res.redirect('/');
  }

  return res.status(401).render('admin/login', {
    layout: 'main',
    title: 'Admin Login',
    error: 'Invalid credentials',
  });
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};

exports.getDashboard = (req, res) => {
  const activeCount = bookmarks.filter((b) => !b.isArchived).length;
  const archivedCount = bookmarks.filter((b) => b.isArchived).length;

  res.render('admin/dashboard', {
    layout: 'main',
    title: 'Admin Dashboard',
    totalCount: bookmarks.length,
    activeCount,
    archivedCount,
  });
};

exports.getBookmarks = (req, res) => {
  res.render('admin/bookmarks', {
    layout: 'main',
    title: 'Manage Bookmarks',
    bookmarks,
  });
};

exports.getNewBookmark = (req, res) => {
  res.render('admin/new-bookmark', {
    layout: 'main',
    title: 'New Bookmark',
  });
};

exports.postNewBookmark = (req, res) => {
  const { title, slug, url, description, tags } = req.body;

  const now = new Date().toISOString();

  bookmarks.push({
    id: bookmarks.length + 1,
    title,
    slug,
    url,
    description: description || '',
    tags: tags
      ? tags.split(',').map((tag) => tag.trim()).filter(Boolean)
      : [],
    isArchived: false,
    createdAt: now,
    updatedAt: now,
  });

  res.redirect('/bookmarks');
};

exports.getEditBookmark = (req, res) => {
  const bookmark = bookmarks.find((b) => b.slug === req.params.slug);

  if (!bookmark) {
    return res.status(404).render('404', { title: 'Bookmark Not Found' });
  }

  res.render('admin/edit-bookmark', {
    layout: 'main',
    title: 'Edit Bookmark',
    bookmark: {
      ...bookmark,
      tags: bookmark.tags.join(', ')
    }
  });
};

exports.postEditBookmark = (req, res) => {
  const bookmark = bookmarks.find((b) => b.slug === req.params.slug);

  if (!bookmark) {
    return res.status(404).render('404', { title: 'Bookmark Not Found' });
  }

  const { title, slug, url, description, tags } = req.body;

  bookmark.title = title;
  bookmark.slug = slug;
  bookmark.url = url;
  bookmark.description = description || '';
  bookmark.tags = tags
    ? tags.split(',').map((tag) => tag.trim()).filter(Boolean)
    : [];
  bookmark.updatedAt = new Date().toISOString();

  res.redirect('/bookmarks');
};

exports.deleteBookmark = (req, res) => {
  const index = bookmarks.findIndex((b) => b.slug === req.params.slug);

  if (index === -1) {
    return res.status(404).render('404', { title: 'Bookmark Not Found' });
  }

  bookmarks.splice(index, 1);
  res.redirect('/bookmarks');
};

exports.archiveBookmark = (req, res) => {
  const bookmark = bookmarks.find((b) => b.slug === req.params.slug);

  if (!bookmark) {
    return res.status(404).render('404', { title: 'Bookmark Not Found' });
  }

  bookmark.isArchived = true;
  bookmark.updatedAt = new Date().toISOString();

  res.redirect('/bookmarks');
};

exports.unarchiveBookmark = (req, res) => {
  const bookmark = bookmarks.find((b) => b.slug === req.params.slug);

  if (!bookmark) {
    return res.status(404).render('404', { title: 'Bookmark Not Found' });
  }

  bookmark.isArchived = false;
  bookmark.updatedAt = new Date().toISOString();

  res.redirect('/bookmarks');
};