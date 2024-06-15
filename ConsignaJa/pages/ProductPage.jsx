import React, { useContext } from 'react';
import { Layout, Divider, Icon, Input, Card } from '@ui-kitten/components';
import { StyledText } from '../components/StyledText';
import { Row } from '../components/RowCols';
import data from '../data/produto.json';
import { ProductList } from '../components/ProductList';

export const ProductPage = ({navigation}) => {

  
  
  const productHeaders = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <Layout style={{ flex: 1 }}>
      <Layout style={{ flex: 1 }}>
        <Row>
          <StyledText category="h1">Produtos</StyledText>
        </Row>
        <Card disabled >
          <Layout>
            <ProductList />
          </Layout>
        </Card>
      </Layout>
      <Divider />
    </Layout>
  );
};