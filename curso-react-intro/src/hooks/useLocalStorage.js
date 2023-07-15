import React from "react";

function useLocalStorage(itemName, initialValue) {
  const [item, setItem] = React.useState(initialValue);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  let localStorageItem;
  let parserItem;

  React.useEffect(() => {
    setTimeout(() => {
      try {
        localStorageItem =
          localStorage.getItem(itemName) || JSON.stringify(initialValue);
        parserItem = JSON.parse(localStorageItem);
        setItem(parserItem);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    }, 2000);
  }, []);

  const saveItem = (newItem) => {
    localStorage.setItem(itemName, JSON.stringify(newItem));

    setItem(newItem);
  };
  return { loading, error, item, saveItem };
}

export { useLocalStorage };
