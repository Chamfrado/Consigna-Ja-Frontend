import { Layout, StyleService, useStyleSheet } from '@ui-kitten/components';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StyledText } from './StyledText';

const Table = ({ headers, data }) => {

    const styles = useStyleSheet(themedStyles );

    return (
      <Layout style={styles.table}>
        {/* Table Headers */}
        <Layout style={styles.row}>
          {headers.map(header => (
            <Layout key={header} style={[styles.cell, styles.headerCell]}>
              <StyledText style={styles.headerText}>{header}</StyledText>
            </Layout>
          ))}
        </Layout>
  
        {/* Table Data */}
        {data.map((client, rowIndex) => (
          <Layout key={rowIndex} style={styles.row}>
            {headers.map((header, cellIndex) => (
              <Layout key={cellIndex} style={[styles.cell, { width: 100 }]}>
                <StyledText>{client[header]}</StyledText>
              </Layout>
            ))}
          </Layout>
        ))}
      </Layout>
    );
  };
  

const themedStyles  = StyleService.create({
  table: {
    borderWidth: 1,
    borderColor: 'color-primary-default',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'color-primary-default',
  },
  cell: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'color-primary-default'
  },
  headerCell: {
    minWidth: 100, // Set a minimum width for the header cells
  },
  headerText: {
    fontWeight: 'bold',
  },
});

export default Table;
