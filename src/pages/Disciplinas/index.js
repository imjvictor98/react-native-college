import React, { Component } from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import DropDownItem from 'react-native-drop-down-item';
import { ListItem, SearchBar } from 'react-native-elements';
import { Header, Left, Icon, Body, Title, Right } from 'native-base';
import ScrollViewFS from '../../components/ScrollViewFullScreen';
import api from '../../config/api';

// import { Container } from './styles';

export default class Disciplinas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProfessor: false,
      isAluno: false,
      resultado: [],
      loading: false,
    };
    this.arrayHolder = [];
  }

  async componentDidMount() {
    const { navigation } = this.props;

    const response = await api.post('/aluno/todas');

    const { resultado } = response.data;

    this.arrayHolder = resultado;

    this.setState({
      isAluno: navigation.state.params.user.isAluno,
      isProfessor: navigation.state.params.user.isProfessor,
      resultado,
      loading: false,
    });
  }

  searchFilterFunction = text => {
    const newData = this.arrayHolder.filter(item => {
      const itemData = item.ST_NOME_DISCIPLINA.toUpperCase();

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    this.setState({ resultado: newData });
  };

  renderHeader = () => {
    const { resultado } = this.state;
    return (
      <SearchBar
        placeholder="Nome da disciplina"
        darkTheme
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={resultado}
        returnKeyType="done"
        loadingProps={{
          color: '#3e444d',
        }}
      />
    );
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <ListItem
      key={this.keyExtractor}
      titleStyle={{ color: '#3f444d', fontSize: 18, fontWeight: 'bold' }}
      title={`${item.ST_NOME_DISCIPLINA}`}
      titleProps={{ numberOfLines: 1 }}
      subtitle={
        <View>
          <Text
            style={{
              fontSize: 16,
              color: '#333',
            }}
            numberOfLines={1}
          >
            Professor: {item.ST_NOME_PROFESSOR}
          </Text>
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
          >{`Nota: ${item.FL_NOTA_ALUNO}`}</Text>
        </View>
      }
      bottomDivider
    />
  );

  render() {
    const { navigation } = this.props;
    const { isAluno, isProfessor, resultado, loading } = this.state;

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
            <Title>{isAluno ? `Disciplinas` : 'Professor'}</Title>
          </Body>
          <Right />
        </Header>
        <ScrollViewFS>
          {loading ? (
            <ActivityIndicator
              color="#3f444d"
              style={{ marginTop: 300, marginBottom: 300 }}
              size="large"
            />
          ) : (
            <FlatList
              data={resultado}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
              ListHeaderComponent={this.renderHeader}
            />
          )}
        </ScrollViewFS>
      </View>
    );
  }
}
