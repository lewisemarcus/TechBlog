const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.logged_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    console.log('>>>>>>>ID', req.params.id);
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.logged_id,
      },
    });
    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    console.log('>>>>>>PUT REQUEST');
    const commentData = await Comment.update(
      {
        description: req.body.description,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.logged_id,
        },
      }
    );
    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    console.log('>>>>>>ERROR 500');
    res.status(500).json(err);
  }
});

module.exports = router;
