import React, { useState, useContext, useEffect, useRef } from "react";
import { DataContext } from "../Context/Context";
import Card from "./Card";

// useNavigate from react-router-dom is used to navigate to a route on button click
import { useNavigate } from "react-router-dom";

// debounce is used for implementing debouncing for api calls
import { debounce } from "lodash";
function Home() {
  // useEffect initiates localStorage item
  useEffect(() => {
    localStorage.setItem("personal_collection", JSON.stringify([]));
  }, []);

  // inputRef to store a reference for the search-bar
  const inputRef = useRef(null);

  // intermediate loader while data is being fetched
  const [showLoader, setShowLoader] = useState(false);

  // using the context function from App.js
  const contextVar = useContext(DataContext);

  // returning the function to a variable 'navigate'
  const navigate = useNavigate();

  // fetch function implemented with debouncing
  const fetchBooks = debounce(async () => {
    try {
      // loader set to true
      setShowLoader(true);
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${inputRef.current.value}&limit=10&page=1`
      );
      const jsonRes = await response.json();

      // loader removed
      setShowLoader(false);

      // response status
      contextVar.setResponseReceived(true);

      // storing received data in a local state
      contextVar.setBooksData(jsonRes);
    } catch (err) {
      console.log(err);
    }
  }, 1000);

  return (
    <>
      <div className="bg-[#006989] mx-2 md:mx-[20%] py-3 rounded-lg flex px-3 gap-x-3">
        <input
          type="text"
          onChange={fetchBooks}
          ref={inputRef}
          placeholder="Title / Author"
          className="border w-[80%] py-1 md:py-3 px-2 drop-shadow-lg rounded-lg focus:outline-none active:outline-none hover:placeholder:translate-y-[-12px] hover:placeholder:text-[12px] placeholder:duration-300 placeholder:ease-in-out"
        />

        <button
          onClick={() => {
            navigate("/personal");
          }}
          className="border bg-[#000] text-white px-4 w-40 rounded-lg text-[8px] md:text-[14px]"
        >
          Visit Personal BookShelf
        </button>
      </div>
      <div className="flex flex-col px-2 py-2 gap-y-2 md:gap-3">
        {showLoader && <p>Loading Data</p>}
        {!showLoader && !contextVar.responseReceived && (
          <p className="self-center text-[20px]">
            Type Author or Book Name in the Search Bar
          </p>
        )}
        <div className="flex flex-col md:flex-row px-2 gap-y-2 md:flex-wrap md:gap-4 md:pl-28">
          {
            // checking response status
            contextVar.responseReceived &&
              contextVar.booksData.docs.map((elem, index) => {
                return (
                  <Card
                    title={elem.title}
                    editCount={elem.edition_count}
                    key={elem.key}
                    index={index}
                    insiePersonalShelf={false}
                  />
                );
              })
          }
        </div>
      </div>
    </>
  );
}

export default Home;
