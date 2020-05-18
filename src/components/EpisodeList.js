import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";

const EpisodeList = props => {
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const [next, setNext] = useState(false);

  const [pageCount, setPageCount] = useState(0);

  const fetchEpisodes = async () => {
    setLoading(true);
    let number = 1;
    if (next) {
      number += 1;
    } else {
      number = 1;
    }
    const res = await axios.get(
      `https://rickandmortyapi.com/api/episode/?page=${number}`
    );

    if (res.data.info.next) {
      setNext(true);
    } else {
      setNext(false);
    }
    setPageCount(res.data.info.pages);
    let allRes = { ...res.data };
    setPosts(allRes.results);
    setLoading(false);
  };

  useEffect(() => {
    fetchEpisodes();
  }, []);

  //Get Current Posts
  const currentPosts = posts;

  //Change Page
  const paginate = pageNumber => {
    if (currentPage === pageNumber) {
      return;
    }
    setCurrentPage(pageNumber);
    fetchEpisodes();
  };

  //Number to call Api

  return (
    <div className="text-monospace">
      <button className="btn btn-secondary text-justify d-flex p-2 mx-4 mt-4">
        <Link to="/findbyname" className="text text-light">
          Find Episode By Name
        </Link>
      </button>
      <div className="container mt-5 ">
        <h1>Rick And Morty</h1>
        <h2 className="text-primary mb-3">EpisodeList</h2>

        <Post posts={currentPosts} loading={loading} />
        <Pagination totalPage={pageCount} paginate={paginate} />
      </div>
    </div>
  );
};

export default EpisodeList;
