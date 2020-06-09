import { useMemo } from 'react';

function useList(items, { filter, range }) {
  const filteredItems = useMemo(() => {
    if (filter.value && filter.keys && filter.keys.length) {
      const filtered = items.filter(item => {
        const passed = [];
        filter.keys.forEach(key => {
          if (item[key]) {
            const foundOnItemKey = JSON.stringify(item[key]).toLowerCase().search(filter.value.toLowerCase()) >= 0;
            passed.push(foundOnItemKey);
          }
        });
        return passed.every(Boolean);
      });

      return filtered;
    }
    return items;
  }, [filter.value, filter.keys, items]);

  const slicedItems = useMemo(() => {
    return filteredItems.slice(range.start, range.end);
  }, [range.start, range.end, filteredItems]);

  return { filteredItems, slicedItems };
}

export default useList;
