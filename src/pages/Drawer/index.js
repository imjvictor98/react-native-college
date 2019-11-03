import React from 'react';
import { SafeAreaView, ScrollView } from 'react-navigation';
import { View } from 'react-native';
import { Icon } from 'native-base';
import { ProfilePhoto, Sidebar, SidebarList } from './styles';

export const CustomDrawerComponent = props => (
  <SafeAreaView style={{ flex: 1, backgroundColor: '#3b434e' }}>
    <Sidebar>
      <ProfilePhoto source={require('../../assets/avatar.jpg')} />
    </Sidebar>
    <ScrollView>
      <View>
        <SidebarList {...props} />
        {/* ESTILIZACAO PARA OS FILHOS DO MARGIN TOP,
        AULA DO DIEGO, NAO ESTILIZAR O PRIMEIRO, MAS SIM SEUS FILHOS */}
      </View>
    </ScrollView>
  </SafeAreaView>
);
