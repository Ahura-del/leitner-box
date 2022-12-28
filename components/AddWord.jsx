import React from "react";
import { View, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";

const AddWord = ({ addHandler, setTextValue, textValue }) => {
  return (
    <View className=" flex flex-col gap-3">
      <Text className="text-center text-xl text-slate-600 font-bold">
        ADD NEW WORD
      </Text>
      <TextInput
        className="bg-slate-50 placeholder:text-gray-300"
        mode="outlined"
        label="English"
        value={textValue.english}
        onChangeText={(text) => setTextValue({ ...textValue, english: text })}
      />
      <TextInput
        className="bg-slate-50 placeholder:text-gray-300"
        mode="outlined"
        contentStyle={{ fontFamily: "Vazirmatn-Regular" }}
        label="Pronounce"
        value={textValue.pronounce}
        onChangeText={(text) => setTextValue({ ...textValue, pronounce: text })}
      />
      <TextInput
        className="bg-slate-50 placeholder:text-gray-300"
        mode="outlined"
        contentStyle={{ fontFamily: "Vazirmatn-Regular" }}
        label="Persian"
        value={textValue.persian}
        onChangeText={(text) => setTextValue({ ...textValue, persian: text })}
      />
      <Button
        icon="plus"
        mode="contained"
        labelStyle={{ paddingVertical: 5, fontSize: 18 }}
        onPress={addHandler}
      >
        <Text>Add</Text>
      </Button>
    </View>
  );
};

export default AddWord;
