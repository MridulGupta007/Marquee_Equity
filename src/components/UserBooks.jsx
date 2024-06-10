import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { DataContext } from "../Context/Context";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
function UserBooks() {
  const contextVar = useContext(DataContext);

  // local state to fetch and store the personal_collection from localStorage
  const [getBooks, setGetBooks] = useState([]);

  // fetching personal books of user from localStorage on Component Mount, useEffect re-runs when a book is added or removed
  useEffect(() => {
    setGetBooks(JSON.parse([localStorage.getItem("personal_collection")]));
  }, [contextVar.personalShelf]);

  const navigate = useNavigate();
  return (
    <div className="flex flex-col py-2">
      <div className="bg-[#006989] mx-2 md:mx-[30%] py-3 rounded-lg flex justify-center px-3 gap-x-5">
        <h1 className="text-[12px] font-mono md:text-[20px] underline underline-offset-4">
          My Personal BookShelf
        </h1>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="border bg-black text-white px-4 py-2 w-32 rounded-lg text-[8px] md:text-[14px]"
        >
          Visit Home
        </button>
      </div>
      <div className="flex flex-col md:flex-wrap md:flex-row px-2 py-3 gap-3 ">
        {
          // verifying the existence of received books from localStorage
          getBooks && getBooks.length > 0 ? (
            getBooks.map((elem, index) => {
              return (
                <Card
                  title={elem.title}
                  editCount={elem.edition}
                  key={index}
                  index={index}
                  insidePersonalShelf={true}
                />
              );
            })
          ) : (
            <p>No books currently</p>
          )
        }
      </div>
    </div>
  );
}

export default UserBooks;
