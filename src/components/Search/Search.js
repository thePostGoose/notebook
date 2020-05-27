import React from "react";
import classes from "./Search.module.scss";
import Imput from "../UI/Imput/Imput";
const Search = ({ value, onChange }) => {
  return (
    <div className={classes.Search}>
      <Imput
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
