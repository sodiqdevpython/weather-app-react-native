import React, { useState, useEffect } from 'react'
import {
  Platform,
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
} from 'react-native'
import * as Location from 'expo-location'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome6 } from '@expo/vector-icons'
import axios from 'axios'
export default function Default({ weatherData }) {
  const [location, setLocation] = useState({})
  const [errorMsg, setErrorMsg] = useState(null)
  const [lat, setLat] = useState(55.3047)
  const [long, setLong] = useState(25.2582)

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied')
      return
    }

    let location = await Location.getCurrentPositionAsync({})
    setLocation(location)
    // setLat(location.coords.latitude)
    // setLong(location.coords.longitude)

    const fetchData = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=12110f81abfb2f7e75b2ca2d1572d95c&units=metric`
    )
    console.log(fetchData.data)
    weatherData.main.temp = await fetchData.data.main.temp
    weatherData.weather[0].main = await fetchData.data.weather[0].main
    weatherData.weather[0].description = await fetchData.data.weather[0]
      .description
    weatherData.name = await fetchData.data.name
    console.log(1)
  }

  let text = 'Waiting..'
  if (errorMsg) {
    text = errorMsg
  } else if (location) {
    text = JSON.stringify(location)
  }

  return (
    <View style={style.mainContainer}>
      <LinearGradient
        colors={['rgb(74 179 223)', 'rgb(61 121 205)']}
        style={{ flex: 1 }}
      >
        {/* SearchBar */}
        <View style={style.searchBar}>
          <TextInput
            style={{
              width: '80%',
              backgroundColor: 'white',
              paddingVertical: 5,
              paddingHorizontal: 7,
              borderRadius: 5,
            }}
            placeholder='Dubai'
          />
          <Button title='search' />
        </View>
        {/* /SearchBar */}

        {/* Gradus degree */}
        <View style={style.gradus}>
          <View style={{ flex: 2, justifyContent: 'center' }}>
            <Ionicons name='sunny' size={150} color='yellow' />
          </View>
          <View style={{ flex: 1, justifyContent: 'flex-start' }}>
            <Text
              style={{
                color: 'white',
                fontSize: 48,
                fontStyle: 'italic',
                fontWeight: 200,
              }}
            >
              {weatherData.main.temp}°
            </Text>
          </View>
        </View>
        {/* /Gradus degree */}

        {/* More detail */}
        <View style={style.detail}>
          <Text
            style={{
              fontSize: 32,
              fontStyle: 'italic',
              color: 'white',
              fontWeight: '200',
            }}
          >
            {weatherData.weather[0].main} / {weatherData.weather[0].description}
          </Text>
          <Text
            style={{
              paddingTop: 30,
              fontSize: 32,
              color: 'white',
              fontWeight: '300',
              fontStyle: 'italic',
            }}
          >
            {weatherData.name}
          </Text>
        </View>
        {/* /More detail */}

        {/* GPS */}
        <View style={style.gps}>
          <TouchableOpacity onPress={getLocation}>
            <FontAwesome6 name='location-dot' size={48} color='red' />
            <Text></Text>
          </TouchableOpacity>
        </View>
        {/* /GPS */}
      </LinearGradient>
    </View>
  )
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  gradus: {
    flex: 4,
    alignItems: 'center',
  },
  detail: {
    flex: 4,
    alignItems: 'center',
  },
  gps: {
    flex: 1,
    alignItems: 'flex-end',
    paddingHorizontal: 30,
  },
  searchBar: {
    flexDirection: 'row',
    paddingTop: '10%',
    paddingHorizontal: '2%',
    justifyContent: 'space-between',
  },
})
