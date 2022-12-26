import React from "react";
import { Image, Text, View } from "react-native";

const NotWord = () => {
  return (
    <View className="flex flex-col items-center">
      <Image source={require("../assets/write.png")} />
      <Text className="text-center text-gray-500 ">No word!</Text>
    </View>
  );
};

export default NotWord;
