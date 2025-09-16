const { Router } = require('express');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const { authenticateToken, authorize, optionalAuth } = require('../middleware/auth');

const router = Router();

// GET /api/posts - Get all published posts with filtering and pagination
router.get('/posts', optionalAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const filters = {
      category: req.query.category,
      tags: req.query.tags ? req.query.tags.split(',') : undefined,
      author: req.query.author
    };

    // Remove undefined filters
    Object.keys(filters).forEach(key => {
      if (filters[key] === undefined) {
        delete filters[key];
      }
    });

    const posts = await Post.getPublishedPosts(filters)
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments({ 
      status: 'published',
      ...filters 
    });

    res.json({
      success: true,
      data: posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching posts',
      error: error.message
    });
  }
});

// GET /api/posts/featured - Get featured posts
router.get('/posts/featured', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const posts = await Post.getFeaturedPosts(limit);
    
    res.json({
      success: true,
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching featured posts',
      error: error.message
    });
  }
});

// GET /api/posts/:slug - Get single post by slug
router.get('/posts/:slug', optionalAuth, async (req, res) => {
  try {
    const post = await Post.findOne({ 
      slug: req.params.slug,
      status: 'published'
    }).populate('author', 'username firstName lastName avatar bio');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Increment view count
    await post.incrementViews();

    // Get related posts (same category, excluding current post)
    const relatedPosts = await Post.find({
      category: post.category,
      status: 'published',
      _id: { $ne: post._id }
    })
      .populate('author', 'username firstName lastName avatar')
      .limit(3)
      .sort({ publishedAt: -1 });

    res.json({
      success: true,
      data: {
        post,
        relatedPosts
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching post',
      error: error.message
    });
  }
});

// POST /api/posts - Create new post (authenticated users only)
router.post('/posts', authenticateToken, authorize('author', 'admin'), async (req, res) => {
  try {
    const postData = {
      ...req.body,
      author: req.user._id
    };

    const post = new Post(postData);
    await post.save();

    await post.populate('author', 'username firstName lastName avatar');

    res.status(201).json({
      success: true,
      data: post,
      message: 'Post created successfully'
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error creating post',
      error: error.message
    });
  }
});

// PUT /api/posts/:id - Update post (author or admin only)
router.put('/posts/:id', authenticateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Check if user can edit this post
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to edit this post'
      });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('author', 'username firstName lastName avatar');

    res.json({
      success: true,
      data: updatedPost,
      message: 'Post updated successfully'
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error updating post',
      error: error.message
    });
  }
});

// DELETE /api/posts/:id - Delete post (author or admin only)
router.delete('/posts/:id', authenticateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Check if user can delete this post
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this post'
      });
    }

    // Delete associated comments
    await Comment.deleteMany({ post: req.params.id });

    await Post.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting post',
      error: error.message
    });
  }
});

// GET /api/posts/:id/comments - Get comments for a post
router.get('/posts/:id/comments', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    const comments = await Comment.getPostComments(req.params.id);

    res.json({
      success: true,
      data: comments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching comments',
      error: error.message
    });
  }
});

// POST /api/posts/:id/comments - Add comment to post
router.post('/posts/:id/comments', authenticateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    const commentData = {
      ...req.body,
      author: req.user._id,
      post: req.params.id
    };

    const comment = new Comment(commentData);
    await comment.save();

    await comment.populate('author', 'username firstName lastName avatar');

    res.status(201).json({
      success: true,
      data: comment,
      message: 'Comment added successfully'
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error adding comment',
      error: error.message
    });
  }
});

module.exports = router;
