const sequelize = require('../config/connection');
const { User, Blogpost, Comment } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  let count = 1;
  for (const blog of blogData) {
    await Blogpost.create({
      ...blog,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });

    for (const comment of commentData) {
      await Comment.create({
        ...comment,
        user_id: users[Math.floor(Math.random() * users.length)].id,
        blog_id: count,
      });
    }
    count++;
  }

  process.exit(0);
};

seedDatabase();
