import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import {useNavigation} from '@react-navigation/native';

const db = SQLite.openDatabase({name: 'todo.db'});

const MemberMenu = ({route}) => {
  const [tasks, setTasks] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    // Get tasks assigned to the logged in member
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM tasks WHERE assigned_to = ?;',
        [route.params.username],
        (tx, results) => {
          const len = results.rows.length;
          let tasks = [];
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            tasks.push(row);
          }
          setTasks(tasks);
        },
        (tx, error) => console.log('Error retrieving tasks', error),
      );
    });
  }, []);

  const handleEditTask = task => {
    navigation.navigate('EditTask', {task});
  };

  const renderTask = ({item}) => {
    return (
      <TouchableOpacity key={item.id} onPress={() => handleEditTask(item)}>
        <View style={{padding: 20, borderBottomWidth: 1}}>
          <Text style={{fontSize: 18}}>{item.task_name}</Text>
          <Text style={{fontSize: 16, color: 'gray'}}>
            Assigned to: {item.assigned_to}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default MemberMenu;
