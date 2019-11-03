import React, { Component } from 'react';
import { Grid, Section, Block } from 'react-native-responsive-layout';
import { KeyboardAvoidingView, Alert } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import api from '../../config/api';

import {
  Container,
  Form,
  InputText,
  InputPassword,
  SubmitButton,
  Scrollable,
  CheckBoxSignUp,
} from './styles';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: {
        email: '',
        cpf: '',
        nome: '',
        data_nascimento: '',
        telefone: '',
        senha: '',
        endereco: {
          estado: '',
          cidade: '',
        },
      },
      codigo: '',
      resMessage: '',
      isProfessor: false,
      isAluno: false,
    };
  }

  signUp = async () => {
    try {
      const { usuario, codigo, isAluno, isProfessor } = this.state;
      let response = null;

      if (isAluno) {
        response = await api.post('/aluno/register', {
          usuario,
          codigo,
        });
      }

      if (isProfessor) {
        response = await api.post('/professor/register', {
          usuario,
          codigo,
        });
      }

      const { message, Matricula } = response.data;

      this.setState({
        codigo: Matricula,
        resMessage: `${message} e sua matrícula é: ${Matricula}`,
      });

      let object = usuario;
      object = {};

      this.setState({ usuario: object });

      this.handleNavigate();
    } catch (response) {
      if (response.data.error) throw response.data.error;
    }
    Alert.alert(this.state.resMessage);
  };

  handleNavigate = login => {
    const { navigation } = this.props;
    navigation.navigate('Login', { login });
  };

  render() {
    const { usuario, isProfessor, isAluno } = this.state;
    return (
      <Container>
        <Grid>
          <KeyboardAvoidingView behavior="position">
            <Form>
              <Scrollable>
                <Section xsSize="1/1" smSize="1/1">
                  <Block>
                    <TextInputMask
                      customTextInput={InputText}
                      placeholder="CPF"
                      type="cpf"
                      value={usuario.cpf}
                      onChangeText={text => {
                        const novoEstado = usuario;
                        novoEstado.cpf = text;
                        this.setState({ usuario: novoEstado });
                      }}
                      onSubmitEditing={() => {
                        this.nomeRef.getElement().focus();
                      }}
                    />
                  </Block>
                </Section>

                <Section xsSize="1/1" smSize="1/1">
                  <Block>
                    <InputText
                      placeholder="Nome"
                      autoCapitalize="sentences"
                      autoCompleteType="name"
                      value={usuario.nome}
                      onChangeText={text => {
                        const novoEstado = usuario;
                        novoEstado.nome = text;
                        this.setState({ usuario: novoEstado });
                      }}
                      ref={input => (this.nomeRef = input)}
                    />
                  </Block>
                </Section>

                <Section xsSize="1/1" smSize="1/1">
                  <Block>
                    <TextInputMask
                      placeholder="Data de Nascimento"
                      customTextInput={InputText}
                      type="datetime"
                      options={{
                        format: 'DD/MM/YYYY',
                      }}
                      value={usuario.data_nascimento}
                      onChangeText={text => {
                        const novoEstado = usuario;
                        novoEstado.data_nascimento = text;
                        this.setState({ usuario: novoEstado });
                      }}
                    />
                  </Block>
                </Section>

                <Section xsSize="1/1" smSize="1/1">
                  <Block>
                    <InputText
                      placeholder="Email"
                      autoCapitalize="none"
                      autoCompleteType="email"
                      value={usuario.email}
                      onChangeText={text => {
                        const novoEstado = usuario;
                        novoEstado.email = text;
                        this.setState({ usuario: novoEstado });
                      }}
                    />
                  </Block>
                </Section>

                <Section xsSize="1/1" smSize="1/1">
                  <Block>
                    <TextInputMask
                      placeholder="Telefone"
                      customTextInput={InputText}
                      type="cel-phone"
                      options={{
                        maskType: 'BRL',
                        withDDD: true,
                        dddMask: '(99)',
                      }}
                      value={usuario.telefone}
                      onChangeText={text => {
                        const novoEstado = usuario;
                        novoEstado.telefone = text;
                        this.setState({ usuario: novoEstado });
                      }}
                    />
                  </Block>
                </Section>

                <Section xsSize="1/1" smSize="1/1">
                  <Block>
                    <InputPassword
                      value={usuario.senha}
                      onChangeText={text => {
                        const novoEstado = usuario;
                        novoEstado.senha = text;
                        this.setState({ usuario: novoEstado });
                      }}
                    />
                  </Block>
                </Section>

                <Section xsSize="1/1" smSize="1/1">
                  <Block>
                    <CheckBoxSignUp
                      title="Professor"
                      checked={isProfessor}
                      onPress={() =>
                        this.setState({
                          isProfessor: !isProfessor,
                          isAluno: false,
                        })
                      }
                    />

                    <CheckBoxSignUp
                      title="Aluno"
                      checked={isAluno}
                      onPress={() =>
                        this.setState({ isAluno: !isAluno, isProfessor: false })
                      }
                    />
                  </Block>
                </Section>

                <Section xsSize="1/1" smSize="1/1">
                  <Block>
                    <SubmitButton warning onPress={this.signUp} />
                  </Block>
                </Section>
              </Scrollable>
            </Form>
          </KeyboardAvoidingView>
        </Grid>
      </Container>
    );
  }
}

Signup.navigationOptions = {
  title: 'Registrar',
};
