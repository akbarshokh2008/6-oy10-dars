import React, { useEffect, useRef, useState } from "react";
import http from "../axios";

function Home() {
  const nameRef = useRef();
  const decsRef = useRef();
  const colorRef = useRef();
  const formRef = useRef();
  const [boards, setBoards] = useState([]);

  function handleCreate(e) {
    e.preventDefault();
    const board = {
      name: nameRef.current.value,
      description: decsRef.current.value,
      color: colorRef.current.value,
    };
    http
      .post("/boards/create", board, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        if (data.data.message === "Board muvaffaqiyatli yaratildi") {
          alert("Ma'lumot muvaffaqiyatli saqlandi");
          setBoards((prevBoards) => [...prevBoards, board]);
          formRef.current.reset();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    http
      .get("/boards/my-boards")
      .then((data) => setBoards(data.data.boards))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container mx-auto ">
      <div className="forma w-1/3 bg-sky-600 mx-auto mt-20 border-2 border-solid border-white pt-8 rounded-lg">
        <h1 className="text-3xl text-white text-center font-bold">
          Create board
        </h1>
        <form ref={formRef} className="flex flex-col gap-4 rounded-sm  p-5 ">
          <input
            ref={nameRef}
            className="rounded-md border p-2 outline-none bg-white text-black"
            type="text"
            placeholder="Enter name.."
            required
          />
          <textarea
            ref={decsRef}
            className="rounded-md border p-2 outline-none"
            placeholder="Enter description..."
            required
          />
          <select ref={colorRef} className="w-28 p-2 bg-slate-200">
            <option value="green">green</option>
            <option value="red">red</option>
            <option value="orange">orange</option>
            <option value="yellow">yellow</option>
          </select>
          <button
            onClick={handleCreate}
            className="py-2 px-4 text-white rounded-2xl bg-slate-500"
          >
            Create
          </button>
        </form>
      </div>
      <h2 className="mt-16">
        <b className="text-zinc-800">Boards number: </b>
        {boards.length}
      </h2>
      <hr />
      <div className="wrapper grid grid-cols-3 gap-5 mt-10 pl-[5%]">
        {boards.length > 0 &&
          boards.map((board) => {
            return (
              <div
                className="card py-2 px-4 border rounded-lg w-[300px] shadow-lg"
                key={board.id}
              >
                <h3>
                  <b className="text-zinc-800">Name: </b>
                  {board.name}
                </h3>
                <p>
                  <b className="text-zinc-800">Desc: </b>
                  {board.description}
                </p>
                <h3>
                  <b className="text-zinc-800">Color: </b>
                  {board.color}
                </h3>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
