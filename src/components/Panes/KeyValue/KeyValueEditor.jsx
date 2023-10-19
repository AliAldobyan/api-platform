import React, { useEffect, useState } from "react";

export default function KeyValueEditor({
  keyPair,
  setKeyPair,
  onKeyPairRemove,
}) {
  const [keyValue, setKeyValue] = useState(keyPair);
  const [debouncedKeyValue, setDebouncedKeyValue] = useState(keyValue);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedKeyValue(keyValue);
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [keyValue]);

  useEffect(() => {
    setKeyPair(debouncedKeyValue);

    // eslint-disable-next-line
  }, [debouncedKeyValue]);

  const handleOnChange = (e) => {
    setKeyValue((prevState) => ({
      ...prevState,
      id: keyValue.id,
      [e.target.name]: e.target.value,
    }));

    // setUrl(`${url}${keyValue?.map((q) => `?${q.keyItem}=${q.valuItem}`)}`);
  };
  return (
    <>
      <div className="flex mb-3">
        <input
          className="px-4 py-1.5 w-full border border-gray-300 rounded-md  hover:border-purple-700 focus:outline-purple-700"
          placeholder="Key"
          name="keyItem"
          onChange={(e) => handleOnChange(e)}
        />
        <input
          className="ml-3 px-4 py-1.5 w-full border border-gray-300 rounded-md hover:border-purple-700 focus:outline-purple-700"
          placeholder="Value"
          name="valueItem"
          onChange={(e) => handleOnChange(e)}
        />
        <button
          className="ml-4 px-4 rounded-md text-purple-700 border border-purple-400 hover:bg-purple-100"
          onClick={() => onKeyPairRemove(keyPair)}
        >
          Remove
        </button>
      </div>
    </>
  );
}
