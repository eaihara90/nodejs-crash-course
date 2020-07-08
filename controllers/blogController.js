const Blog = require('../models/blog');

const blog_index = async (req, res) => {
    try {
        const result = await Blog.find().sort({ createdAt: -1 });
        res.render('blogs/index', { title: 'All blogs', blogs: result});

    } catch (err) {
        console.log(err);
    }
};

const blog_details = async (req, res) => {
    try{
        const result = await Blog.findById(req.params.id);
        res.render('blogs/details', { blog: result, title: 'Blog detail' });
    } catch (err) {
        console.log(err)
    }
};

const blog_create_post = async (req, res) => {
    const blog = new Blog(req.body);
    try {
        const result = await blog.save();
        res.redirect('/blogs');
    } catch (err) {
        console.log(err);
    }
};

const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'Create a new blog' });
}

const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' });
        })
        .catch(err => console.log(err));

};

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}