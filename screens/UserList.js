import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import firebase from '../database/firebase';
import { ListItem, Avatar } from 'react-native-elements';

const UserList = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    firebase.db.collection('users').onSnapshot((querySnapshot) => {
      const users = Array();
      querySnapshot.docs.forEach((doc) => {
        const { name, email, phone } = doc.data();
        users.push({
          id: doc.id,
          name,
          email,
          phone,
        });
      });
      setUsers(users);
    });
  }, [users]);

  return (
    <ScrollView>
      <Button
        title="Create User"
        onPress={() => props.navigation.navigate('CreateUserScreen')}
      />

      {users.map((user) => {
        return (
          <ListItem key={user.id} bottomDivider onPress={() => {
            props.navigation.navigate("UserDetailScreen", {
              userId: user.id
            });
          }}>
            <ListItem.Chevron />
            <Avatar source={{ uri: 'https://picsum.photos/200/200' }} rounded />
            <ListItem.Content>
              <ListItem.Title>{user.name}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default UserList;
