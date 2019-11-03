import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
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

export default class Disciplinas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProfessor: false,
      isAluno: false,
      selected: 1,
      disciplinas: [],
      semestres: 0,
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;

    const response = await api.post('/aluno/semestre');

    const { disciplinas, semestres } = response.data;

    this.setState({
      isAluno: navigation.state.params.user.isAluno,
      isProfessor: navigation.state.params.user.isProfessor,
      semestres,
      disciplinas,
    });
  }

  keyExtractor = (item, index) => index.toString();

  render() {
    const { navigation } = this.props;
    const {
      isAluno,
      isProfessor,
      selected,
      semestres,
      disciplinas,
    } = this.state;
    const qtdSemestres = [];

    for (let i = 1; i <= semestres; i += 1) qtdSemestres.push(i);

    return (
      <View>
        <Header>
          <Left>
            <Icon
              name="ios-arrow-back"
              onPress={() =>
                navigation.navigate('Dashboard', {
                  user: {
                    isAluno,
                    isProfessor,
                  },
                })
              }
            />
          </Left>
          <Body>
            <Title>{isAluno ? `Semestre ${selected}` : 'Professor'}</Title>
          </Body>
          <Right />
        </Header>
        <Form style={{ display: 'flex' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text>Escolha o semestre: </Text>
            <Picker
              note
              mode="dropdown"
              style={{ width: 120 }}
              selectedValue={selected}
              onValueChange={value => this.setState({ selected: value })}
              iosHeader="Semestres"
              headerBackButtonText="Voltar"
              iosIcon={<Icon name="arrow-down" />}
            >
              {qtdSemestres.map(semestre => (
                <Picker.Item
                  label={semestre}
                  value={semestre}
                  key={this.keyExtractor}
                />
              ))}
            </Picker>
          </View>
        </Form>
        {disciplinas.map(d => (
          <Text>
            {d.IT_SEMESTRE === selected ? d.ST_NOME_DISCIPLINA : null}
          </Text>
        ))}
      </View>
    );
  }
}
