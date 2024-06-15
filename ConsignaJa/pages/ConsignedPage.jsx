import React from 'react';
import { Layout, Divider, Icon, Card, Text } from '@ui-kitten/components';
import { StyledText } from '../components/StyledText';
import { Row } from '../components/RowCols';
import { ClientList } from '../components/ClientList';
import { ConsignadoTable } from '../components/ConsignadoTable';

export const ConsignedPage = () => {





  return (
    <Layout style={{ flex: 1 }}>
      <Layout style={{ flex: 1 }}>
        <Row>
          <StyledText category="h1">Consignados</StyledText>
        </Row>
        <Card disabled >
          <Layout>
            <ConsignadoTable/>
          </Layout>
        </Card>
      </Layout>
      <Divider />
    </Layout>
  );
};
