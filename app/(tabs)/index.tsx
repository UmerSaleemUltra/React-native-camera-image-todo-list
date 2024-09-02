import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';
import { launchCamera } from 'react-native-image-picker';

interface TodoItem {
  id: string;
  uri: string;
}

const CameraTodoList: React.FC = () => {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  const handleCaptureImage = () => {
    if (Platform.OS === 'web') {
      Alert.alert('Not Supported', 'Camera access is not supported on the web.');
    } else {
      launchCamera({ mediaType: 'photo' }, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets) {
          const newImage: TodoItem = {
            id: todoList.length.toString(),
            uri: response.assets[0].uri || '',
          };
          setTodoList([...todoList, newImage]);
        }
      });
    }
  };

  const renderTodoItem = ({ item }: { item: TodoItem }) => (
    <View style={styles.todoItem}>
      <Image source={{ uri: item.uri }} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.captureButton} onPress={handleCaptureImage}>
        <Text style={styles.buttonText}>Capture Image</Text>
      </TouchableOpacity>
      <FlatList
        data={todoList}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  captureButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  todoItem: {
    marginBottom: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
});

export default CameraTodoList;
