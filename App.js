
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from './Screens/LandingPage';
import AdminLogin from './Screens/AdminLogin';
import AdminMenu from './Screens/AdminMenu';
import CreateUser from './Screens/CreateUser';
import CreateTask from './Screens/CreateTask';
import ViewTask from './Screens/ViewTask';
import TaskDetails from './Screens/TaskDetails';
import MemberLogin from './Screens/MemberLogin';
import MemberMenu from './Screens/MemberMenu';
import EditTask from './Screens/EditTask';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="AdminLogin" component={AdminLogin} />
        <Stack.Screen name="AdminMenu" component={AdminMenu} />
        <Stack.Screen name="CreateUser" component={CreateUser} />
        <Stack.Screen name="CreateTask" component={CreateTask} />
        <Stack.Screen name="ViewTask" component={ViewTask} />
        <Stack.Screen name="TaskDetails" component={TaskDetails} />
        <Stack.Screen name="MemberLogin" component={MemberLogin} />
        <Stack.Screen name="MemberMenu" component={MemberMenu} />
        <Stack.Screen name="EditTask" component={EditTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
