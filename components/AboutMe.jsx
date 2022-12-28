import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const AboutMe = () => {
  return (
    <View className="w-full flex flex-col items-center ">
            <Image
              source={require('../assets/icon.png')}
              className="w-36 h-36"
            />
            <Text className="pt-5 text-2xl font-bold">Leitner Box</Text>
            <Text className="pt-2 font-semibold">
              An app for memorizing vocabulary.
            </Text>
            <Text className="pt-8 font-bold text-xl text-slate-800">
              Contact me:
            </Text>
            <TouchableOpacity
              onPress={() => Linking.openURL('mailto:ahuradelnava@gmail.com')}>
              <Text className="pt-2 text-lg font-semibold text-cyan-600">
                ahuradelnava@gmail.com
              </Text>
            </TouchableOpacity>
          </View>
  )
}

export default AboutMe