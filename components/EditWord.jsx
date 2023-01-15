import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

const EditWord = ({word, changeWord}) => {
  const [currentWord, setCurrentWord] = useState({
    english: word.english,
    pronounce: word.pronounce,
    persian: word.persian,
  });

  const changeHandler = () => {
    const newWord = {
      id: word.id,
      english: currentWord.english,
      pronounce: currentWord.pronounce,
      persian: currentWord.persian,
    };
    changeWord(word, newWord);
  };
  return (
    <View className=" flex flex-col gap-3">
      <Text className="text-center text-xl text-slate-600 font-bold">
        EDIT WORD
      </Text>
      <TextInput
        className="bg-slate-50 placeholder:text-gray-300"
        mode="outlined"
        label="English"
        value={currentWord.english}
        onChangeText={text => setCurrentWord({...currentWord, english: text})}
      />
      <TextInput
        contentStyle={{fontFamily: 'Vazirmatn-Regular'}}
        className="bg-slate-50 placeholder:text-gray-300"
        mode="outlined"
        label="Pronounce"
        value={currentWord.pronounce}
        onChangeText={text => setCurrentWord({...currentWord, pronounce: text})}
      />
      <TextInput
        contentStyle={{fontFamily: 'Vazirmatn-Regular'}}
        className="bg-slate-50 placeholder:text-gray-300"
        mode="outlined"
        label="Persian"
        value={currentWord.persian}
        onChangeText={text => setCurrentWord({...currentWord, persian: text})}
      />
      <Button
        mode="contained"
        labelStyle={{paddingVertical: 5, fontSize: 18}}
        onPress={changeHandler}>
        <Text>Edit</Text>
      </Button>
    </View>
  );
};

export default EditWord;
