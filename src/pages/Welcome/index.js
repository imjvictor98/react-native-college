/* eslint-disable global-require */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Left, Icon, Body, Title, Right } from 'native-base';
import { Text, Image } from 'react-native-elements';

// import { Container } from './styles';

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.image = require('../../assets/goodluck.png');
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ backgroundColor: '#e6ebef', height: '100%' }}>
        <Header style={{ backgroundColor: '#e6ebef' }} translucent>
          <Left>
            <Icon name="ios-arrow-back" onPress={() => navigation.goBack()} />
          </Left>
          <Body>
            <Title style={{ color: '#1f2e2e', fontWeight: 'bold' }}>
              Boas vindas
            </Title>
          </Body>
          <Right />
        </Header>
        <View>
          <Text
            h3
            style={{
              alignSelf: 'center',
              color: '#3f444d',
              fontWeight: 'bold',
            }}
          >
            Bem-vindo ao AVA
          </Text>
          <Text
            h3
            h3Style={{
              marginLeft: 5,
              marginRight: 5,
              color: '#3f444d',
              marginTop: 40,
            }}
          >
            Este é o ambiente de virtual de aprendizagem.
          </Text>
          <Text
            h4
            h4Style={{
              marginLeft: 5,
              marginRight: 5,
              color: '#3f444d',
              marginTop: 25,
            }}
          >
            Aqui voce terá acesso aos seus conteúdos pedagógicos e que irá
            acompanhá-lo durante toda sua jornada.
          </Text>

          <Image
            source={this.image}
            style={{
              width: 400,
              height: 300,
            }}
          />
        </View>
      </View>
    );
  }
}
