import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'todo.db' });

const ViewTask = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM tasks',
        [],
        (tx, results) => {
          const len = results.rows.length;
          let tasks = [];
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            tasks.push(row);
          }
          setTasks(tasks);
        },
        (error) => {
          console.log('Error getting tasks:', error);
        }
      );
    });
  }, []);

  const handleTaskPress = (task) => {
    // Navigate to Task Details page and pass the task object as a parameter
    navigation.navigate('TaskDetails', { task });
  };

  const renderTaskItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.taskItem} onPress={() => handleTaskPress(item)}>
        <Text style={styles.taskName}>{item.task_name}</Text>
        <Text style={styles.taskAssignedTo}>Assigned To: {item.assigned_to}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>View Tasks</Text>
      <FlatList
        style={styles.taskList}
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  taskList: {
    flex: 1,
  },
  taskItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskAssignedTo: {
    fontSize: 14,
    color: '#666',
  },
});

export default ViewTask;
