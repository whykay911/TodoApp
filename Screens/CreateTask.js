import {Picker} from '@react-native-picker/picker';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const db = SQLite.openDatabase({name: 'todo.db'});

const CreateTask = ({navigation}) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [hourlyRate, setHourlyRate] = useState('');
  const [members, setMembers] = useState([]);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users',
        [],
        (tx, results) => {
          const len = results.rows.length;
          let members = [];
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            members.push({username: row.username});
          }
          setMembers(members);
        },
        error => {
          console.log('Error getting users:', error);
        },
      );
    });
  }, []);

  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, task_name TEXT, task_description TEXT, assigned_to TEXT, start_date TEXT, end_date TEXT, hourly_rate REAL);',
      [],
      (tx, result) => console.log('Tasks table created successfully'),
      (tx, error) => console.log('Error creating tasks table', error),
    );
  });

  const handleSave = () => {
    if (taskName && taskDescription && assignedTo && hourlyRate) {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO tasks (task_name, task_description, assigned_to, start_date, end_date, hourly_rate) VALUES (?, ?, ?, ?, ?, ?)',
          [
            taskName,
            taskDescription,
            assignedTo,
            startDate.toISOString(),
            endDate.toISOString(),
            hourlyRate,
          ],
          (tx, results) => {
            console.log('Task saved to database');
            navigation.goBack();
          },
          error => {
            console.log('Error saving task to database:', error);
          },
        );
      });
    } else {
      alert('Please fill out all fields.');
    }
  };

  const handleStartDatePicker = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false);
    setStartDate(currentDate);
  };

  const handleEndDatePicker = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(false);
    setEndDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Task</Text>
      <TextInput
        style={styles.input}
        placeholder="Task Name"
        onChangeText={text => setTaskName(text)}
        value={taskName}
      />
      <TextInput
        style={styles.input}
        placeholder="Task Description"
        onChangeText={text => setTaskDescription(text)}
        value={taskDescription}
      />
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Assigned To:</Text>
        <Picker
          style={styles.picker}
          selectedValue={assignedTo}
          onValueChange={itemValue => setAssignedTo(itemValue)}>
          <Picker.Item label="Select a member" value="" />
          {members.map(member => (
            <Picker.Item
              key={member.username}
              label={member.username}
              value={member.username}
            />
          ))}
        </Picker>
      </View>
      <TouchableOpacity
        style={styles.datePicker}
        onPress={() => setShowStartDatePicker(true)}>
        <Text style={styles.datePickerLabel}>Start Date:</Text>
        <Text>{startDate.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="spinner"
          onChange={handleStartDatePicker}
        />
      )}
      <TouchableOpacity
        style={styles.datePicker}
        onPress={() => setShowEndDatePicker(true)}>
        <Text style={styles.datePickerLabel}>End Date:</Text>
        <Text>{endDate.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="spinner"
          onChange={handleEndDatePicker}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Hourly Rate"
        onChangeText={text => setHourlyRate(text)}
        value={hourlyRate}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
  },
  pickerContainer: {
    marginBottom: 16,
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  datePickerLabel: {
    fontSize: 16,
    marginRight: 8,
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateTask;
