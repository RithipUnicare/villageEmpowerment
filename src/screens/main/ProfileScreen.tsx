import React from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Avatar,
  Title,
  Text,
  List,
  Button,
  Surface,
  Chip,
} from 'react-native-paper';
import { responsiveWidth, responsiveHeight } from '../../utils/responsive';
import { AuthService } from '../../services/AuthService';
import { useUser } from '../../context/UserContext';

const ProfileScreen = ({ navigation }: any) => {
  const { user, isSuperAdmin, clearUser } = useUser();

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      clearUser();
      // The App.tsx will automatically redirect to login screen
      // when it detects no tokens in storage
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1 }}
      edges={['top', 'bottom', 'left', 'right']}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'android' ? 30 : 0}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <Surface style={styles.header}>
            <Avatar.Icon
              size={80}
              icon="account"
              theme={{ colors: { primary: '#2E7D32' } }}
            />
            <Title style={styles.name}>{user?.name || 'User'}</Title>
            <Text style={styles.email}>
              {user?.email || user?.mobileNumber || ''}
            </Text>

            <Chip
              style={[
                styles.roleChip,
                { backgroundColor: isSuperAdmin ? '#FFB300' : '#2E7D32' },
              ]}
              textStyle={{ color: '#fff', fontWeight: '600' }}
            >
              {isSuperAdmin ? 'Super Admin' : 'User'}
            </Chip>

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
              onPress={handleLogout}
              style={styles.logoutButton}
              buttonColor="#B00020"
            >
              Logout
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
    marginBottom: 12,
    fontSize: 15,
    fontWeight: '400',
  },
  roleChip: {
    marginBottom: 16,
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
