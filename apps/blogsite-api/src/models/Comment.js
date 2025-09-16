const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Comment content is required'],
    trim: true,
    maxlength: [1000, 'Comment cannot exceed 1000 characters']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Comment author is required']
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: [true, 'Post reference is required']
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null
  },
  isApproved: {
    type: Boolean,
    default: true
  },
  likes: {
    type: Number,
    default: 0
  },
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, {
  timestamps: true
});

// Indexes for better query performance
commentSchema.index({ post: 1, createdAt: -1 });
commentSchema.index({ author: 1 });
commentSchema.index({ parentComment: 1 });

// Virtual for reply count
commentSchema.virtual('replyCount').get(function() {
  return this.replies ? this.replies.length : 0;
});

// Instance method to add reply
commentSchema.methods.addReply = function(replyId) {
  if (!this.replies.includes(replyId)) {
    this.replies.push(replyId);
    return this.save();
  }
  return Promise.resolve(this);
};

// Static method to get comments for a post
commentSchema.statics.getPostComments = function(postId, _includeReplies = true) {
  const query = { 
    post: postId, 
    isApproved: true,
    parentComment: null // Only top-level comments
  };
  
  return this.find(query)
    .populate('author', 'username firstName lastName avatar')
    .populate({
      path: 'replies',
      populate: {
        path: 'author',
        select: 'username firstName lastName avatar'
      }
    })
    .sort({ createdAt: -1 });
};

module.exports = mongoose.model('Comment', commentSchema);
