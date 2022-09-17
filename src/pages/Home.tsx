import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, Title, Greetings, Input, Input2, Input3 } from './styles';
import { Button } from '../components/Button/Button';
import { InfoCard } from '../components/InfoCard/InfoCard';


interface IInfoData {
  id: string;
  nome: string;
  email: string;
  telefone: string;
} 

export function Home() {
  
  const [novoCadastro, setNovoCadastro] = useState('');
  const [novoEmail, setNovoEmail] = useState('');
  const [novoTelefone, setNovoTelefone] = useState('');
  const [gravarDados, setGravarDados] = useState<IInfoData[]>([]);
  const [greetings, setGreetings] = useState('');

  function handleAddNewInfo() {
    const data = {
      id: String(new Date().getTime()),
      nome: novoCadastro,
      email: novoEmail,
      telefone: novoTelefone,
    }

    setGravarDados([...gravarDados, data])
    setNovoCadastro('')
    setNovoEmail('')
    setNovoTelefone('')
  }

  function handleRemoveInfo(id: string) {
    setGravarDados(gravarDados => gravarDados.filter(info => info.id !== id))
  }

  useEffect(() => {
    const currentHour = new Date().getHours()
    if (currentHour < 12) {
      setGreetings('Bom dia!')
    } else if(currentHour >= 12 && currentHour < 18) {
      setGreetings('Boa Tarde!')
    } else {
      setGreetings('Boa Noite!')
    }
  }, [])

  useEffect(() => {
    async function loadData() {
      const storagedInfo = await AsyncStorage.getItem('@gravardados:infos')
      if(storagedInfo) {
        setGravarDados(JSON.parse(storagedInfo))
      }
    }
    loadData();

    // async function removeAll() {
    //   await AsyncStorage.removeItem('@gravardados:infos')
    // }
  }, []);

  useEffect(() => {
    async function saveData() {
    await AsyncStorage.setItem('@gravardados:infos', JSON.stringify(gravarDados));
    }
    saveData();
  }, [gravarDados]);

  return (
    <>
    <Container>

    <Greetings> 
        {greetings}
      </Greetings>

      <Title>Cadastro de informações!</Title>

      <Input placeholder='Nome' 
      placeholderTextColor='#050A0E' 
      value={novoCadastro}
      onChangeText={value => setNovoCadastro(value)} />

        <Input2 placeholder='Email' 
          placeholderTextColor='#050A0E' 
          value={novoEmail}
            onChangeText={value => setNovoEmail(value)} />

        <Input3 placeholder='Telefone' 
          placeholderTextColor='#050A0E' 
          value={novoTelefone}
          onChangeText={value => setNovoTelefone(value)} /> 

      
      <Button 
        title="Adicionar"
        onPress={handleAddNewInfo} />

      <Title style={{ marginVertical: 20 }}>Meus Cadastros</Title>

      <FlatList showsVerticalScrollIndicator={true}
          data={gravarDados}
          keyExtractor={item => item.id}
          renderItem = {({ item }) => (
            <InfoCard 
              info={item.nome}
              info2={item.email}
              info3={item.telefone}
              onPress={() => handleRemoveInfo(item.id)}
              />
          )}
      />

    
    </Container>
      </>
  );
}
