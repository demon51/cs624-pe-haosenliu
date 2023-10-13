import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  StyleSheet
} from 'react-native';

const CoreComponentsApp = () => {
  const [favoriteCourse, setFavoriteCourse] = useState('');

  return (
    <ScrollView style={styles.container}>
      <Image source={require('./assets/icon.png')} style={styles.icon} />
      <Text>Which course did you like?</Text>
      <TextInput
        style={styles.input}
        placeholder="ex. CS624"
        onChangeText={text => setFavoriteCourse(text)}
        value={favoriteCourse}
      />
      <Text style={styles.header}>Core Requirements (24 credits)</Text>
      {[
        'CS 504 Software Engineering',
        'CS 506 Programming for Computing',
        'CS 519 Cloud Computing Overview',
        'CS 533 Computer Architecture',
        'CS 547 Secure Systems and Programs',
        'CS 622 Discrete Math and Algorithms for Computing',
        'DS 510 Artificial Intelligence for Data Science',
        'DS 620 Machine Learning & Deep Learning'
      ].map(course => (
        <Text key={course} style={styles.courseText}>{course}</Text>
      ))}
      <Text style={styles.header}>Depth of Study (6 Credits)</Text>
      {[
        'CS 624 Full-Stack Development - Mobile App',
        'CS 628 Full-Stack Development - Web App'
      ].map(course => (
        <Text key={course} style={styles.courseText}>{course}</Text>
      ))}
      <Text style={styles.header}>Capstone (3 Credits)</Text>
      {[
        'CS 687 Computer Science Capstone',
      ].map(course => (
        <Text key={course} style={styles.courseText}>{course}</Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white'
  },
  icon: {
    width: 100,
    height: 100,
    alignSelf: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    backgroundColor: 'yellow'
  },
  courseText: {
    fontSize: 16,
    marginVertical: 5
  }
});

export default CoreComponentsApp;
