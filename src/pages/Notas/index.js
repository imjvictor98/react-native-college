import React, { Component } from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';
import { Header, Left, Body, Title, Right, Icon, Picker } from 'native-base';
import { ListItem } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';
import api from '../../config/api';
import {
  SubmitButton,
  InputText,
  TextLabel,
  Container,
  DataContainer,
  DataText,
  DataContent,
  ButtonContent,
} from './styles';

export default class Disciplinas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
      notaGT10: false,
      hasFinded: false,
      form: {
        disciplina: '',
        semestre: 0,
        turma: 0,
        idDisciplina: 0,
      },
      user: {
        disciplinas: [],
        ListSemestres: [],
        ListTurmas: [],
        ListDisciplinas: [],
        idDisciplina: 0,
      },
      rows: [],
    };
  }

  async componentDidMount() {
    const response = await api.get('/professor/dadosSemestre');
    const { error } = response.data;

    if (!response.error) {
      const {
        disciplinas,
        ListSemestres,
        ListTurmas,
        ListDisciplinas,
      } = response.data;

      const { user } = this.state;
      const novoObjeto = user;

      novoObjeto.ListDisciplinas = ListDisciplinas;
      novoObjeto.ListSemestres = ListSemestres;
      novoObjeto.ListTurmas = ListTurmas;
      novoObjeto.disciplinas = disciplinas;
      this.setState({
        user: novoObjeto,
      });
    }
    if (error) {
      showMessage({
        message: `${error}`,
        type: 'danger',
        duration: 2000,
      });
    }
  }

  lancarNotas = async () => {
    const { form } = this.state;
    const { semestre, turma } = form;
    const { user } = this.state;

    await api
      .post('/professor/notas', {
        materia: {
          semestre,
          turma,
          disciplina: user.idDisciplina,
        },
        usuarios: user.disciplinas,
      })
      .then(resolve => {
        showMessage({
          message: 'Notas lançadas com sucesso',
          type: 'success',
          duration: 2000,
        });
      })
      .catch(reject => {
        showMessage({
          message: `ERRO: ${reject.problem}`,
          type: 'danger',
          duration: 2000,
        });
      });
  };

  buscarNotas = async () => {
    const { form } = this.state;
    const { semestre, turma, disciplina } = form;

    const response = await api.post('/professor/mostrarNotas', {
      semestre,
      turma,
      disciplina,
    });
    this.setState({
      flag: true,
      hasFinded: true,
      rows: response.data.rows,
    });
  };

  keyExtractor = (item, index) => {
    return index.toString();
  };

  checkValidValue = (value, index) => {
    if (
      (value >= 0 && value <= 10) ||
      (Number.isNaN(value) === true || value === 'undefined')
    ) {
      const { user, rows } = this.state;
      const novoObjeto = user;
      const novoArray = [...rows];
      novoArray[index].FL_NOTA_ALUNO = value;
      novoObjeto.disciplinas = novoArray;
      novoObjeto.idDisciplina = novoArray[0].INT_ID_DISCIPLINA;

      this.setState({
        user: novoObjeto,
        notaGT10: false,
      });
    } else {
      showMessage({
        message: 'A nota deve ser válida!',
        type: 'danger',
        duration: 2000,
      });
      this.setState({ notaGT10: true });
    }
  };

  renderSubTitle = (item, index) => {
    return (
      <View style={{ display: 'flex' }}>
        <TextLabel>Aluno: {item.ST_COD_ALUNO}</TextLabel>

        <View style={{ flexDirection: 'row' }}>
          <TextLabel>Nota: </TextLabel>
          <InputText
            onChangeText={value => {
              this.checkValidValue(value, index);
            }}
            placeholder={`${item.FL_NOTA_ALUNO}`}
          />
        </View>
      </View>
    );
  };

  renderItem = ({ item, index }) => (
    <SafeAreaView>
      <ListItem
        key={this.keyExtractor}
        titleStyle={{ color: '#3f444d', fontSize: 18, fontWeight: 'bold' }}
        title={`${item.ST_NOME_DISCIPLINA}`}
        titleProps={{ numberOfLines: 1 }}
        subtitle={this.renderSubTitle(item, index)}
        bottomDivider
        topDivider
      />
    </SafeAreaView>
  );

  pushGrades = () => {
    const { hasFinded, notaGT10 } = this.state;
    if (hasFinded && notaGT10 === false) {
      return <SubmitButton title="Lançar notas" onPress={this.lancarNotas} />;
    }
    return (
      <SubmitButton
        title="Lançar notas"
        onPress={this.lancarNotas}
        disabled
        disabledStyle={{
          backgroundColor: '#3f444ddd',
        }}
      />
    );
  };

  render() {
    const { navigation } = this.props;
    const { form, flag, user, rows } = this.state;

    return (
      <Container>
        <Header style={{ backgroundColor: '#e6ebef' }} translucent>
          <Left>
            <Icon
              name="ios-arrow-back"
              onPress={() =>
                navigation.navigate('Dashboard', {
                  user: {
                    isAluno: false,
                    isProfessor: true,
                  },
                })
              }
            />
          </Left>
          <Body>
            <Title style={{ color: '#1f2e2e', fontWeight: 'bold' }}>
              Notas
            </Title>
          </Body>
          <Right />
        </Header>

        <DataContainer>
          <DataContent>
            <DataText>Semestre:</DataText>
            <Picker
              note
              mode="dropdown"
              style={{ marginHorizontal: 2 }}
              selectedValue={form.semestre}
              onValueChange={value => {
                const novoObjeto = form;
                novoObjeto.semestre = value;
                this.setState({ form: novoObjeto });
              }}
              iosHeader="Semestres"
              headerBackButtonText="Voltar"
              placeholder={user.ListSemestres[0]}
              iosIcon={<Icon name="arrow-down" />}
            >
              {user.ListSemestres.map(semestre => (
                <Picker.Item label={semestre} value={semestre} key={semestre} />
              ))}
            </Picker>
          </DataContent>

          <DataContent>
            <DataText>Turma:</DataText>
            <Picker
              note
              mode="dropdown"
              style={{ marginHorizontal: 29 }}
              selectedValue={form.turma}
              onValueChange={value => {
                const novoObjeto = form;
                novoObjeto.turma = value;
                this.setState({ form: novoObjeto });
              }}
              iosHeader="Turmas"
              headerBackButtonText="Voltar"
              placeholder={user.ListTurmas[0]}
              iosIcon={<Icon name="arrow-down" />}
            >
              {user.ListTurmas.map(turma => (
                <Picker.Item label={turma} value={turma} key={turma} />
              ))}
            </Picker>
          </DataContent>

          <DataContent>
            <DataText>Disciplina:</DataText>
            <Picker
              note
              mode="dropdown"
              style={{ marginHorizontal: 0 }}
              selectedValue={form.disciplina}
              onValueChange={value => {
                const { form } = this.state;
                const novoObjeto = form;
                novoObjeto.disciplina = value;
                this.setState({ form: novoObjeto });
              }}
              placeholder="Ex: Programação"
              iosHeader="Disciplinas"
              headerBackButtonText="Voltar"
              iosIcon={<Icon name="arrow-down" />}
            >
              {user.ListDisciplinas.map(d => (
                <Picker.Item label={d} value={d} key={d} />
              ))}
            </Picker>
          </DataContent>

          <ButtonContent>
            <SubmitButton title="Mostrar alunos" onPress={this.buscarNotas} />
            {this.pushGrades()}
          </ButtonContent>

          <View>
            {flag ? (
              <View>
                <SafeAreaView>
                  <FlatList
                    data={rows}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                  />
                </SafeAreaView>
              </View>
            ) : null}
          </View>
        </DataContainer>
      </Container>
    );
  }
}
