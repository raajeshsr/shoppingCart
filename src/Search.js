import React, { useState, useReducer } from "react";

let data = ["apple", "banana", "cat", "cow", "amazing", "boat"];

export default function Search() {
  //   const [searchText, setSearchText] = useState("");
  let [state, dispatch] = useReducer(searchReducer, initialState);

  let results = data.filter((str) => {
    return str.startsWith(state);
  });
  function handleSearchTextChange(e) {
    console.log(state);
    dispatch({
      type: "update_search",
      text: e.target.value,
    });
  }

  return (
    <div>
      search
      {/* {state} */}
      <input
        type="text"
        name=""
        value=""
        onChange={handleSearchTextChange}
        value={state}
      />
      {state.length > 0 && results.map((result) => <p>{result}</p>)}
    </div>
  );
}

//reducer
function searchReducer(state, action) {
  switch (action.type) {
    case "update_search": {
      return action.text;
    }
  }
}

let initialState = "hello";
