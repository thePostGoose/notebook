import React from "react";
import classes from "./Search.module.scss";
import Input from "../UI/Input/Input";
const Search = ({ value, onChange }) => {
  return (
    <div className={classes.Search}>
      <Input
        valid={true}
        label={
          "начните вводить email, телефон или имя для поиска по вашим контактам"
        }
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default Search;
