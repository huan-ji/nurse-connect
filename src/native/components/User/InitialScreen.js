import React, { Component } from 'react';
import {
  Container, Content, Text, Grid, Row, Col,
} from 'native-base';
import { Image } from 'react-native';

import SignUpContainer from '../../../containers/SignUp';

import LoginContainer from '../../../containers/Login';

const styles = {
  authScreen: { color: 'white', textAlign: 'center', fontSize: 20 },
  authScreenActive: {
    color: 'white', textAlign: 'center', textDecorationLine: 'underline', fontSize: 20,
  },
};

class InitialScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: 'logIn',
    };
  }

  render() {
    const { screen } = this.state;

    return (
      <Container style={{ backgroundColor: '#40C6FF' }}>
        <Image
          style={{
            alignSelf: 'center',
            height: 100,
            width: '80%',
            marginTop: 100,
            marginBottom: 50,
          }}
          source={require('../../../images/nurse-logo.png')}
          resizeMode="contain"
        />
        <Content padder>
          <Grid>
            <Row>
              <Col>
                <Text
                  style={screen === 'logIn' ? styles.authScreenActive : styles.authScreen}
                  onPress={() => this.setState({ screen: 'logIn' })}
                >
                  Sign In
                </Text>
              </Col>
              <Col>
                <Text
                  style={screen === 'signUp' ? styles.authScreenActive : styles.authScreen}
                  onPress={() => this.setState({ screen: 'signUp' })}
                >
                  Create Account
                </Text>
              </Col>
            </Row>
          </Grid>
          {screen === 'logIn' ? <LoginContainer /> : <SignUpContainer />}
        </Content>
      </Container>
    );
  }
}

export default InitialScreen;
