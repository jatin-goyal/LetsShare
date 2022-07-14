import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsArrowUpRightCircleFill } from "react-icons/bs";

import { urlFor, client } from "../client";
import { fetchUser } from "../utils/fetchUser";

const Pin = ({ pin: { postedBy, image, _id, destination, title } }) => {
  const [postHovered, setPostHovered] = useState(false);

  const navigate = useNavigate();

  let user;

  const fetching = () => {
    user = fetchUser();
  };

  fetching();

  const deletePin = (id) => {
    client.delete(id).then(() => {
      fetching();
      window.location.reload();
    });
  };

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img
          className="rounded-lg w-full"
          alt="user-post"
          src={urlFor(image).width(250).url()}
        />
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
            </div>
            <div className="flex justify-between items-center w-full gap-2">
              {!!destination ? (
                <a
                  onClick={(e) => e.stopPropagation()}
                  href={destination}
                  target="_blank"
                  rel="norefferer"
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md h-8"
                >
                  <BsArrowUpRightCircleFill />
                  {destination?.length > 17
                    ? destination?.slice(8, 18) + "..."
                    : destination}
                </a>
              ) : (
                <a
                  href={destination}
                  rel="norefferer"
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md h-8"
                >
                  <BsArrowUpRightCircleFill />
                  Undefined
                </a>
              )}
              {postedBy?._id === JSON.parse(user)?.uid && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                  className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      {/* <p style={{ fontWeight: "800", fontSize: "20px" }}>{title}</p> */}
      <Link
        to={`/user-profile/${postedBy?._id}`}
        className="flex gap-2 items-center"
        // style={{ borderBottom: "1px solid gray" }}
      >
        <p className="nameInitial p-1 mt-2" style={{ fontSize: "12px" }}>
          {postedBy?.username[0]}
        </p>
        <p className="font-semibold capitalize text-gray text-md ">
          {postedBy?.username}
        </p>
      </Link>
    </div>
  );
};

export default Pin;
