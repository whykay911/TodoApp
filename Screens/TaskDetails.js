import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const TaskDetails = ({ route }) => {
  const { task } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.task_name}</Text>
      <Text style={styles.text}>Description: {task.task_description}</Text>
      <Text style={styles.text}>Assigned To: {task.assigned_to}</Text>
      <Text style={styles.text}>Start Date: {new Date(task.start_date).toLocaleDateString()}</Text>
      <Text style={styles.text}>End Date: {new Date(task.end_date).toLocaleDateString()}</Text>
      <Text style={styles.text}>Hourly Rate: ${task.hourly_rate}</Text>
      
      <Text style={styles.text}>Progress: {task.progress}%</Text>
      <Text style={styles.text}>Hours Worked: {task.hours_worked}</Text>
      <Text style={styles.text}>Amount Earned: ${task.amount_earned}</Text>
      <Text style={styles.text}>Completed? {task.completed === 1 ? 'Yes' : 'No'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default TaskDetails;
