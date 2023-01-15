import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';

const SearchWord = ({searchWordObject, searchHandler, resetHandler}) => {
  const [searchWord, setSearchWord] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);
  let w = /[پچجحخهعغفقثصضشسیبلاتنمکگوئدذرزطظژؤإأءًٌٍَُِّ\s]+$/;
  const searchBtnHandler = () => {
    if (searchWord === '') {
      setErrorMsg(true);
      return;
    }
    searchHandler(searchWord);
  };
  const resetBtnHandler = () => {
    resetHandler();
    setSearchWord('');
  };
  return (
    <View>
      <View>
        <TextInput
          mode="flat"
          contentStyle={{fontFamily: 'Vazirmatn-Regular'}}
          value={searchWord}
          onChangeText={text => {
            setErrorMsg(false);
            setSearchWord(text);
          }}
          placeholder="Search..."
          className="text-center bg-slate-100 text-lg font-semibold"
        />
        <HelperText type="error" visible={errorMsg}>
          Please type a word.
        </HelperText>
      </View>
      {Object.keys(searchWordObject).length !== 0 ? (
        <View className="mt-2">
          <TextInput
            value={
              searchWordObject.pronounce === ''
                ? '.....'
                : searchWordObject.pronounce
            }
            editable={false}
            label="Pronounce"
            mode="flat"
            className="text-center bg-slate-100 text-black text-lg font-semibold"
          />

          {searchWord.match(w) ? (
            <TextInput
              value={searchWordObject.english}
              editable={false}
              mode="flat"
              label="English"
              className="text-center mt-4 bg-slate-100 text-black text-lg font-semibold"
            />
          ) : (
            <TextInput
              value={searchWordObject.persian}
              contentStyle={{fontFamily: 'Vazirmatn-Regular'}}
              editable={false}
              label="Persian"
              mode="flat"
              className="text-center mt-4 bg-slate-100 text-black text-lg font-semibold"
            />
          )}
          <TouchableOpacity
            onPress={resetBtnHandler}
            className="w-full py-4 bg-orange-500 mt-4 rounded-md">
            <Text className="text-center text-white text-xl font-semibold">
              Reset
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={searchBtnHandler}
          className="w-full py-4 bg-cyan-600 mt-2 rounded-md">
          <Text className="text-center text-white text-xl font-semibold">
            Find
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchWord;
