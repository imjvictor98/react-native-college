import React, { Component } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { Icon, Left, Right, Text, Body, Title } from 'native-base';
import {
  DashboardHeader,
  Container,
  Painel,
  OptionContainer,
  OptionContent,
  BlockContent,
  LeftIcon,
  RightIcon,
  ProfilePhoto,
  PersonalContainer,
  PersonalContent,
  TextName,
  TextBold,
  TextMatricula,
  TextTelefone,
  BoxCodigo,
  BoxTelefone,
} from './styles';
import api from '../../config/api';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codigo: '',
      nome: '',
      telefone: '',
      foto: {
        file_url: '',
      },
      email: '',
      isAluno: false,
      isProfessor: false,
      loading: true,
    };
  }

  componentDidMount() {
    this.loadProfile();
  }

  // componentDidUpdate(_, prevState) {
  //   if (this.state !== prevState) {

  //   }
  // }

  loadProfile = async () => {
    const { navigation } = this.props;
    let response;
    const { isProfessor, isAluno } = this.state;

    if (isProfessor === false && isAluno === false) {
      if (navigation.state.params.user.isAluno) {
        response = await api.post('/aluno/dashboard');
        this.setState({
          isAluno: true,
          isProfessor: false,
        });
      } else {
        response = await api.post('/professor/dashboard');
        this.setState({
          isAluno: false,
          isProfessor: true,
        });
      }
    }

    if (
      response.data.foto === null ||
      !response.data.foto ||
      response.data === undefined
    ) {
      const { foto } = this.state;
      const novoObjeto = foto;
      novoObjeto.file_url =
        'http://localhost:3333/files/4cb8c221aa1d2df5620d97dc98a49dec.png';
      this.setState({ foto: novoObjeto });
    } else {
      this.setState({ foto: response.data.foto });
    }

    this.setState({
      codigo: response.data.cod_aluno || response.data.cod_professor,
      nome: response.data.nome,
      telefone: response.data.telefone,
      email: response.data.email,
      loading: false,
    });
  };

  render() {
    const { navigation } = this.props;
    const {
      codigo,
      telefone,
      nome,
      foto,
      email,
      isAluno,
      isProfessor,
      loading,
    } = this.state;

    return (
      <SafeAreaView>
        {loading ? (
          <ActivityIndicator
            color="#3e444d"
            style={{ marginTop: 300, marginBottom: 300 }}
            size="large"
          />
        ) : (
          <Container>
            <DashboardHeader>
              <Left>
                <LeftIcon onPress={() => navigation.openDrawer()} />
              </Left>
              <Body>
                <Title style={{ color: '#e6ebef' }}>AVA FIRST</Title>
              </Body>
              <Right>
                <RightIcon onPress={() => navigation.navigate('Sign')} />
              </Right>
            </DashboardHeader>
            <Painel>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}
              >
                <ProfilePhoto source={{ uri: foto.file_url }} />

                <TextName>Bem-vindo, {nome}</TextName>
              </View>

              <PersonalContainer>
                <PersonalContent>
                  <BoxCodigo>
                    <TextBold>Matrícula: </TextBold>
                    <TextMatricula>{codigo}</TextMatricula>
                  </BoxCodigo>

                  <BoxTelefone>
                    <TextBold>Telefone: </TextBold>
                    <TextTelefone>{telefone}</TextTelefone>
                  </BoxTelefone>
                </PersonalContent>
              </PersonalContainer>

              <OptionContainer>
                {isAluno ? (
                  <OptionContent>
                    <BlockContent>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('Semestre', {
                            user: {
                              isAluno,
                              isProfessor,
                            },
                          })
                        }
                      >
                        <View style={{ display: 'flex' }}>
                          <Icon
                            name="md-school"
                            style={{ color: '#9b9c9e', marginLeft: 20 }}
                          />

                          <Text
                            style={{
                              color: '#3f444d',
                              fontWeight: 'bold',
                            }}
                          >
                            Semestres
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </BlockContent>
                    <BlockContent>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('Disciplinas', {
                            user: {
                              isAluno,
                              isProfessor,
                            },
                          });
                        }}
                      >
                        <Icon
                          name="md-bookmarks"
                          style={{ marginLeft: 25, color: '#9b9c9e' }}
                        />
                        <Text
                          style={{
                            color: '#3f444d',
                            fontWeight: 'bold',
                          }}
                        >
                          Disciplinas
                        </Text>
                      </TouchableOpacity>
                    </BlockContent>
                    <BlockContent>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('Settings', {
                            codigo,
                            telefone,
                            nome,
                            foto,
                            email,
                            isAluno,
                            isProfessor,
                          })
                        }
                      >
                        <Icon
                          name="md-person"
                          style={{
                            color: '#9b9c9e',
                            marginLeft: 10,
                          }}
                        />
                        <Text
                          style={{
                            color: '#3f444d',
                            fontWeight: 'bold',
                          }}
                        >
                          Perfil
                        </Text>
                      </TouchableOpacity>
                    </BlockContent>
                  </OptionContent>
                ) : (
                  <OptionContent>
                    <BlockContent>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('Notas')}
                      >
                        <View style={{ display: 'flex' }}>
                          <Icon
                            name="md-contacts"
                            style={{ color: '#9b9c9e', marginLeft: 30 }}
                          />

                          <Text
                            style={{
                              color: '#3f444d',
                              fontWeight: 'bold',
                            }}
                          >
                            Lançar notas
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </BlockContent>

                    <BlockContent>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('Settings', {
                            codigo,
                            telefone,
                            nome,
                            foto,
                            email,
                            isAluno,
                            isProfessor,
                          })
                        }
                      >
                        <Icon
                          name="md-person"
                          style={{
                            color: '#9b9c9e',
                            marginLeft: 10,
                          }}
                        />
                        <Text
                          style={{
                            color: '#3f444d',
                            fontWeight: 'bold',
                          }}
                        >
                          Perfil
                        </Text>
                      </TouchableOpacity>
                    </BlockContent>
                  </OptionContent>
                )}
              </OptionContainer>
            </Painel>
          </Container>
        )}
      </SafeAreaView>
    );
  }
}
Dashboard.navigationOptions = {
  title: 'Dashboard',
};
