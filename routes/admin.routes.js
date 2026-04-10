const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controller');
const adminAuth = require('../middleware/adminAuth');
const validateBookmark = require('../middleware/validateSlug');

router.get('/login', adminController.getLogin);
router.post('/login', adminController.postLogin);

router.use(adminAuth);

router.get('/', adminController.getDashboard);

router.get('/bookmarks', adminController.getBookmarks);
router.get('/bookmarks/new', adminController.getNewBookmark);
router.post('/bookmarks/new', validateBookmark, adminController.postNewBookmark);

router.get('/bookmarks/:slug/edit', adminController.getEditBookmark);
router.post('/bookmarks/:slug/edit', validateBookmark, adminController.postEditBookmark);

router.post('/bookmarks/:slug/delete', adminController.deleteBookmark);
router.post('/bookmarks/:slug/archive', adminController.archiveBookmark);
router.post('/bookmarks/:slug/unarchive', adminController.unarchiveBookmark);

router.post('/logout', adminController.logout);

module.exports = router;