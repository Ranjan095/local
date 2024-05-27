import axios from "axios";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  let [page, setPage] = useState(1);
  let [data, setData] = useState([]);
  let [newData, setNewData] = useState([]);
  let [pageSize, setPageSize] = useState(1);
  let [buttArr, setButtArray] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let [isError, setIsError] = useState(false);
  let [input, setInput] = useState("");

//   console.log

  let handleSubmit = () => {
    let newData = data.filter((ele) => {
      if (ele?.title?.includes(input)) {
        return ele;
      }
    });
    setNewData(newData);
  };

  let createButton = () => {
    let arr = [];
    for (let i = 1; i <= pageSize; i++) {
      arr.push(i);
    }
    setButtArray(arr);
  };

  useEffect(() => {
    getData();
    createButton();
  }, [page]);

  let getData = () => {
    setIsLoading(true);
    axios
      .get(
        `https://fa27b89d-912b-4414-acd5-522e571d92d1.mock.pstmn.io/jobs?page=${page}
    `
      )
      .then((res) => {
        setIsLoading(false);
        createButton();
        setPageSize(res?.data?.page_size);

        setData(res?.data?.results);
        setNewData(res?.data?.results);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(false);
        console.log(err);
      });
  };

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      <div>
        <p className=" text-2xl font-bold">Users page</p>
        <input
          onChange={(e) => setInput(e.target.value)}
          required
          placeholder="search..."
          className=" border-2 "
        />
        <button
          onClick={handleSubmit}
          className=" m-2 p-2 bg-green-400 rounded-lg"
        >
          search
        </button>
      </div>
      <div className=" grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 space-x-2 m-2 ">
        {newData?.map((ele, i) => {
          //   console.log(ele);
          return (
            <div key={i} className=" border-2 hover:border-red-300 m-2 p-2">
              <p>title : {ele?.title}</p>
              <p> company name : {ele?.company_name}</p>
              <p> Experience : {ele?.primary_details?.Experience}</p>
              <p> Location : {ele?.primary_details?.Place}</p>
              <p> Qualification : {ele?.primary_details?.Qualification}</p>
            </div>
          );
        })}
      </div>
      {buttArr.map((ele) => {
        return (
          <button
            onClick={() => setPage(ele)}
            className=" m-2 p-2 bg-green-300"
            key={ele}
          >
            {ele}
          </button>
        );
      })}
    </div>
  );
};

export default Dashboard;
