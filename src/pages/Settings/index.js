import React, { Component } from 'react';
import { View, SafeAreaView, ActivityIndicator } from 'react-native';
import { Left, Body, Title, Right } from 'native-base';
import { showMessage } from 'react-native-flash-message';
import { TextInputMask } from 'react-native-masked-text';
import { InputText } from '../Login/styles';
import ArrowBack from '../../components/ArrowBack';
import InputTextDisabled from '../../components/InputTextDisabled';
import api from '../../config/api';
import ScrollViewFS from '../../components/ScrollViewFullScreen';

import {
  ProfileHeader,
  ProfileContainer,
  ProfilePhotoContainer,
  ProfilePic,
  TextDataContainer,
  TextDataContent,
  LabelProfile,
  SubmitButton,
} from './styles';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codigo: '',
      telefone: '',
      nome: '',
      email: '',
      foto: {},
      loading: true,
      hasChanged: false,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.loadProfile();
    navigation.addListener('didFocus', payload => {
      this.loadProfile();
      this.setState({ loading: true });
    });
  }

  handleSaveChanges = async () => {
    const { nome, telefone, email, codigo } = this.state;
    let response = null;

    if (codigo.charAt(0) === 'P') {
      response = await api.put('/professor/editProfile', {
        nome,
        telefone,
        email,
      });

      const { msg, error } = response.data;

      if (error) {
        showMessage({
          message: `${msg}`,
          type: 'danger',
        });
        return;
      }

      showMessage({
        message: `${msg}`,
        type: 'info',
      });

      const modified = await api.get('/professor/editProfile');

      if (modified) {
        const { nome, telefone, email } = modified.data;

        this.setState({ nome, telefone, email, hasChanged: true });
      }
    } else if (codigo.charAt(0) === 'A') {
      response = await api.put('/aluno/editProfile', {
        nome,
        telefone,
        email,
      });

      const { msg, error } = response.data;

      if (error) {
        showMessage({
          message: `${msg}`,
          type: 'danger',
        });
        return;
      }

      showMessage({
        message: `${msg}`,
        type: 'info',
      });

      const modified = await api.get('/aluno/editProfile');

      if (modified) {
        const { nome, telefone, email } = modified.data;

        this.setState({ nome, telefone, email, hasChanged: true });
      }
    }
    this.setState({ hasChanged: true });
  };

  async loadProfile() {
    const { navigation } = this.props;
    const { params } = navigation.state;

    let response = null;

    if (params.codigo.charAt(0) === 'P') {
      response = await api.get('/professor/editProfile');
      var { nome, email, telefone } = response.data;
    } else if (params.codigo.charAt(0) === 'A') {
      response = await api.get('/aluno/editProfile');
      var { nome, email, telefone } = response.data;
    }

    this.setState({
      codigo: params.codigo,
      telefone,
      nome,
      email,
      foto: params.foto,
      loading: false,
    });
    console.tron.log(navigation);
  }

  render() {
    const { navigation } = this.props;
    const {
      codigo,
      telefone,
      nome,
      foto,
      email,
      loading,
      hasChanged,
    } = this.state;

    return (
      <SafeAreaView style={{ backgroundColor: '#e6ebef' }}>
        <View>
          <ProfileHeader>
            <Left>
              <ArrowBack
                onPress={() =>
                  hasChanged === true
                    ? navigation.goBack()
                    : navigation.navigate('Dashboard')
                }
              />
            </Left>
            <Body>
              <Title style={{ color: '#3f444d' }}>Perfil</Title>
            </Body>
            <Right />
          </ProfileHeader>
        </View>

        {loading ? (
          <ActivityIndicator
            color="#3f444d"
            style={{ marginTop: 300, marginBottom: 300 }}
            size="large"
          />
        ) : (
          <ScrollViewFS style={{ height: '100%' }}>
            <ProfileContainer style={{ display: 'flex' }}>
              <ProfilePhotoContainer>
                <ProfilePic source={{ uri: foto.file_url }} />
                <LabelProfile />
              </ProfilePhotoContainer>

              <TextDataContainer>
                <TextDataContent style={{}}>
                  <LabelProfile>Matrícula</LabelProfile>
                  <InputTextDisabled
                    value={codigo}
                    onChangeText={text => {
                      this.setState({
                        codigo: text,
                      });
                    }}
                    style={{ paddingLeft: 12 }}
                  />

                  <LabelProfile>Nome</LabelProfile>
                  <InputText
                    value={nome}
                    onChangeText={text => {
                      this.setState({
                        nome: text,
                      });
                    }}
                    style={{ paddingLeft: 12 }}
                  />

                  <LabelProfile>Email</LabelProfile>
                  <InputText
                    value={email}
                    style={{ paddingLeft: 12 }}
                    onChangeText={text => {
                      this.setState({
                        email: text,
                      });
                    }}
                  />

                  <LabelProfile>Telefone</LabelProfile>
                  <TextInputMask
                    placeholder="Telefone"
                    customTextInput={InputText}
                    type="cel-phone"
                    options={{
                      maskType: 'BRL',
                      withDDD: true,
                      dddMask: '(99)',
                    }}
                    value={telefone}
                    onChangeText={text => {
                      this.setState({ telefone: text });
                    }}
                    style={{ paddingLeft: 12 }}
                  />
                  <SubmitButton
                    title="Salvar"
                    onPress={this.handleSaveChanges}
                  />
                </TextDataContent>
              </TextDataContainer>
            </ProfileContainer>
          </ScrollViewFS>
        )}
      </SafeAreaView>
    );
  }
}
