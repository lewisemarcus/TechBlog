const router = require('express').Router();
const { Blogpost, User } = require('../models');
const withAuth = require('../utils/auth');
router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogData = await Blogpost.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', async (req, res) => {
  try {
    console.log(req.session.user_id);
    // Get all projects corresponding to user id.
    const blogData = await Blogpost.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    if (req.session.logged_in) {
      res.render('dashboard', {
        blogs,
        logged_in: req.session.logged_in,
      });
      return;
    } else {
      res.redirect('/login');
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;
