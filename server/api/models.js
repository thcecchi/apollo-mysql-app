import Sequelize from 'sequelize';

// create the connection
const postdb = new Sequelize('apollodemo', "root", null, {
    host: 'localhost',
    dialect: 'mysql'
});

const userdb = new Sequelize('apollodemousers', "root", null, {
    host: 'localhost',
    dialect: 'mysql'
});

// define the post model
const PostModel = postdb.define('post', {
    content: { type: Sequelize.STRING },
    views: {type: Sequelize.INTEGER}
}, {
    timestamps: false
});

// define the user model
const UserModel = userdb.define('user', {
  firstName: { type: Sequelize.STRING, required: true },
  lastName: { type: Sequelize.STRING, required: true },
  email: { type: Sequelize.STRING, required: true, unique: true },
  password: { type: Sequelize.STRING, required: true },
  createdAt: { type: Sequelize.DATE, default: Date.now }
}, {
    timestamps: false
});

// create the table if it doesn't exist yet
postdb.sync();
userdb.sync();

// export Post
export const Post = postdb.models.post;

// export User
export const User = userdb.models.user;
