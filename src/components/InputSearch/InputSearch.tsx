import React, { useState } from "react";

const InputSearch = () => {
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  return <input type="text" value={value} onChange={handleChange} />;
};

export default InputSearch;
