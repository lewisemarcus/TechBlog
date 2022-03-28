const router = require('express').Router();
const { Blogpost, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blogpost.create({
      ...req.body,
      user_id: req.session.logged_id,
    });
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    console.log(req.params.id);
    await Comment.destroy({
      where: {
        blog_id: req.params.id,
      },
    });
    const blogData = await Blogpost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.logged_id,
      },
    });
    console.log('>>>>>>>BLOG DATA', blogData);
    if (!blogData) {
      console.log('>>>>>NO DATA FOUND');
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
