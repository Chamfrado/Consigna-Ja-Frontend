import React, { useContext } from 'react';
import { Layout, Divider, Icon, Card } from '@ui-kitten/components';
import { StyledText } from '../components/StyledText';
import { Row } from '../components/RowCols';
import { ClientList } from '../components/ClientList';

export const ClientPage = () => {





  return (
    <Layout style={{ flex: 1 }}>
      <Layout style={{ flex: 1 }}>
        <Row>
          <StyledText category="h1">Clientes</StyledText>
        </Row>
        <Card disabled >
          <Layout>
            <ClientList />
          </Layout>
        </Card>
      </Layout>
      <Divider />
    </Layout>
  );
};
