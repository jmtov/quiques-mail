import { useMemo } from 'react';

function useList(items, { filter, range }) {
  const filteredItems = useMemo(() => {
    if (items && filter.value && filter.keys && filter.keys.length) {
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
    return items || [];
  }, [filter.value, filter.keys, items]);

  const slicedItems = useMemo(() => {
    if (items && items.length) {
      return filteredItems.slice(range.start, range.end);
    }
    return items || [];
  }, [range.start, range.end, filteredItems, items]);

  return { filteredItems, slicedItems };
}

export default useList;
