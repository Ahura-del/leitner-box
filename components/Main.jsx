import {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {AnimatedFAB, Modal, Portal, Snackbar} from 'react-native-paper';
import AddWord from './AddWord';
import NotWord from './NotWord';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TableWord from './TableWord';
import ExamWord from './ExamWord';
import EditWord from './EditWord';

const Main = () => {
  const [error, setError] = useState({show: false, msg: ''});
  const [textValue, setTextValue] = useState({
    id: '',
    english: '',
    pronounce: '',
    persian: '',
  });
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState('noword');
  const [words, setWords] = useState([]);
  const [test, setTest] = useState(false);
  const [testWord, setTestWord] = useState({});
  const [currentWord, setCurrentWord] = useState({});
 const [screen , setScreen] = useState(false)
  const [currentWordVisible, setCurrentWordVisible] = useState(false);

  const hideModal = () => setVisible(false);
  const hideTestModal = () => setTest(false);
  const hideCurrentWordVisible = () => setCurrentWordVisible(false);

  const rebuildHandle = () => {
    const range = Math.ceil(Math.random() * words.length - 1);
    setTestWord(words[range]);
  };

  const addHandler = async () => {
    if (textValue.english === '' || textValue.persian === '') return;

    if (Boolean(words.find(english => english.english == textValue.english))) {
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
    const result = words.map((item, index) =>
      item.id == oldWord.id ? (item[index] = newWord) : item,
    );
    setWords(result);
    await AsyncStorage.clear()
    await AsyncStorage.setItem('words', JSON.stringify(result));
    setCurrentWordVisible(false);
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
          <View
            style={{flex: 1}}
            className="flex flex-row items-center justify-between p-3 bg-black">
            <Text className="text-white">Words: {words.length}</Text>

            <TouchableOpacity
              onPress={() => {
                setTest(true);
                rebuildHandle();
              }}
              className="bg-red-300 py-2 px-6 rounded-md">
              <Text>Test</Text>
            </TouchableOpacity>
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
