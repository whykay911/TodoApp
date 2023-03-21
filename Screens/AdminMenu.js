import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const AdminMenu = ({ navigation }) => {
  const handleCreateUser = () => {
    navigation.navigate('CreateUser');
  };

  const handleCreateTask = () => {
    navigation.navigate('CreateTask');
  };

  const handleViewTask = () => {
    navigation.navigate('ViewTask');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Menu</Text>
      <TouchableOpacity style={styles.button} onPress={handleCreateUser}>
        <Text style={styles.buttonText}>Create User</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleCreateTask}>
        <Text style={styles.buttonText}>Create Task</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleViewTask}>
        <Text style={styles.buttonText}>View Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    width: '80%',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default AdminMenu;