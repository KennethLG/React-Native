import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';
import firebase from '../database/firebase';

const UserDetailScreen = (props) => {
  const initialState = {
    id: '',
    name: '',
    email: '',
    phone: '',
  };
  const [user, setUser] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const getUserById = async (id) => {
    const query = firebase.db.collection('users').doc(id);
    const data = await query.get();
    const user = data.data();
    setUser({
      ...user,
      id: data.id,
    });
    setLoading(false);
  };

  const handleChangeText = (name, value) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  const deleteUser = async () => {
    const query = firebase.db
      .collection('users')
      .doc(props.route.params.userId);
    await query.delete();
    props.navigation.navigate('UserList');
  };

  const openConfirmationAlert = () => {
    Alert.alert('Remove the user', 'Are you sure?', [
      { text: 'Yes', onPress: () => deleteUser() },
      { text: 'No', onPress: () => console.log('cancelled') },
    ]);
  };

  const updateUser = async () => {
    const query = firebase.db.collection('users').doc(user.id);
    await query.set({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
    setUser(initialState);
    props.navigation.navigate('UserList');
  };

  useEffect(() => {
    getUserById(props.route.params.userId);
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#9e9e9e" />
      </View>
    );
  }

  return (
    <ScrollView style={style.container}>
      <View style={style.inputGroup}>
        <TextInput
          placeholder="Name User"
          value={user.name}
          onChangeText={(value) => handleChangeText('name', value)}
        />
      </View>
      <View style={style.inputGroup}>
        <TextInput
          placeholder="Email User"
          value={user.email}
          onChangeText={(value) => handleChangeText('email', value)}
        />
      </View>
      <View style={style.inputGroup}>
        <TextInput
          placeholder="Phone User"
          value={user.phone}
          onChangeText={(value) => handleChangeText('phone', value)}
        />
      </View>
      <View>
        <Button title="Update user" color="rgba(0,200,0,1)" onPress={()=> updateUser()}/>
      </View>
      <View>
        <Button
          title="Delete user"
          color="rgba(255,100,100,1)"
          onPress={() => openConfirmationAlert()}
        />
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
});

export default UserDetailScreen;
