"use client";
import { apiBaseUrl } from "@/config";
import { populateFieldsApi } from "@/controller/controller";
import Error from "next/error";
import React, { useEffect, useState } from "react";

const Comments = ({ data }) => {
  const [comment, setcomment] = useState("");
  const [userids, setuserids] = useState();
  const [makers, setmakers] = useState();
    const [condition, setcondition] = useState(data.reviews);
    const [load, setload] = useState(false)
  // console.log("commet", data);
  // console.log("ccc", comment);
var temp
  useEffect(() => {
    try {
      const jwtverify = async () => {
        const verifydone = await fetch(`${apiBaseUrl}/api/tokengetter`, {
          method: "Post",
        });
        const responseVerify = await verifydone.json();
        return responseVerify;
      };
      const userId = jwtverify().then((response) => {
        if (response.success !== false) {
          // console.log("restt", response);
          setuserids(response.verifytoken.userid);
          return response.verifytoken.userid;
        } else {
          // console.log("not found user");
        }
      });
    } catch (error) {
      // console.log("not login error");
    }
  }, []);

  // console.log("ids", userids);
  const postComment = async () => {
    // console.log("yeyeyeye", userids);
    if (userids == undefined) {
      // console.log("error user login");
    }

      if (userids != undefined) {
        const Populateres = await populateFieldsApi(userids)
        const populateResDone = await Populateres.json()
        
          if (comment) {
              setload(true)
          try {
            const commentAdd = await fetch(`${apiBaseUrl}/api/commentAdd`, {
                method: "Post",
                body: JSON.stringify({
                  comment: comment,
                  id: data.id,
                  userid: userids,
                }),
              });
          } catch (error) {
            
          }finally {
            setload(false); // Hide loading indicator after fetching
          }
       

        const temp = {
          comment:  `${comment}`,
            reviewerEmail: "",
            date: new Date(),
            reviewerName: `${populateResDone.message[0].name}`,
            rating: 5,
            
          };
          
          setcondition([...condition, temp])
          
      }
    } else {
      alert("you need to login");
    }
    };
    
    // console.log("condition", condition);
    // console.log("condition2", load);
  return (
    <>
      <div className="userComments hidden absolute z-10 w-full left-0 top-3">
        <div className="w-fit flex mx-auto mt-2  ">
          <div className="bg-[#171616] border-md p-4 dark:bg-gray-900 lg:pt-10 w-[35rem]  h-[580px] flex antialiased">
            {data !== undefined ? (
              <div className="max-w-2xl w-full overflow-auto custom-scrollbar h-full">
                <div className="flex justify-between items-center pl-5">
                  <h2 className="text-lg lg:text-2xl font-bold text-white dark:text-white">
                    Discussion ({data.reviews?.length})
                  </h2>
                </div>

                {condition.map((items, idx) => (
                  <>
                    <article className="p-6 text-base rounded-lg dark:bg-gray-900">
                      <footer className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <p className="inline-flex items-center mr-3 text-sm text-gray-500 dark:text-white font-semibold">
                            {/* <img/> */}
                            {items.reviewerName}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            <time>
                              {new Date(items.date).toLocaleDateString()}
                            </time>
                          </p>
                        </div>

                        {/* <!-- Dropdown menu --> */}
                      </footer>
                      <p className="text-gray-500 dark:text-gray-400">
                        {items.comment}
                      </p>
                      <div className="flex items-center mt-4 space-x-4">
                        <button
                          type="button"
                          className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                        >
                          <svg
                            className="mr-1.5 w-3.5 h-3.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                            />
                          </svg>
                          Reply
                        </button>
                      </div>
                    </article>
                  </>
                ))}

                <div className="  sticky bottom-0 w-full bg-[#171616]">
                  <div className=" py-2 px-4 rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <label for="comment" className="sr-only">
                      Your comment
                    </label>
                    <textarea
                      onChange={(e) => {
                        setcomment(e.target.value);
                      }}
                      value={comment}
                      id="comment"
                      rows="6"
                      className="px-0 w-full h-5 bg-[#171616] text-sm text-white border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800 resize-none"
                      placeholder="Write a comment..."
                      required
                    ></textarea>
                  </div>
                  <button
                    onClick={(e) => {
                                          postComment();
                                          
                    }}
                    className=" mt-2 mb-3 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                  >
                   {load==false?"Post comment":<div role="status">
    <svg aria-hidden="true" class="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>}
                  </button>
                </div>
              </div>
            ) : (
              <p>something went wrong</p>
            )}
          </div>
          <div className="w-fit h-fit">
            <svg
              onClick={() => {
                const commentClose = document.querySelector(".userComments");
                commentClose.classList.add("hidden");
              }}
              className="w-5 h-5 cursor-pointer"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">close</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comments;
