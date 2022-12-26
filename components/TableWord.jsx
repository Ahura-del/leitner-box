import React, { useState } from "react";
import {  FlatList, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";



const TableWord = ({ words , deleteHandle }) => {
  const [showPersian, setShowPersian] = useState(false);
  const [showEnglish, setShowEnglish] = useState(false);
  const [showPronounce, setShowPronounce] = useState(false);


  const rightSwipeActions = (e) => (
    <TouchableOpacity onPress={()=>deleteHandle(e)} className="bg-red-600 flex items-center justify-center w-32" >
      <Text className="text-white">Delete</Text>
    </TouchableOpacity>

   
  );
  


  return (
    <View className="pb-[100px]">
      <View className="w-full bg-slate-100 dark:bg-slate-800 fixed top-0 ">
        <View className="flex flex-row justify-between items-center  p-4 ">
          <TouchableOpacity onPress={() => setShowEnglish(!showEnglish)}>
            <Text className="text-slate-900 dark:text-gray-50">English</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowPronounce(!showPronounce)}>
            <Text className="text-slate-900 dark:text-gray-50">Pronounce</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowPersian(!showPersian)}>
            <Text className="text-slate-900 dark:text-gray-50">Persian</Text>
          </TouchableOpacity>
        </View>
      </View>
<GestureHandlerRootView>

      <FlatList
        scrollEnabled={true}
        data={words}
        renderItem={({ item }) => {
          return (
            <Swipeable renderRightActions={() =>rightSwipeActions(item.id)}>
              <View className="flex flex-row justify-between border-b  border-slate-400 dark:border-slate-300 p-4">
                {!showEnglish ? (
                  <Text className="text-slate-900 dark:text-gray-50  text-left basis-[30%]">
                    {item.english}
                  </Text>
                ) : (
                  <Text className="text-slate-900 dark:text-gray-50 text-left basis-[30%]">
                    .....
                  </Text>
                )}
                {!showPronounce ? (
                  <Text className="text-slate-900 dark:text-gray-50 text-center basis-[30%]">
                    {item.pronounce ? item.pronounce : "....."}
                  </Text>
                ) : (
                  <Text className="text-slate-900 dark:text-gray-50 text-center basis-[30%]">
                    .....
                  </Text>
                )}
                {!showPersian ? (
                  <Text
                    style={{ fontFamily: "Vazirmatn-Regular sanserif" }}
                    className="text-slate-900 dark:text-gray-50 text-right basis-[30%]"
                  >
                    {item.persian}
                  </Text>
                ) : (
                  <Text className="text-slate-900 dark:text-gray-50 text-right basis-[30%]">
                    .....
                  </Text>
                )}
              </View>
            </Swipeable>
          );
        }}
        keyExtractor={(item) => item.id}
        />
        </GestureHandlerRootView>
    </View>
  );
};

export default TableWord;
