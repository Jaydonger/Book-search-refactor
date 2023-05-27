const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

//resolvers skeleton

const resolvers = {
    Query: {
        myBooks: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select("-__v -password");
                return userData;
            }
            throw new AuthenticationError("Couldn't log in!")
        },
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError("No account found with that information!");
            }
            const correctPassword = await user.isCorrectPassword(password);
            if (!correctPassword) {
                throw new AuthenticationError("Incorrect password");
            }
            const token = signToken(user);
            return { token, user };
        },
        createUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { input }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: input } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError("Must be logged in to save books!");
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError("Must be logged in!");
        },
    },
};
module.exports = resolvers;