import React from 'react';

import {
  View,
  Text,
  Button
} from 'react-native';

import AuthContext from '../context/AuthContext';

const Home = ({ navigation }) => {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View>
      <Text>Hello world</Text>
      <Button title="Event" onPress={() => navigation.push("Event", { name: 'Evento 2' })} />
      <Button title="Sign out" onPress={() => signOut()} />
    </View>
  );
}

export default Home;
