import { Post } from './models';
import connectors from './connectors';
import { User } from './models';

// create the resolve functions for the available GraphQL queries
export const resolvers = {
    Query: {
        posts(_, args) {
            return Post.findAll({where: args});
        },
        users() {
          return connectors.User.getUsers()
          .then((users) => {
            return users.map((user) => {
              return {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
              };
            });
          })
          .catch((err) => {
            throw new Error(err);
          });
        }
    },

    Mutation: {
        addPost(_, args) {
            return Post.create(args);
        },
        signUp(root, args) {
          const errors = [];

          return connectors.Auth.signUp(args)
            .then(token => ({
              token,
              errors
            }))
            .catch((err) => {
              if (err.code && err.message) {
                errors.push({
                  key: err.code,
                  value: err.message
                });
                return { token: null, errors };
              }

              throw new Error(err);
            });
        },
        signIn(root, args) {
          const errors = [];

          return connectors.Auth.signIn(args)
            .then(token => ({
              token,
              errors
            }))
            .catch((err) => {
              if (err.code && err.message) {
                errors.push({
                  key: err.code,
                  value: err.message
                });

                return { token: null, errors };
              }

              throw new Error(err);
            });
        }
    }
};
