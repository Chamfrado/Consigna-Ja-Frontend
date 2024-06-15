import React from 'react';
import { View, StyleSheet } from 'react-native';

// Row component
export const Row = ({ children, style }) => (
  <View style={[styles.row, style]}>{children}</View>
);

// Column component
export const Col = ({ children, style }) => (
  <View style={[styles.col, style]}>{children}</View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  col: {
    flex: 1,
    marginHorizontal: 5,
  },
});
