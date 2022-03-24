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

User.belongsToMany(Blogpost, { through: Comment });

Blogpost.belongsToMany(User, { through: Comment });

module.exports = { Blogpost, Comment, User };
