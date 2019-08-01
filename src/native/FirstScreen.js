import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container, Spinner,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Firebase } from '../lib/firebase';
import AuthScreen from './components/User/InitialScreen';

class FirstScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentWillMount() {
    const { setUser, listenForMemberProfileUpdates } = this.props;

    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        listenForMemberProfileUpdates();
        setUser(user);
        Actions.home();
      } else {
        this.setState({ loading: false });
      }
    });
  }

  render() {
    const { loading } = this.state;
    if (loading) return <Spinner />;

    return (
      <Container>
        <AuthScreen />
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setUser: dispatch.member.setUser,
  listenForMemberProfileUpdates: dispatch.member.listenForMemberProfileUpdates,
});

export default connect(undefined, mapDispatchToProps)(FirstScreen);
