const express = require('express');
const router = express.Router();

const postsController = require('../app/controllers/PostsController');

router.post(
    '/handle-stored-form-actions',
    postsController.handleStoredFormActions,
);
router.post(
    '/handle-trashed-form-actions',
    postsController.handleTrashedFormActions,
);
router.get('/create', postsController.create);
router.post('/store', postsController.store);
router.get('/:id/edit', postsController.edit);
router.patch('/:id/restore', postsController.restore);
router.delete('/:id/force', postsController.forceDelete);
router.put('/:id', postsController.update);
router.delete('/:id', postsController.delete);
router.get('/:slug', postsController.show);

module.exports = router;
