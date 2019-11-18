/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Left, Right, Icon, Body, Title } from 'native-base';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { InputPasssword, InputText, SubmitButton } from './styles';
import api from '../../config/api';

export default class ForgotPwd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codigo: '',
      senha: '',
      confirmaSenha: '',
    };
  }

  handleRecoverPwd = async () => {
    const { codigo, senha, confirmaSenha } = this.state;
    let response = null;

    if (codigo.charAt(0) === 'A') {
      response = await api
        .post('/aluno/recsenha', {
          codigo,
          senha,
          confirmaSenha,
        })
        .catch(resolve => {
          showMessage({
            message: resolve.data.error,
            type: 'danger',
            duration: 4000,
          });
        });
    } else if (codigo.charAt(0) === 'P') {
      response = await api
        .post('/professor/recsenha', {
          codigo,
          senha,
          confirmaSenha,
        })
        .catch(resolve => {
          showMessage({
            message: resolve.data.error,
            type: 'danger',
            duration: 4000,
            hideOnPress: true,
          });
        });
    }

    const { msg } = response.data;

    if (msg) {
      showMessage({
        message: `${msg}`,
        type: 'success',
        duration: 4000,
        hideOnPress: true,
      });
    }
  };

  render() {
    const { codigo, senha, confirmaSenha } = this.state;
    const { navigation } = this.props;

    return (
      <View style={{ backgroundColor: '#e6ebef', height: '100%' }}>
        <Header style={{ backgroundColor: '#e6ebef' }} translucent>
          <Left>
            <Icon
              name="ios-arrow-back"
              onPress={() => navigation.navigate('Login')}
            />
          </Left>
          <Body>
            <Title style={{ color: '#1f2e2e', fontWeight: 'bold' }}>
              Recuperação
            </Title>
          </Body>
          <Right />
        </Header>
        <View>
          <InputText
            value={codigo}
            placeholder="Matrícula"
            onChangeText={text => {
              this.setState({
                codigo: text,
              });
            }}
            onSubmitEditing={() => this.InputPasssword.focus()}
          />
          <InputPasssword
            placeholder="Senha"
            value={senha}
            onChangeText={text => {
              this.setState({
                senha: text,
              });
            }}
            ref={input => (this.InputPasssword = input)}
            onSubmitEditing={() => this.confirmPassword.focus()}
          />

          <InputPasssword
            placeholder="Confirmar senha"
            value={confirmaSenha}
            onChangeText={text => {
              this.setState({
                confirmaSenha: text,
              });
            }}
            ref={input => (this.confirmPassword = input)}
            returnKeyType="done"
          />
          <SubmitButton onPress={() => this.handleRecoverPwd()} />
        </View>
      </View>
    );
  }
}
