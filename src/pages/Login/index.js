import React, { Component } from 'react';
import { Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Grid, Section, Block } from 'react-native-responsive-layout';
import api from '../../config/api';

import {
  Container,
  Form,
  InputText,
  InputPasssword,
  ForgotPassword,
  SubmitButton,
  CheckBoxLogin,
} from './styles';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarioLogado: null,
      codigo: 'A2300',
      senha: '123123',
      errorMessage: null,
      isProfessor: false,
      isAluno: false,
    };
  }

  handleNavigate = () => {
    const { navigation } = this.props;
    const { isAluno, isProfessor } = this.state;

    console.tron.log(navigation.navigate.routes);
    navigation.navigate('Dashboard', {
      user: {
        isAluno,
        isProfessor,
      },
    });
  };

  signIn = async () => {
    try {
      const { codigo, senha, usuarioLogado, errorMessage } = this.state;
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
      this.setState({ errorMessage: response.data.error });
    }
  };

  render() {
    const { codigo, senha, isProfessor, isAluno } = this.state;

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
                <ForgotPassword
                  onPress={() => Linking.openURL('http://google.com')}
                >
                  Esqueceu sua senha?
                </ForgotPassword>
              </Block>
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
