import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TextInput } from 'react-native';
import CoinItem from './components/CoinItem';

const App = () => {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false)

  const loadDAta = async () => {
    const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    const data = await res.json()
    setCoins(data)
  }

  useEffect(() => {
    loadDAta()
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#2f8' />
      <View style={styles.header}>
        <Text style={styles.title}>CryptoMarket</Text>
        <TextInput 
          style={styles.search}
          placeholder='Search a Coin'
          placeholderTextColor={'#f9f9f9'}
          onChangeText={text => setSearch(text)}
        />
      </View>
      <FlatList 
        style={styles.list}
        data={
          coins.filter(
            (coin) =>
             coin.name.toLowerCase().includes(search) || 
             coin.symbol.toLowerCase().includes(search) 
             )}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={ async() => {
          setRefreshing(true)
          await loadDAta()
          setRefreshing(false)
        }}
        renderItem={({item}) => {
          return <CoinItem coin={item} />
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title:{
    color: '#2f8',
    fontSize: 20,
    marginTop: 10,
  },
  list: {
    width: '90%',
  },
  header:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 10,
  },
  search:{
    color: '#2f8',
    borderBottomColor: '#2f8',
    borderBottomWidth: 1,
    width: '40%',
    textAlign: 'center',
  },
})

export default App
