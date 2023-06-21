import React, { useState } from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import "./Feed.css";
import VideoList from "../containers/VideoList";
import useApi from "../utils/useApi";
import SkeletonVideoCard from "../components/Placeholders/SkeletonVideoCard";
import SkeletonVideoList from "../components/Placeholders/SkeletonVideoList";

const SearchFeed = () => {
  const { searchTerm } = useParams();
  // const [data, setData] = useState([]);

  // useEffect(()=>{
  //   api(`search?q=${searchTerm}&region=IN`).then((response)=>{
  //     setData(response)
  //   })
  //  },[searchTerm])
  //  console.log(data)
  const { data, isLoading, isError } = useApi(
    `search?q=${searchTerm}&region=IN`
  );
  if (isError) return "An error has occurred.";
  if (isLoading)
    return (
      <div className=" bg-black h-screen overflow-scroll scrollbar-hide">
        <div className="rounded-2xl pt-16 lg:ml-4  overflow-hidden">
          <div className="p-2 ml-5">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                type: "tween",
                ease: "easeInOut",
                duration: 0.5,
              }}
              className=" text-base font-medium "
            >
              Search results for{" "}
              <span className=" text-red-500 "> {searchTerm}</span>
            </motion.p>
          </div>
          <SkeletonVideoList />
        </div>
      </div>
    );

  if (data) {
    return (
      <div className="">
        <div className="rounded-tl-[2rem] pt-16 bg-black max-h-screen overflow-scroll scrollbar-hide scroll-pb-16">
          <div className="p-2 ml-8">
            <p className=" text-base font-medium ">
              Search results for{" "}
              <span className=" text-red-500 "> {searchTerm}</span>
            </p>
          </div>
          <div className="flex flex-wrap p-2 overflow-scroll scrollbar-hide">
            <VideoList data={data} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className=" h-screen bg-black
      
    "
      ></div>
    );
  }
};

export default SearchFeed;
