import React, { useState } from "react";
import Button from "../ui/Button/Button";
import Input from "../ui/Input/Input";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  max-width: 700px;
  margin: 53px auto;
`;

type InputSearchProps = {
  fetchGeoCode: (data: string) => void;
};

const InputSearch = (props: InputSearchProps) => {
  const { fetchGeoCode } = props;
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (value.trim() !== "") {
      fetchGeoCode(value);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <Input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Search US Address"
        />
        <Button type="submit">Buscar</Button>
      </Container>
    </form>
  );
};

export default InputSearch;
