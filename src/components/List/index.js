import React, { useEffect, useRef, useCallback } from 'react';
import { arrayOf, bool, func, number, shape } from 'prop-types';
import { Box, Heading, Text } from 'grommet/components';
import { mailPropTypes } from 'propTypes/mail';
import { buildThresholdList } from 'utils/behavior';

import StyledBox from 'components/Styled/Box';

// TODO: Optimize unmounting elements that are not in view.
function List({ items, hasMore, onMore, render }) {
  const loaderRef = useRef(null);
  const hasItems = items && items.length;

  const handleSentinelIntersection = useCallback((entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      onMore();
    }
  }, [onMore]);

  useEffect(() => {
    const element = loaderRef.current;

    if (element) {
      const observer = new IntersectionObserver(handleSentinelIntersection, { threshold: buildThresholdList() });
      observer.observe(element);
    }
  }, [handleSentinelIntersection]);

  return (
    <StyledBox height="100%" overflow="auto" pad="medium">
      {items && !!items.length && items.map((item) => render(item))}
      {hasMore && (
        <Box width="100%" pad="medium" ref={loaderRef}>
          <Text align="center" color="neutral-3">Loading More...</Text>
        </Box>
      )}
      {!hasItems && (
        <Box align="center" justify="center" fill>
          <Heading level={2}>No results ¯\_(ツ)_/¯ </Heading>
        </Box>
      )}
    </StyledBox>
  );
}

List.propTypes = {
  hasMore: bool,
  items: arrayOf(shape()),
  onMore: func,
  totalItems: number,
  render: func
};

List.defaultProps = {
  items: arrayOf(mailPropTypes)
};

export default List;
