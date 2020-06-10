import React, { useState, useCallback } from 'react';
import { arrayOf, func, shape, string } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Box, Heading, Text } from 'grommet/components';
import { Add } from 'grommet-icons';

import { mailPropTypes } from 'propTypes/mail';
import { serviceCallStatePropTypes } from 'propTypes/state';
import { MAIL_ROUTES } from 'constants/routes';
import useList from 'hooks/useList';

import List from 'components/List';
import MailEntry from 'components/MailEntry';
import Field from 'components/Field';
import FAB from 'components/FAB';
import StyledBox from 'components/Styled/Box';

import { DEFAULT_FILTER, INITIAL_RANGE, LIST_STEP } from './constants';
import { REQUEST_STATUS } from 'constants/network';
import Loading from 'components/Loading';


function MailListView({ filters, title, mailItemRender, state }) {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');
  const [filter, setFilter] = useState(filters);
  const [range, setRange] = useState({ ...INITIAL_RANGE, end: LIST_STEP });
  const { filteredItems, slicedItems } = useList(state.data, { filter, range });
  const loadingData = state.status === REQUEST_STATUS.LOADING;
  const subtitle = !state.data || loadingData ? 'Loading emails' : `${state.data.length} emails`;

  //  TODO: Check if performant enough not to use debouncing
  const handleMore = useCallback(() => {
    if (range.end <= filteredItems.length) {
      setRange(range => ({ ...range, end: range.end + LIST_STEP}));
    }
  }, [filteredItems.length, range.end]);

  const handleCompose = useCallback(() => {
    history.push(MAIL_ROUTES.COMPOSE.path);
  }, [history]);

  // TODO: Implement debouncing
  const handleSearch = useCallback(event => {
    const value = event.target.value;
    setSearchValue(value);
    setFilter(_filter => ({
      ..._filter,
      value
    }));
  }, []);

  return (
    <>
      <Box direction="row-responsive" align="center" justify="between" flex={{ grow: 1, shrink: 0 }} pad={{ horizontal: 'large'}} width="100%" border={{ size: 'xsmall', side: 'bottom' }}>
        <StyledBox>
          <Heading level="1" margin={{ bottom: 'small' }}>{title}</Heading>
          <Text margin={{ bottom: 'medium' }}>{subtitle}</Text>
        </StyledBox>
        <StyledBox>
          <Field
            name="search"
            onChange={handleSearch}
            placeholder="Search"
            value={searchValue}
            width={{ max: 'unset' }}
          />
        </StyledBox>
      </Box>
      <Box flex={{ grow: 1, shrink: 1 }} height="100vh">
        {loadingData || state.status === REQUEST_STATUS.NOT_REQUESTED
          ? (
            <Loading />
          ) : (
            <List
              onMore={handleMore}
              filtered={filter.value && !!filter.value.length}
              items={slicedItems}
              hasMore={slicedItems.length < filteredItems.length}
              render={mailItemRender}
            />
          )
        }
      </Box>
      <FAB icon={<Add color="white" />} onClick={handleCompose} />
    </>
  );
}

MailListView.defaultProps = {
  filters: DEFAULT_FILTER,
  mailItemRender(item) {
    return (
      <MailEntry key={item.id} subtitle={item.sender.name.full} to={`${MAIL_ROUTES.VIEW.basePath}/${item.id}`} {...item} />
    );
  }
};

MailListView.propTypes = {
  filters: shape({
    value: string,
    key: arrayOf(string),
  }),
  mails: arrayOf(shape(mailPropTypes)),
  title: string,
  mailItemRender: func,
  state: shape(serviceCallStatePropTypes)
};

export default MailListView;
