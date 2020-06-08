import React from 'react';
import { Heading } from 'grommet/components';
import { useParams } from 'react-router-dom';

import Layout from 'components/Layout';

function View() {
  const { id } = useParams();

  return (
    <Layout>
      <Heading level="1">View {id}</Heading>
    </Layout>
  );
}

export default View;
