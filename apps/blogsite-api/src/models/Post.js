const mongoose = require('mongoose');
const slugify = require('slugify');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Post title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  excerpt: {
    type: String,
    required: [true, 'Post excerpt is required'],
    trim: true,
    maxlength: [500, 'Excerpt cannot exceed 500 characters']
  },
  content: {
    type: String,
    required: [true, 'Post content is required'],
    minlength: [100, 'Content must be at least 100 characters long']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Post author is required']
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  category: {
    type: String,
    required: [true, 'Post category is required'],
    enum: ['technology', 'lifestyle', 'travel', 'food', 'personal', 'tutorial', 'review', 'news'],
    default: 'personal'
  },
  featuredImage: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  publishedAt: {
    type: Date,
    default: null
  },
  readTime: {
    type: Number, // in minutes
    default: 1
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  seoTitle: {
    type: String,
    maxlength: [60, 'SEO title cannot exceed 60 characters']
  },
  seoDescription: {
    type: String,
    maxlength: [160, 'SEO description cannot exceed 160 characters']
  }
}, {
  timestamps: true
});

// Indexes for better query performance
postSchema.index({ slug: 1 });
postSchema.index({ author: 1 });
postSchema.index({ status: 1, publishedAt: -1 });
postSchema.index({ category: 1, status: 1 });
postSchema.index({ tags: 1 });
postSchema.index({ isFeatured: 1, status: 1 });

// Generate slug from title before saving
postSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });
  }
  next();
});

// Calculate read time based on content length
postSchema.pre('save', function(next) {
  if (this.isModified('content')) {
    const wordsPerMinute = 200;
    const wordCount = this.content.split(/\s+/).length;
    this.readTime = Math.ceil(wordCount / wordsPerMinute);
  }
  next();
});

// Set publishedAt when status changes to published
postSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

// Virtual for formatted published date
postSchema.virtual('formattedPublishedDate').get(function() {
  if (!this.publishedAt) return null;
  return this.publishedAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Instance method to increment views
postSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Static method to get published posts
postSchema.statics.getPublishedPosts = function(filters = {}) {
  const query = { status: 'published' };
  
  if (filters.category) {
    query.category = filters.category;
  }
  
  if (filters.tags && filters.tags.length > 0) {
    query.tags = { $in: filters.tags };
  }
  
  if (filters.author) {
    query.author = filters.author;
  }
  
  return this.find(query)
    .populate('author', 'username firstName lastName avatar')
    .sort({ publishedAt: -1 });
};

// Static method to get featured posts
postSchema.statics.getFeaturedPosts = function(limit = 5) {
  return this.find({ 
    status: 'published', 
    isFeatured: true 
  })
    .populate('author', 'username firstName lastName avatar')
    .sort({ publishedAt: -1 })
    .limit(limit);
};

module.exports = mongoose.model('Post', postSchema);
