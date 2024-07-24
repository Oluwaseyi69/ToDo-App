import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Alert, Text } from 'react-native';
import TodoItem from './components/TodoItem';


const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, done: false }]);
      setNewTodo('');
    }
  };
  const updateTodo = (text) => {
    if (text.trim()) {
      const updatedTodos = [...todos];
      updatedTodos[editingTodo].text = text;
      setTodos(updatedTodos);
      setEditingTodo(null);
      setNewTodo('');
    } else {
      Alert.alert('Error', 'Please enter a task to update');
    }
  };

  const handleEdit = (index) => {
    setEditingTodo(index);
    setNewTodo(todos[index].text); 
  }

  const toggleDone = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].done = !updatedTodos[index].done;
    setTodos(updatedTodos);
  };
  const deleteTodo = (index) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        { text: 'Delete', onPress: () => removeTodo(index) },
      ]
    );
  };

  const removeTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1); 
    setTodos(updatedTodos);
  };
 

  return (
    <View style={{ paddingHorizontal: 20, padding: 40}}>
      <Text style={{ fontSize: 24, marginBottom: 10, fontStyle: "italic", fontWeight: "bold"}}>Todo App</Text> 
      <TextInput
        value={newTodo}
        onChangeText={setNewTodo}
        placeholder={editingTodo !== null ? 'Update Task' : 'Add a todo...'} // Placeholder text
        style={{ marginBottom: 10, padding: 5, borderWidth: 1 }}
      />
    
      {editingTodo !== null ? (
        <Button title="Save" onPress={() => updateTodo(newTodo)} />
      ) : (
        <Button title="Add" onPress={addTodo} />
      )}
      <FlatList
        data={todos}
        renderItem={({ item, index }) => (
          <TodoItem
            todo={item}
            onEdit={() => handleEdit(index)}
            onToggleDone={() => toggleDone(index)}
            onDelete={() => deleteTodo(index)}
          />
        )}
        keyExtractor={(item) => item.text}
      />
    </View>
  );
};

export default App;
