Skip to content
This repository
Search
Pull requests
Issues
Gist
 @thcecchi
 Sign out
 Watch 6
  Unstar 53
 Fork 16 jferrettiboke/react-auth-app-example
 Code  Issues 4  Pull requests 1  Projects 0  Wiki  Pulse  Graphs
Branch: master Find file Copy pathreact-auth-app-example/client/src/containers/SignUpFormContainer.js
9b21a7c  on Dec 17, 2016
@jferrettiboke jferrettiboke Add client and server
1 contributor
RawBlameHistory
80 lines (70 sloc)  1.77 KB
import React from 'react';
import { withRouter } from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';

import SignUpForm from '../components/SignUpForm';
import { signIn } from '../actions';

class SignUpFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
  }

  handleSubmit(values) {
    this.props.signUp(values)
      .then((response) => {
        if (response.data.signUp.errors.length <= 0) {
          this.props.signInDispatcher(response.data.signUp.token);
          this.props.router.replace('/');
        } else {
          this.setState({
            errors: response.data.signUp.errors
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <SignUpForm
        onSubmit={this.handleSubmit.bind(this)}
        errors={this.state.errors}
      />
    );
  }
}

const signUpMutation = gql`
  mutation signUp($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    signUp(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token,
      errors {
        key
        value
      }
    }
  }
`;

const SignUpWithData = graphql(signUpMutation, {
  props: ({ mutate }) => ({
    signUp: ({ firstName, lastName, email, password }) => mutate({
      variables: { firstName, lastName, email, password }
    }),
  }),
})(withRouter(SignUpFormContainer));

const mapDispatchToProps = (dispatch) => ({
  signInDispatcher(token) {
    dispatch(signIn(token));
  }
});

const SignUpWithDataAndDispatch = connect(
  null,
  mapDispatchToProps
)(SignUpWithData);

export default SignUpWithDataAndDispatch;
