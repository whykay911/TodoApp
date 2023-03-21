import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({name: 'todo.db'});

const EditTask = ({route, navigation}) => {
  const [task, setTask] = useState(null);
  const [hoursWorked, setHoursWorked] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hourlyCharge, setHourlyCharge] = useState('');
  const [amountEarned, setAmountEarned] = useState(0);

  useEffect(() => {
    if (route.params && route.params.task) {
      setTask(route.params.task);
      setHoursWorked(route.params.task.hours_worked);
      setCompleted(route.params.task.completed);
      setProgress(route.params.task.progress);
      setHourlyCharge(route.params.task.hourly_charge);
      calculateAmountEarned(
        route.params.task.hours_worked,
        route.params.task.hourly_charge,
      );
    }
    /* db.transaction(
      tx => {
        tx.executeSql(
          'ALTER TABLE tasks ADD COLUMN amount_earned REAL; ALTER TABLE tasks ADD COLUMN hours_worked REAL; ALTER TABLE tasks ADD COLUMN completed BOOLEAN; ALTER TABLE tasks ADD COLUMN progress INTEGER;',
          [],
          () => {
            console.log('Columns added successfully');
          },
          (tx, error) => {
            console.log('Error adding columns', error);
          }
        );
      },
      null,
      null,
      () => console.log('Transaction error'),
    ); */
    
  }, [route.params]);

  const updateTask = () => {
    if (!task) {
      return;
    }

    db.transaction(
      tx => {
        
        tx.executeSql(
          
          'UPDATE tasks SET hours_worked = ?, completed = ?, progress = ?, amount_earned = ? WHERE id = ?;',
          [hoursWorked, completed, progress, amountEarned, task.id],
          () => {
            console.log('Task updated successfully');
            navigation.goBack();
          },
          (tx, error) => console.log('Error updating task', error),
        );
      },
      null,
      null,
      () => console.log('Transaction error'),
    );
  };

  const calculateAmountEarned = (hours, charge) => {
    const amount = hours * charge;
    setAmountEarned(amount);
  };

  useEffect(() => {
    if (hoursWorked && task.hourly_rate) {
      calculateAmountEarned(hoursWorked, parseFloat(task.hourly_rate));
    }
  }, [hoursWorked, route.params.hourlyRate]);

  useEffect(() => {
    if (route.params && route.params.hourlyRate) {
      setHourlyCharge(route.params.hourlyRate);
    }
  }, [route.params]);

  const handleSliderChange = value => {
    setProgress(value);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <Text>Edit Task</Text>
        {task && (
          <>
            <Text style={styles.title}>{task.task_name}</Text>
            <Text style={styles.label}>Description:</Text>
            <Text style={styles.text}>{task.task_description}</Text>
            <Text style={styles.label}>Assigned To:</Text>
            <Text style={styles.text}>{task.assigned_to}</Text>
            <Text style={styles.label}>Deadline:</Text>
            <Text style={styles.text}>{task.end_date}</Text>
            <Text style={styles.label}>Hours Worked:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={hoursWorked ?? ''}
              onChangeText={text => setHoursWorked(parseInt(text))}
            />
            <Text style={styles.label}>Hourly Charge:</Text>
            <Text style={styles.text}>${task.hourly_rate}</Text>
            <Text style={styles.label}>Amount Earned:</Text>
            <Text style={styles.text}>{`$${amountEarned.toFixed(2)}`}</Text>
            <Text style={styles.label}>Completed:</Text>
            <Switch
              value={completed}
              onValueChange={value => setCompleted(value)}
            />
            <Text style={styles.label}>Progress:</Text>
            <Slider
              step={10}
              minimumValue={0}
              maximumValue={100}
              style={styles.slider}
              value={progress}
              onValueChange={handleSliderChange}
            />
            <Text style={styles.text}>{progress}%</Text>
            <TouchableOpacity style={styles.button} onPress={updateTask}>
              <Text style={styles.buttonText}>Update Task</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
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
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EditTask;
