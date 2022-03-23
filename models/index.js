const Blogpost = require('./Blogpost'),
  Comment = require('./Comment'),
  User = require('./User');

User.hasMany(Blogpost, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Blogpost.belongsTo(User, {
  foreignKey: 'user_id',
});

User.belongToMany(Blogpost, { through: Comment });

Blogpost.belongToMany(User, { through: Comment });

module.exports = { Blogpost, Comment, User };
