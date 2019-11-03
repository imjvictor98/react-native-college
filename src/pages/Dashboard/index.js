import React, { Component } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { Icon, Left, Right, Text } from 'native-base';
import { PanGestureHandler } from 'react-native-gesture-handler';
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
      foto: {},
      email: '',
      isAluno: false,
      isProfessor: false,
      loading: true,
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    let response = null;
    const { isProfessor, isAluno } = this.state;

    console.tron.log('DASHBOARD', navigation);

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

    this.setState({
      codigo: response.data.cod_aluno,
      nome: response.data.nome,
      telefone: response.data.telefone,
      foto: response.data.foto,
      email: response.data.email,
      loading: false,
    });
  }

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
                        onPress={() => navigation.navigate('Semestre')}
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
                      <TouchableOpacity>
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
