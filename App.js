import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const generateRandomNumber = () => {
  return Math.floor(Math.random() * 100) + 1;
};

export default function GuessingGame() {
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [numberToGuess, setNumberToGuess] = useState(generateRandomNumber());
  const [guessCount, setGuessCount] = useState(0);

  const handleGuess = () => {
    const userGuess = parseInt(guess, 10);
    setGuessCount(prevCount => prevCount + 1);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
      setMessage('Guess a number between 1 and 100.');
    } else if (userGuess < numberToGuess) {
      setMessage(`Your guess of ${userGuess} is too low!`);
    } else if (userGuess > numberToGuess) {
      setMessage(`Your guess of ${userGuess} is too high!`);
    } else {
      setMessage(`Correct! You guessed the number in ${guessCount + 1} guesses.`);
    }
  };

  const handleReset = () => {
    setNumberToGuess(generateRandomNumber());
    setGuess('');
    setGuessCount(0);
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={guess}
        onChangeText={setGuess}
      />
      <TouchableOpacity style={styles.button} onPress={handleGuess}>
        <Text style={styles.buttonText}>Make guess</Text>
      </TouchableOpacity>
      <Text style={styles.message}>{message}</Text>
      {message.startsWith('Correct!') && (
        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Play again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    borderRadius: 5,
  },


  button: {
    backgroundColor: '#ff66b2',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center', //keskellä
    width: 150,
  },


  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  message: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },
});


// Lähteet https://www.geeksforgeeks.org/create-a-number-guessing-app-using-react-native/