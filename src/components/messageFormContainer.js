import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { MessageForm } from './messageForm';
import update from 'react-addons-update';

const addPost = gql`
    mutation addPostMutation ($content: String!) {
      addPost(content: $content) {
        id,
        content,
        views
      }
    }
`;

export const MessageFormContainer = graphql(addPost, {
    props: ({ mutate }) => ({
        submit: (message) => mutate({
            variables: { content: message },
            optimisticResponse: {
                __typename: 'Mutation',
                addPost: {
                    __typename: 'Post',
                    id: Math.floor((Math.random() * 100000) + 1),
                    content: message,
                    views: null
                },
            },
            updateQueries: {
                PostsForDisplay: (prev, { mutationResult }) => {
                    const newPost = mutationResult.data.addPost;
                    return update(prev, {
                        posts: {
                            $push: [newPost],
                        },
                    });
                },
            },
        })
    }),
})(MessageForm);
