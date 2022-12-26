import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import {  TextInput } from "react-native-paper";

const ExamWord = ({ testWord, rebuildHandle }) => {
  const [answer, setAnswer] = useState("");
  const [response, setResponse] = useState(true);


  const checkHandle = () => {
    if (answer === "") return;
    if (testWord.persian === answer) {
      setResponse(true);
      setAnswer("");
      rebuildHandle();
    } else {
      setResponse(false);
      return;
    }
  };

  return (
    <View className="flex flex-col justify-center text-center items-center w-full gap-4">
      <Text className="text-3xl bg-slate-100 w-full p-3 text-center rounded-md">
        {testWord.english}
      </Text>
      <TextInput
        value={answer}
        onChangeText={(text) => setAnswer(text)}
        style={{ fontFamily: "Vazirmatn-Regular" }}
        placeholder="ترجمه"
        mode="flat"
        className="bg-gray-50 text-center w-full"
      />
      <TouchableOpacity
        onPress={checkHandle}
        className={`w-full py-3 flex justify-center items-center rounded-md ${
          response ? "bg-teal-700" : "bg-red-600"
        } `}
      >
        <Text className="text-white">Check</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExamWord;
