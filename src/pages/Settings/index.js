import React, { Component } from 'react';
import { View, SafeAreaView, ActivityIndicator } from 'react-native';
import { Left, Body, Title, Right } from 'native-base';
import { InputText } from '../Login/styles';
import ArrowBack from '../../components/ArrowBack';
import InputTextDisabled from '../../components/InputTextDisabled';
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
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const { params } = navigation.state;

    this.setState({
      codigo: params.codigo,
      telefone: params.telefone,
      nome: params.nome,
      email: params.email,
      foto: params.foto,
      loading: false,
    });
  }

  render() {
    const { navigation } = this.props;
    const { codigo, telefone, nome, foto, email, loading } = this.state;

    return (
      <SafeAreaView style={{ backgroundColor: '#e6ebef' }}>
        <View>
          <ProfileHeader>
            <Left>
              <ArrowBack onPress={() => navigation.navigate('Dashboard')} />
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
                <LabelProfile
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  Alterar foto de perfil
                </LabelProfile>
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
                  />

                  <LabelProfile>Nome</LabelProfile>
                  <InputText
                    value={nome}
                    onChangeText={text => {
                      this.setState({
                        nome: text,
                      });
                    }}
                  />

                  <LabelProfile>Email</LabelProfile>
                  <InputText value={email} />

                  <LabelProfile>Telefone</LabelProfile>
                  <InputText
                    value={telefone}
                    onChangeText={text => {
                      this.setState({
                        telefone: text,
                      });
                    }}
                  />
                  <SubmitButton title="Salvar" />
                </TextDataContent>
              </TextDataContainer>
            </ProfileContainer>
          </ScrollViewFS>
        )}
      </SafeAreaView>
    );
  }
}
