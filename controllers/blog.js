const blogModel = require('../models/blog/blogModel');

const addBlog = async (req, res) => {
    console.log("add blog");
    res.render('pages/samples/addBlog');
};

const viewBlog = async (req, res) => {
    console.log("my blog");
    console.log("res.user my blog", req.user);
    
    blogModel.find({user_id:req.user._id})
    .then(blogData => {
        console.log("blogData form my blog", blogData);
        res.render('pages/samples/viewBlog',{ data: req.user, blogData: blogData });
    })
    .catch(err => console.log(err));
};

const addBlogController = async (req, res) => {
    console.log("add blog controller");
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    const data = {
        title: req.body.title,
        content: req.body.content,
        blog_img:  req.file ? req.file.path : null,
        user_id : req.user._id,

    };

    let newBlog = new blogModel(data);
    console.log("db", newBlog);
    await newBlog.save();
    res.redirect('/');
};

const editController = async (req, res) => {

    console.log("edit blogg");
    
    const blogEntry = await blogModel.findById(req.params.id);

    res.render('pages/samples/editBlog', { blog: blogEntry });

};

const updateController = async (req, res) => {

    const blogEntry = await blogModel.findById(req.params.id);

    blogEntry.title = req.body.title;
    blogEntry.content = req.body.content;

    if (req.file) {
        blogEntry.blog_img = req.file.path;
    }

    await blogEntry.save();
    res.redirect('/viewBlog');
};

const deleteController = async (req, res) => {

    const deletedBlog = await blogModel.findByIdAndDelete(req.params.id);

    res.redirect('/viewBlog');
};

// all blogs

const allBlog = async (req, res) => {
    console.log("view blog controller");

    blogModel.find({})
    .then(blogData => {
        console.log("blogData", blogData);
        res.render('pages/samples/allBlog', { data: req.user, blogData: blogData });
    })
    .catch(err => console.log(err));
}

module.exports = { addBlog, addBlogController, viewBlog, editController, updateController, deleteController  , allBlog };
