// components/SignInScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';

type FormData = {
  username: string;
  password: string;
};

const SignInScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

  // Hide navigation on sign-in screen
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () => navigation.getParent()?.setOptions({
      tabBarStyle: undefined,
    });
  }, [navigation]);

  const onSubmit = (data: FormData) => {
    console.log('SUBmitted')
    if (data.username === '' || data.password === '') {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }
    // nets navigation
    console.log('set navigation')
    // Handle sign-in logic here
    navigation.navigate('/home');
    // Alert.alert('Success', 'You have signed in successfully');
  };
  console.log('render sign in page')
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Controller
        control={control}
        name="username"
        rules={{ required: 'Username is required' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}
      <Controller
        control={control}
        name="password"
        rules={{ required: 'Password is required' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SignInScreen;
