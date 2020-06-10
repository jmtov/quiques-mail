const DEFAULT_WAIT_TIME = 1000;
export const wait = (time = DEFAULT_WAIT_TIME) => new Promise(resolve => setTimeout(() => resolve(), time));

/*
  Taken and modified from: https://www.w3resource.com/javascript-exercises/javascript-math-exercise-23.php
*/

export function createGUID() {
  let time = Date.now();

  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    char => {
      var random = (time + Math.random() * 16) % 16 | 0;
      time = Math.floor(time/16);
      //  eslint-disable-next-line no-mixed-operators
      return (char === 'x' ? random : ( random & 0x3 | 0x8 )).toString(16);
    }
  );

  return uuid;
}
