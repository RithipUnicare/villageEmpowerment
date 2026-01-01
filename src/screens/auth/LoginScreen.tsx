import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { TextInput, Button, Text, Title, Surface } from 'react-native-paper';
import { responsiveWidth, responsiveHeight } from '../../utils/responsive';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    // Basic logic for demonstration
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // navigation.navigate('Dashboard');
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Surface style={styles.surface}>
        <Title style={styles.title}>Village Empowerment</Title>
        <Text style={styles.subtitle}>Sign in to your account</Text>

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry
          style={styles.input}
        />

        <Button
          mode="contained"
          onPress={handleLogin}
          loading={loading}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          Login
        </Button>

        <Button
          mode="text"
          onPress={() => navigation.navigate('Signup')}
          style={styles.signupButton}
        >
          Don't have an account? Sign Up
        </Button>
      </Surface>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    padding: responsiveWidth(5),
  },
  surface: {
    padding: responsiveWidth(8),
    borderRadius: 20,
    elevation: 8,
    backgroundColor: '#FFFFFF',
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  title: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: responsiveHeight(1),
    letterSpacing: 0.5,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: responsiveHeight(4),
    color: '#666',
    fontSize: 15,
    fontWeight: '400',
  },
  input: {
    marginBottom: responsiveHeight(2.5),
    backgroundColor: '#FAFAFA',
  },
  button: {
    marginTop: responsiveHeight(3),
    borderRadius: 12,
    elevation: 3,
  },
  buttonContent: {
    paddingVertical: 12,
  },
  signupButton: {
    marginTop: responsiveHeight(2.5),
  },
});

export default LoginScreen;
