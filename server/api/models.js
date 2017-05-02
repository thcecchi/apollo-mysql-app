import Sequelize from 'sequelize';

// create the connection
const db = new Sequelize('apollodemo', "root", null, {
    host: 'localhost',
    dialect: 'mysql'
});

// define the post model
const PostModel = db.define('post', {
    content: { type: Sequelize.STRING },
    views: {type: Sequelize.INTEGER}
}, {
    timestamps: false
});

// define the user model
const UserModel = db.define('user', {
  firstName: { type: Sequelize.STRING, required: true },
  lastName: { type: Sequelize.STRING, required: true },
  email: { type: Sequelize.STRING, required: true, unique: true },
  password: { type: Sequelize.STRING, required: true },
  createdAt: { type: Sequelize.DATE, default: Date.now }
}, {
    timestamps: false
});

// create the table if it doesn't exist yet
db.sync();

// export Post
export const Post = db.models.post;

// export User
export const User = db.models.user;
