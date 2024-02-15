import React from 'react'
import { StyleSheet, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Loading from './components/loading'

export default function App() {
  return (
    <View style={style.container}>
      <StatusBar style='light' />
      <Loading />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(17 24 39)',
  },
})
