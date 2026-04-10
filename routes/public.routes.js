const express = require('express');
const router = express.Router();

const publicController = require('../controllers/public.controller');

// home page
router.get('/', publicController.getHome);

// list active bookmarks
router.get('/bookmarks', publicController.getBookmarks);

// search page
router.get('/search', publicController.searchBookmarks);

// filter by tag
router.get('/tag/:tagSlug', publicController.getBookmarksByTag);

// bookmark detail
router.get('/bookmarks/:slug', publicController.getBookmarkDetail);

module.exports = router;