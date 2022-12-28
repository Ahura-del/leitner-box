import {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, Linking} from 'react-native';
import {
  AnimatedFAB,
  Button,
  Divider,
  Menu,
  Modal,
  Portal,
  Snackbar,
} from 'react-native-paper';
import AddWord from './AddWord';
import NotWord from './NotWord';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TableWord from './TableWord';
import ExamWord from './ExamWord';
import EditWord from './EditWord';
import SearchWord from './SearchWord';
import AboutMe from './AboutMe';

const Main = () => {
  const [error, setError] = useState({show: false, msg: ''});
  const [textValue, setTextValue] = useState({
    id: '',
    english: '',
    pronounce: '',
    persian: '',
  });
  const [visible, setVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchWordVisible, setSearchWordVisible] = useState(false);
  const [aboutMeVisible, setAboutMeVisible] = useState(false);
  const [page, setPage] = useState('noword');
  const [words, setWords] = useState([]);
  const [test, setTest] = useState(false);
  const [testWord, setTestWord] = useState({});
  const [currentWord, setCurrentWord] = useState({});
  const [searchWord, setSearchWord] = useState({});
  const [screen, setScreen] = useState(false);
  const [currentWordVisible, setCurrentWordVisible] = useState(false);

  const hideModal = () => setVisible(false);
  const hideTestModal = () => setTest(false);
  const hideCurrentWordVisible = () => setCurrentWordVisible(false);
  const closeMenu = () => setMenuVisible(false);
  const hideAboutMeVisible = () => setAboutMeVisible(false);
  const hideSearchWordVisible = () => {
    setSearchWord({});
    setSearchWordVisible(false);
  };
  const rebuildHandle = () => {
    const range = Math.ceil(Math.random() * words.length - 1);
    setTestWord(words[range]);
  };

  const addHandler = async () => {
    if (textValue.english === '' || textValue.persian === '') return;

    if (
      Boolean(
        words.find(
          english =>
            english.english.toLowerCase() == textValue.english.toLowerCase(),
        ),
      )
    ) {
      setError({show: true, msg: 'This word duplicate.'});
      setTextValue({
        id: '',
        english: '',
        pronounce: '',
        persian: '',
      });
      hideModal();
      return;
    }
    setWords([
      ...words,
      {
        id: JSON.stringify(Math.ceil(Math.random() * 5000)),
        english: textValue.english,
        pronounce: textValue.pronounce,
        persian: textValue.persian,
      },
    ]);
    await AsyncStorage.setItem(
      'words',
      JSON.stringify([
        ...words,
        {
          id: JSON.stringify(Math.ceil(Math.random() * 5000)),
          english: textValue.english,
          pronounce: textValue.pronounce,
          persian: textValue.persian,
        },
      ]),
    );
    hideModal();
    setTextValue({
      id: '',
      english: '',
      pronounce: '',
      persian: '',
    });
  };

  const resetHandler = () => {
    setSearchWord({});
  };
  const searchHandler = word => {
    let w = /[پچجحخهعغفقثصضشسیبلاتنمکگوئدذرزطظژؤإأءًٌٍَُِّ\s]+$/;
    if (word.match(w)) {
      const pWord = words.find(item => item.persian == word);
      setSearchWord(pWord);
    } else {
      const eWord = words.find(
        item => item.english.toLowerCase() == word.toLowerCase(),
      );
      setSearchWord(eWord);
    }
  };

  const deleteHandle = async e => {
    const newWordList = words.filter(item => item.id != e);
    setWords(newWordList);
    await AsyncStorage.setItem('words', JSON.stringify(newWordList));
  };

  const editHandle = e => {
    const currentWord = words.find(item => item.id === e);
    setCurrentWordVisible(true);
    setCurrentWord(currentWord);
  };

  const changeWord = async (oldWord, newWord) => {
    const findNewWordInWords = words.find(
      item => item.english.toLowerCase() === newWord.english.toLowerCase(),
    );
    if (!findNewWordInWords) {
      const result = words.map((item, index) =>
        item.id == oldWord.id ? (item[index] = newWord) : item,
      );
      setWords(result);
      await AsyncStorage.clear();
      await AsyncStorage.setItem('words', JSON.stringify(result));
      setCurrentWordVisible(false);
    } else {
      setError({show: true, msg: 'This word duplicate.'});
      return;
    }
  };

  useEffect(() => {
    const getWords = async () => {
      await AsyncStorage.getItem('words')
        .then(word => JSON.parse(word))
        .then(data => {
          if (data !== null) {
            setWords(data);
          } else {
            setWords([]);
          }
        });
    };
    getWords();
  }, []);
  useEffect(() => {
    if (words.length > 0) {
      setPage('wordpage');
    } else {
      setPage('noword');
    }
  }, [words]);
  return (
    <View style={{flex: 1}} className="relative">
      {page === 'noword' ? (
        <View
          className="items-center justify-center bg-gray-50"
          style={{flex: 1}}>
          <NotWord />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View style={{flex: 1}} className="w-full py-3 bg-black">
            <View className="w-[95%] h-full mx-auto flex flex-row items-center justify-between">
              <Text className="text-white pl-5">Words: {words.length}</Text>

              <View>
                <Menu
                  visible={menuVisible}
                  onDismiss={closeMenu}
                  anchorPosition={'bottom'}
                  anchor={
                    <TouchableOpacity
                      onPress={() => setMenuVisible(true)}
                      className=" flex justify-center">
                      <Button
                        icon="menu"
                        labelStyle={{fontSize: 24, color: 'white'}}
                      />
                    </TouchableOpacity>
                  }>
                  <Menu.Item
                    leadingIcon="search-web"
                    onPress={() => {
                      closeMenu();
                      setSearchWordVisible(true);
                      rebuildHandle();
                    }}
                    title="Search word"
                  />

                  <Menu.Item
                    leadingIcon="test-tube"
                    onPress={() => {
                      closeMenu();
                      setTest(true);
                      rebuildHandle();
                    }}
                    title="Exam"
                  />
                  <Divider />
                  <Menu.Item
                    leadingIcon="alert-decagram"
                    onPress={() => {
                      closeMenu();
                      setAboutMeVisible(true);
                    }}
                    title="About me"
                  />
                </Menu>
              </View>
            </View>
          </View>
          <View style={{flex: 10}}>
            <TableWord
              words={words}
              deleteHandle={deleteHandle}
              test={test}
              editHandle={editHandle}
              setScreen={setScreen}
            />
          </View>
        </View>
      )}
      {!screen && (
        <AnimatedFAB
          icon="plus"
          label={'Label'}
          onPress={() => setVisible(true)}
          className="absolute bottom-5 right-5"
        />
      )}

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            backgroundColor: 'white',
            padding: 20,
            marginHorizontal: 20,
          }}>
          <AddWord
            addHandler={addHandler}
            textValue={textValue}
            setTextValue={setTextValue}
          />
        </Modal>
      </Portal>

      <Portal>
        <Modal
          visible={test}
          onDismiss={hideTestModal}
          contentContainerStyle={{
            backgroundColor: 'white',
            padding: 20,
            marginHorizontal: 20,
          }}>
          <ExamWord testWord={testWord} rebuildHandle={rebuildHandle} />
        </Modal>
      </Portal>

      <Portal>
        <Modal
          visible={currentWordVisible}
          onDismiss={hideCurrentWordVisible}
          contentContainerStyle={{
            backgroundColor: 'white',
            padding: 20,
            marginHorizontal: 20,
          }}>
          <EditWord word={currentWord} changeWord={changeWord} />
        </Modal>
      </Portal>

      <Portal>
        <Modal
          visible={searchWordVisible}
          onDismiss={hideSearchWordVisible}
          contentContainerStyle={{
            backgroundColor: 'white',
            padding: 20,
            marginHorizontal: 20,
          }}>
          <SearchWord
            searchWordObject={searchWord}
            searchHandler={searchHandler}
            resetHandler={resetHandler}
          />
        </Modal>
      </Portal>

      <Portal>
        <Modal
          visible={aboutMeVisible}
          onDismiss={hideAboutMeVisible}
          contentContainerStyle={{
            backgroundColor: 'white',
            padding: 20,
            marginHorizontal: 20,
          }}>
          <AboutMe />
        </Modal>
      </Portal>

      <Snackbar
        visible={error.show}
        onDismiss={hideModal}
        action={{
          label: 'Close',
          onPress: () => {
            setError({show: false, msg: ''});
          },
        }}>
        {error.msg}
      </Snackbar>
    </View>
  );
};

export default Main;
