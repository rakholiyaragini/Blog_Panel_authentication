const Comment = require('../models/comments/comment');
const blog = require('../models/blog/blogModel');

const addComment = async (req, res) => {
    console.log("add commnet");
    console.log("comment : ", req.body);

    const data = {
        comment: req.body.comment,
        blog: req.params.id,
        user: req.user._id,
    }
    let model = await new Comment(data);
    console.log("data", model);
    await model.save();

    res.redirect('/allBlog');
}

const deletComment = async (req, res) => {

    const comment = await Comment.findById(req.params.id);

    await Comment.findByIdAndDelete(req.params.id);
    console.log("deleted comment", comment);
    
    res.redirect('/allBlog');
}
module.exports = { addComment, deletComment };
