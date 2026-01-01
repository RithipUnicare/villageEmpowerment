import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Title, Text, List, Button, Surface } from 'react-native-paper';
import { responsiveWidth, responsiveHeight } from '../../utils/responsive';

const ProfileScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Surface style={styles.header}>
        <Avatar.Icon
          size={80}
          icon="account"
          theme={{ colors: { primary: '#2E7D32' } }}
        />
        <Title style={styles.name}>Admin User</Title>
        <Text style={styles.email}>admin@village.com</Text>
        <Button mode="outlined" style={styles.editButton}>
          Edit Profile
        </Button>
      </Surface>

      <View style={styles.menu}>
        <List.Section>
          <List.Subheader>Settings</List.Subheader>
          <List.Item
            title="Notifications"
            left={props => <List.Icon {...props} icon="bell" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          <List.Item
            title="Language"
            left={props => <List.Icon {...props} icon="translate" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          <List.Item
            title="Privacy Policy"
            left={props => <List.Icon {...props} icon="shield-check" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
        </List.Section>

        <Button
          icon="logout"
          mode="contained"
          onPress={() => {}}
          style={styles.logoutButton}
          buttonColor="#B00020"
        >
          Logout
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F0',
  },
  header: {
    alignItems: 'center',
    paddingVertical: responsiveHeight(5),
    paddingTop: responsiveHeight(6),
    backgroundColor: '#FFFFFF',
    elevation: 6,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  name: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  email: {
    color: '#666',
    marginBottom: 20,
    fontSize: 15,
    fontWeight: '400',
  },
  editButton: {
    borderRadius: 24,
    borderWidth: 2,
    paddingHorizontal: 24,
  },
  menu: {
    marginTop: responsiveHeight(3),
    backgroundColor: '#FFFFFF',
    marginHorizontal: responsiveWidth(4),
    borderRadius: 16,
    elevation: 3,
  },
  logoutButton: {
    margin: responsiveWidth(5),
    marginTop: responsiveHeight(4),
    borderRadius: 12,
    elevation: 4,
  },
});

export default ProfileScreen;
