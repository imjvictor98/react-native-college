import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Grid, Section, Block } from 'react-native-responsive-layout';
import { showMessage } from 'react-native-flash-message';
import api from '../../config/api';

import {
  Container,
  Form,
  InputText,
  InputPasssword,
  ForgotPassword,
  SubmitButton,
} from './styles';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarioLogado: {},
      codigo: '',
      senha: '',
      errorMessage: '',
      isProfessor: false,
      isAluno: false,
      hasError: false,
    };
  }

  handleNavigate = () => {
    const { navigation } = this.props;
    const { isAluno, isProfessor } = this.state;

    navigation.navigate('Dashboard', {
      user: {
        isAluno,
        isProfessor,
      },
    });
  };

  signIn = async () => {
    try {
      const { codigo, senha } = this.state;
      let response = null;

      if (codigo.charAt(0) === 'A') {
        response = await api.post('/aluno/login', {
          codigo,
          senha,
        });

        this.setState({ isAluno: true, isProfessor: false });
      }

      if (codigo.charAt(0) === 'P') {
        response = await api.post('/professor/login', {
          codigo,
          senha,
        });

        this.setState({ isAluno: false, isProfessor: true });
      }
      const { token, user } = response.data;

      await AsyncStorage.multiSet([
        ['@rnFaculdade:token', token],
        ['@rnFaculdade:user', JSON.stringify(user)],
      ]);

      this.setState({ usuarioLogado: user });

      this.handleNavigate();
    } catch (response) {
      this.setState({ errorMessage: response.data.error, hasError: true });
    }
  };

  render() {
    const { codigo, senha, errorMessage, hasError } = this.state;
    const { navigation } = this.props;

    return (
      <Container>
        <Grid>
          <Form>
            <Section>
              <Block xsSize="1/1" smSize="1/1">
                <InputText
                  value={codigo}
                  onChangeText={text => {
                    this.setState({
                      codigo: text,
                    });
                  }}
                  onSubmitEditing={() => this.InputPasssword.focus()}
                />
              </Block>
            </Section>

            <Section xsSize="1/1" smSize="1/1">
              <Block>
                <InputPasssword
                  value={senha}
                  onChangeText={text => {
                    this.setState({
                      senha: text,
                    });
                  }}
                  ref={input => (this.InputPasssword = input)}
                />
              </Block>
            </Section>

            <Section xsSize="1/1" smSize="1/1">
              <Block>
                <SubmitButton onPress={this.signIn} />
                <TouchableOpacity>
                  <ForgotPassword
                    onPress={() => navigation.navigate('ForgotPwd')}
                  >
                    Esqueceu sua senha?
                  </ForgotPassword>
                </TouchableOpacity>
              </Block>
              {hasError === true
                ? showMessage({
                    message: `${errorMessage}`,
                    type: 'danger',
                  }) || this.setState({ hasError: false })
                : null}
            </Section>
          </Form>
        </Grid>
      </Container>
    );
  }
}

Login.navigationOptions = {
  title: 'Entrar',
};
