import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ArrowButton(props) {
  return (
    <View style={[styles.btn, { backgroundColor: props.disabled ? '#95a5a6' : 'orange' }, props.style]}>
      <TouchableOpacity onPress={props.onPress} disabled={props.disabled}>
        <Icon name={`arrow-${props.direction}`} size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    margin: 25
  },
});
