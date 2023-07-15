import React from "react";

function useLocalStorage(itemName, initialValue) {
  const localStorageItem =
    localStorage.getItem(itemName) || JSON.stringify(initialValue);

  const parserItem = JSON.parse(localStorageItem);

  const [item, setItem] = React.useState(parserItem);

  const saveItem = (newItem) => {
    localStorage.setItem(itemName, JSON.stringify(newItem));

    setItem(newItem);
  };
  return [item, saveItem];
}

export { useLocalStorage };
