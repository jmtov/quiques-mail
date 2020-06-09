import React, { useState } from 'react';
import { arrayOf, func, shape, string } from 'prop-types';
import { useHistory, Link } from 'react-router-dom';
import { Box, Heading, Text } from 'grommet/components';
import { Add } from 'grommet-icons';
import styled from 'styled-components';

import { mailPropTypes } from 'propTypes/mail';
import { ROUTES } from 'constants/routes';
import useList from 'hooks/useList';

import Layout from 'components/Layout';
import List from 'components/List';
import MailEntry from 'components/MailEntry';
import Field from 'components/Field';
import FAB from 'components/FAB';

import { DEFAULT_FILTER_KEYS, INITIAL_RANGE, LIST_STEP } from './constants';

const StyledLink = styled(Link)`
  color: unset;
  text-decoration: none;
  transition: transform 0.2s;

  &:hover {
    transform: translateX(5px);
  }

  &:active {
    transform: translateX(20px);
  }
`;

function MailListView({ title, mails, mailItemRender }) {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');
  const [filter, setFilter] = useState(DEFAULT_FILTER_KEYS);
  const [range, setRange] = useState({ ...INITIAL_RANGE, end: LIST_STEP });
  const { filteredItems, slicedItems } = useList(mails, { filter, range });

  //  TODO: Check if performant enough not to use debouncing
  const handleMore = () => {
    if (range.end <= filteredItems.length) {
      setRange(range => ({ ...range, end: range.end + LIST_STEP}));
    }
  };

  const handleCompose = () => {
    history.push(ROUTES.COMPOSE.path);
  };

  // TODO: Implement debouncing
  const handleSearch = event => {
    const value = event.target.value;
    setSearchValue(value);
    setFilter(_filter => ({
      ..._filter,
      value
    }));
  };

  return (
    <Layout>
      <>
        <Box direction="row-responsive" align="center" justify="between" flex={{ grow: 1, shrink: 0 }} pad={{ horizontal: 'medium'}} margin={{ bottom: 'xsmall'}} width="100%">
          <Box>
            <Heading level="1" margin={{ bottom: 'small' }}>{title}</Heading>
            <Text margin={{ bottom: 'medium' }}>{`${mails.length} emails`}</Text>
          </Box>
          <Field
            name="search"
            onChange={handleSearch}
            placeholder="Search"
            value={searchValue}
          />
        </Box>
        <Box pad="small" flex={{ grow: 1, shrink: 1 }} height="100vh">
          <List
            onMore={handleMore}
            filtered={filter.value && !!filter.value.length}
            items={slicedItems}
            hasMore={slicedItems.length < filteredItems.length}
            render={mailItemRender}
          />
        </Box>
        <FAB icon={<Add color="white" />} onClick={handleCompose} />
      </>
    </Layout>
  );
}

MailListView.defaultProps = {
  mailItemRender(item) {
    return (
      <StyledLink key={item.id} to={`${ROUTES.VIEW.basePath}/${item.id}`}>
        <MailEntry subtitle={item.sender.name.full} {...item} />
      </StyledLink>
    );
  }
};

MailListView.propTypes = {
  mails: arrayOf(shape(mailPropTypes)),
  title: string,
  mailItemRender: func
};

export default MailListView;
