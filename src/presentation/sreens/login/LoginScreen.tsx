import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, Input, Button, Card } from '@ui-kitten/components';
import { CustomIcon } from '../../components/CustomIcon';

export const LoginScreen = () => {
  const [loginForm, setLoginForm] = useState({
    user: '',
    password: '',
  });

  return (
    <Layout style={styles.container}>
      <Card style={styles.card}>
        <Text category="h1" style={styles.title}>BIENVENIDO</Text>
        <Text category="s1" style={styles.subtitle}>Inicia sesión en tu cuenta</Text>
        <Layout style={styles.form}>
          <Text category="label" style={styles.label}>Usuario:</Text>
          <Input
            style={styles.input}
            placeholder="Usuario"
            value={loginForm.user}
            accessoryLeft={<CustomIcon name="person-outline" />}
            onChangeText={(text) => setLoginForm({ ...loginForm, user: text })}
          />
          <Text category="label" style={styles.label}>Contraseña:</Text>
          <Input
            style={styles.input}
            accessoryLeft={<CustomIcon name="lock-outline" />}
            placeholder="Contraseña"
            value={loginForm.password}
            secureTextEntry={true}
            onChangeText={(text) => setLoginForm({ ...loginForm, password: text })}
          />
          <Button style={styles.button} onPress={() => { /* Handle login logic */ }}>
            Ingresar
          </Button>
        </Layout>
      </Card>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 123, 255, 0.6)', // Fondo sólido similar al gradiente
  },
  card: {
    width: '90%',
    maxWidth: 300,
    padding: 20,
    borderRadius: 10,
  },
  title: {
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 20,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  label: {
    marginBottom: 5,
    textAlign: 'left',
    width: '100%',
  },
  input: {
    width: '100%',
    marginBottom: 15,
  },
  button: {
    width: '100%',
    marginTop: 20,
  },
});









