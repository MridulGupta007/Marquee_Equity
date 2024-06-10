import React, { useContext } from "react";
import { DataContext } from "../Context/Context";

function Card({ title, editCount, insidePersonalShelf, index }) {
  const contextVar = useContext(DataContext);
  
  // function to remove books from personal_collection in localStorage
  const removeFromMyBooks = () => {

    // extracting javascript object from JSON data
    const currList = JSON.parse(localStorage.getItem("personal_collection"))

    // deleting the specified item from array-of-objects
    currList.splice(index, 1)
    contextVar.setPersonalShelf(currList)

    // using JSON.stringify so that data gets stored in localStorage instead of the type of data-structure
    // If JSON.stringify is not used, data gets stored as => [object Object]
    localStorage.setItem('personal_collection', JSON.stringify(currList))
  }

  // adding a book to personal collection
  const addBook = () => {

    // two-part implementation of addition to personal_collection

    // first-book to be added, no repetition of title is possible as collection is currently empty
    if (contextVar.personalShelf.length === 0) {
      
      // updating global state to manage personal collection
      contextVar.setPersonalShelf((prev) => [
        ...prev,
        { title: title, edition: editCount },
      ]);

      // adding book to personal collection in localStorage
      localStorage.setItem(
        "personal_collection",
        JSON.stringify([{ title: title, edition: editCount }])
      );

      // notification of addition of book
      alert("book added");

    } else {

      // fetching the existing list from localStorage
      const list = JSON.parse(localStorage.getItem("personal_collection"));

      // checking if the current title already exists in the personal_collection to avoid repetition
      let repeatedItem = list.filter((elem) => elem.title === title);
      
      // if title is not present, proceed to add title to personal_collection
      !repeatedItem.length > 0 &&
        localStorage.setItem(
          "personal_collection",
          JSON.stringify([
            ...contextVar.personalShelf,
            { title: title, edition: editCount },
          ])
        );
      !repeatedItem.length > 0 &&
        contextVar.setPersonalShelf((prev) => [
          ...prev,
          { title: title, edition: editCount },
        ]);

      // notification if title is added
      !repeatedItem.length > 0 && alert("book added");

      // notification if title is already present, title wont be added again
      repeatedItem.length > 0 && alert("book already present");
    }
  };
  return (
    <div className="flex flex-col justify-around border md:w-[30%] py-3 px-2 gap-y-3 drop-shadow-lg rounded-lg min-h-[200px] shadow-lg bg-[#F3F7EC] hover:scale-105 duration-500 ease-in-out">
      <h1 className="self-center text-[16px] md:text-[20px] underline underline-offset-4">
        {title}
      </h1>
      <p className="self-center text-[12px] md:text-[14px]">
        Edition Count: {editCount}
      </p>

      {!insidePersonalShelf ? (
        <button
          className="w-[30%] text-[10px] md:text-[14px] md:w-[40%] self-center border py-2 px-3 rounded-lg bg-[#4caf50] text-white hover:bg-[#449747] "
          onClick={addBook}
        >
          Add to MyBooks
        </button>
      ) : (
        <button
          className="w-[30%] text-[10px] md:text-[14px] md:w-[40%] self-center border py-2 px-3 rounded-lg bg-[#4caf50] text-white hover:bg-[#449747] "
          onClick={removeFromMyBooks}
        >
          Remove from MyBooks
        </button>
      )}
    </div>
  );
}

export default Card;
