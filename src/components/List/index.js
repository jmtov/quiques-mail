import React, { useEffect, useRef } from 'react';
import { arrayOf, bool, func, number, shape } from 'prop-types';
import { Box, Text } from 'grommet/components';
import { mailPropTypes } from 'propTypes/mail';
import { buildThresholdList } from 'utils/behavior';


// TODO: Optimize unmounting elements that are not in view.
function List({ items, hasMore, onMore, render }) {
  const loaderRef = useRef(null);
  const hasItems = items && items.length;

  const handleSentinelIntersection = (entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      onMore();
    }
  };

  useEffect(() => {
    const element = loaderRef.current;

    if (element) {
      const observer = new IntersectionObserver(handleSentinelIntersection, { threshold: buildThresholdList() });
      observer.observe(element);
    }
  }, []);

  return (
    <Box height="100%" overflow="auto" pad="medium">
      {items && !!items.length && items.map((item) => render(item))}
      {hasMore && <Box ref={loaderRef}>Loading More...</Box>}
      {!hasItems && (
        <Box align="center" justify="center" width="100%" height="100%">
          <Text textAlign="center">No results ¯\_(ツ)_/¯ </Text>
        </Box>
      )}
    </Box>
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
