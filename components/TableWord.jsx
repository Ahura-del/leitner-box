import React, {useRef, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';

const TableWord = ({words, deleteHandle, test, editHandle, setScreen}) => {
  const [showPersian, setShowPersian] = useState(false);
  const closeRef = useRef();
  const [showEnglish, setShowEnglish] = useState(false);
  const [showPronounce, setShowPronounce] = useState(false);
  const testHandler = e => {
    setScreen(e.nativeEvent.contentOffset.y > 2);
  };
  const rightSwipeActions = e => (
    <TouchableOpacity
      onPress={() => deleteHandle(e)}
      className="bg-red-600 flex items-center justify-center w-32">
      <Text className="text-white">Delete</Text>
    </TouchableOpacity>
  );

  const leftSwipeAction = e => (
    <TouchableOpacity
      onPress={() => {
        closeRef.current?.close();
        editHandle(e);
      }}
      className="bg-cyan-500 flex items-center justify-center w-32">
      <Text className="text-white">Edit</Text>
    </TouchableOpacity>
  );

  return (
    <View className="pb-[100px]">
      <View className="w-full bg-slate-100  fixed top-0 ">
        <View className="flex flex-row justify-between items-center  p-4 ">
          <TouchableOpacity onPress={() => setShowEnglish(!showEnglish)}>
            <Text className="text-slate-900 underline font-semibold ">English</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowPronounce(!showPronounce)}>
            <Text className="text-slate-900 underline font-semibold ">Pronounce</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowPersian(!showPersian)}>
            <Text className="text-slate-900 underline font-semibold ">Persian</Text>
          </TouchableOpacity>
        </View>
      </View>
      {!test && (
        <GestureHandlerRootView className="mb-2">
          <FlatList
            onScroll={testHandler}
            scrollEnabled={true}
            data={words}
            renderItem={({item}) => {
              return (
                <Swipeable
                  renderRightActions={() => rightSwipeActions(item.id)}
                  ref={closeRef}
                  renderLeftActions={() => leftSwipeAction(item.id)}>
                  <View className="flex flex-row justify-between border-b border-slate-400  p-4">
                    {!showEnglish ? (
                      <Text className="text-slate-900   text-left basis-[30%]">
                        {item.english}
                      </Text>
                    ) : (
                      <Text className="text-slate-900  text-left basis-[30%]">
                        .....
                      </Text>
                    )}
                    {!showPronounce ? (
                      <Text style={{fontFamily: 'Vazirmatn-Regular'}} className="text-slate-900  text-center basis-[30%]">
                        {item.pronounce ? item.pronounce : '.....'}
                      </Text>
                    ) : (
                      <Text className="text-slate-900  text-center basis-[30%]">
                        .....
                      </Text>
                    )}
                    {!showPersian ? (
                      <Text
                        style={{fontFamily: 'Vazirmatn-Regular'}}
                        className="text-slate-900  text-right basis-[30%]">
                        {item.persian}
                      </Text>
                    ) : (
                      <Text className="text-slate-900  text-right basis-[30%]">
                        .....
                      </Text>
                    )}
                  </View>
                </Swipeable>
              );
            }}
            keyExtractor={item => item.id}
          />
        </GestureHandlerRootView>
      )}
    </View>
  );
};

export default TableWord;
