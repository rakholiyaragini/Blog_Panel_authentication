const comment = require('../models/comments/comment');
const Blog = require('../models/blog/blogModel');

const addComment = async(req,res) => {
    console.log("add commnet");
    console.log("comment : " , req.body);
    
    const data = {
        comment: req.body.comment,
        blog : req.params.id,
        user : req.user._id,
    }
    let model = await new comment(data);
    console.log("data", model);
    await model.save();

    res.redirect('/allBlog');
}                                                                                                                                                                                   
module.exports = {addComment};
