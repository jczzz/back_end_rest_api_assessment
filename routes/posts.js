const express = require("express");
const router = express.Router();
const { getPost } = require("../controllers/posts");
const { cache } = require('../middleware/cacheRoute')

// 5 seconds
router.get('/',cache(5), getPost);

module.exports = router;