import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import AnimatedLoader from 'react-native-animated-loader'
import Default from './default'
import axios from 'axios'

export default function Loading() {
  const [isLoading, setIsLoading] = useState(true)
  const [weatherData, setWeatherData] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      const getData = await axios.get(
        'https://api.openweathermap.org/data/2.5/weather?q=dubai&appid=12110f81abfb2f7e75b2ca2d1572d95c&units=metric'
      )
      // setData(getData.data)
      setWeatherData(getData.data)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  function load() {
    if (isLoading) {
      return (
        <View style={style.loading}>
          <AnimatedLoader
            source={require('../assets/animation.json')}
            visible={true}
            animationStyle={style.lottie}
            speed={4}
          ></AnimatedLoader>
        </View>
      )
    } else {
      return <Default weatherData={weatherData} />
    }
  }
  return load()
}

const style = StyleSheet.create({
  loading: {
    flex: 1,
  },
  lottie: {
    width: 300,
    height: 300,
  },
})
