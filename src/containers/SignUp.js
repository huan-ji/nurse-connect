import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignUpComponent from '../native/components/User/SignUp';

class SignUp extends Component {
  static propTypes = {
    member: PropTypes.shape({}).isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  }

  state = {
    error: null,
    success: null,
    loading: false,
  }

  onFormSubmit = (data) => {
    const { onFormSubmit } = this.props;

    this.setState({ loading: true });

    return onFormSubmit(data)
      .then(() => this.setState({
        loading: false,
        success: 'Success - You are now a member',
        error: null,
      })).catch((err) => {
        this.setState({
          loading: false,
          success: null,
          error: err,
        });
        throw err; // To prevent transition back
      });
  }

  render = () => {
    const { member, Layout } = this.props;
    const { error, loading, success } = this.state;

    return (
      <SignUpComponent
        error={error}
        member={member}
        loading={loading}
        success={success}
        onFormSubmit={this.onFormSubmit}
      />
    );
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
});

const mapDispatchToProps = dispatch => ({
  onFormSubmit: dispatch.member.signUp,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
