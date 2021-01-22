import React, {Component, useState} from 'react';
import { render } from 'react-dom';
import { StyleSheet, Image} from 'react-native';
import Navigator from './routes/homeStack';

export default function App() {

  return (
      <Navigator />
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
