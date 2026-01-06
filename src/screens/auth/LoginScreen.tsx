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
import { AuthService } from '../../services/AuthService';
import { useUser } from '../../context/UserContext';

const LoginScreen = ({ navigation }: any) => {
  const { fetchUserProfile } = useUser();
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!mobileNumber || !password) {
      setError('Please enter mobile number and password');
      return;
    }

    if (mobileNumber.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await AuthService.login(mobileNumber, password);

      if (response.success) {
        // Fetch user profile immediately after successful login
        await fetchUserProfile();
        console.log('Login successful');
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || 'Login failed. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Surface style={styles.surface}>
        <Title style={styles.title}>Village Empowerment</Title>
        <Text style={styles.subtitle}>Sign in to your account</Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TextInput
          label="Mobile Number"
          value={mobileNumber}
          onChangeText={text => {
            setMobileNumber(text);
            setError('');
          }}
          mode="outlined"
          keyboardType="phone-pad"
          maxLength={10}
          style={styles.input}
          left={<TextInput.Icon icon="phone" />}
        />

        <TextInput
          label="Password"
          value={password}
          onChangeText={text => {
            setPassword(text);
            setError('');
          }}
          mode="outlined"
          secureTextEntry
          style={styles.input}
          left={<TextInput.Icon icon="lock" />}
        />

        <Button
          mode="contained"
          onPress={handleLogin}
          loading={loading}
          disabled={loading}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          Login
        </Button>

        <Button
          mode="text"
          onPress={() => navigation.replace('Signup')}
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
  errorText: {
    color: '#B00020',
    fontSize: 13,
    marginBottom: responsiveHeight(2),
    textAlign: 'center',
  },
});

export default LoginScreen;
