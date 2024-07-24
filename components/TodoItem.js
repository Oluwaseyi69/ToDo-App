import React from 'react';
import { Text, View, Button } from 'react-native';
import styles from './Styles';


const TodoItem = ({ todo, onEdit, onToggleDone, onDelete }) => {
  const textStyle = todo.done ? { textDecorationLine: 'line-through' } : {};
 
  
  return (
    <View style={{ padding: 10, borderBottomWidth: 1 }}>
      <Text style={{ fontSize: 18, ...textStyle }}>{todo.text}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button title="Edit" onPress={onEdit} />
        <Button title={todo.done ? 'Undone' : 'Done'} onPress={onToggleDone} />
        <Button title="Delete" onPress={onDelete} style={styles.deleteButton} />
      </View>
    </View>
  );
};

export default TodoItem;