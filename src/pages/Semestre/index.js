import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import {
  Header,
  Left,
  Icon,
  Body,
  Title,
  Right,
  Form,
  Picker,
} from 'native-base';

import api from '../../config/api';
import ScrollViewFS from '../../components/ScrollViewFullScreen';
import { FormContainer, SemestreText } from './styles';

export default class Disciplinas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 1,
      disciplinas: [],
      semestres: 0,
    };
  }

  async componentDidMount() {
    const response = await api.post('/aluno/semestre');

    const { disciplinas, semestres } = response.data;

    this.setState({
      semestres,
      disciplinas,
    });
  }

  keyExtractor = (item, index) => index.toString();

  renderSubTitle = item => {
    return (
      <View>
        <Text
          style={{
            fontSize: 16,
            color: '#333',
          }}
          numberOfLines={1}
        >{`Semestre: ${item.IT_SEMESTRE}`}</Text>
        <Text
          style={{
            fontSize: 16,
            color: '#333',
          }}
        >{`Nota: ${
          item.FL_NOTA_ALUNO === null ? 'Não avaliado' : item.FL_NOTA_ALUNO
        }`}</Text>
      </View>
    );
  };

  render() {
    const { navigation } = this.props;
    const { selected, semestres, disciplinas } = this.state;
    const qtdSemestres = [];

    for (let i = 1; i <= semestres; i += 1) qtdSemestres.push(i);

    return (
      <View style={{ backgroundColor: '#e6ebef' }}>
        <Header style={{ backgroundColor: '#e6ebef' }} translucent>
          <Left>
            <Icon
              name="ios-arrow-back"
              onPress={() =>
                navigation.navigate('Dashboard', {
                  user: {
                    isAluno: true,
                    isProfessor: false,
                  },
                })
              }
            />
          </Left>
          <Body>
            <Title style={{ color: '#1f2e2e', fontWeight: 'bold' }}>
              Semestres
            </Title>
          </Body>
          <Right />
        </Header>

        <Form style={{ display: 'flex' }}>
          <FormContainer>
            <SemestreText>Escolha o semestre: </SemestreText>
            <Picker
              note
              mode="dropdown"
              style={{ width: 10, marginTop: 2 }}
              selectedValue={selected}
              onValueChange={value => this.setState({ selected: value })}
              iosHeader="Semestres"
              headerBackButtonText="Voltar"
            >
              {qtdSemestres.map(semestre => (
                <Picker.Item
                  label={semestre}
                  value={semestre}
                  key={this.keyExtractor}
                />
              ))}
            </Picker>
          </FormContainer>
        </Form>
        <ScrollViewFS>
          {disciplinas.map(d => {
            if (d.IT_SEMESTRE === selected) {
              return (
                <ListItem
                  key={d.ST_NOME_DISCIPLINA + d.FL_NOTA_ALUNO}
                  titleStyle={{
                    color: '#3f444d',
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}
                  title={`${d.ST_NOME_DISCIPLINA}`}
                  titleProps={{ numberOfLines: 1 }}
                  subtitle={this.renderSubTitle(d)}
                  topDivider
                  bottomDivider
                />
              );
            }
          })}
        </ScrollViewFS>
      </View>
    );
  }
}
