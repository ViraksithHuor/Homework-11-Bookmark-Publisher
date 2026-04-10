const { bookmarks } = require('../data/mock');

exports.getHome = (req, res) => {
  const activeBookmarks = bookmarks.filter((bookmark) => !bookmark.isArchived);

  res.render('home', {
    title: 'Home',
    bookmarks: activeBookmarks.slice(0, 5),
  });
};

exports.getBookmarks = (req, res) => {
  const activeBookmarks = bookmarks.filter((bookmark) => !bookmark.isArchived);

  res.render('bookmarks/index', {
    title: 'Bookmarks',
    bookmarks: activeBookmarks,
  });
};

exports.getBookmarkDetail = (req, res) => {
  const { slug } = req.params;

  const bookmark = bookmarks.find(
    (item) => item.slug === slug && !item.isArchived
  );

  if (!bookmark) {
    return res.status(404).render('404', {
      title: 'Bookmark Not Found',
    });
  }

  res.render('bookmarks/detail', {
    title: bookmark.title,
    bookmark,
  });
};

exports.getBookmarksByTag = (req, res) => {
  const { tagSlug } = req.params;

  const matchedBookmarks = bookmarks.filter(
    (bookmark) =>
      !bookmark.isArchived &&
      bookmark.tags.some((tag) => tag.toLowerCase() === tagSlug.toLowerCase())
  );

  res.render('bookmarks/tag', {
    title: `Tag: ${tagSlug}`,
    tag: tagSlug,
    bookmarks: matchedBookmarks,
  });
};

exports.searchBookmarks = (req, res) => {
  const q = (req.query.q || '').trim().toLowerCase();

  const matchedBookmarks = bookmarks.filter(
    (bookmark) =>
      !bookmark.isArchived &&
      bookmark.title.toLowerCase().includes(q)
  );

  res.render('bookmarks/search', {
    title: 'Search Results',
    query: req.query.q || '',
    bookmarks: q ? matchedBookmarks : [],
  });
};