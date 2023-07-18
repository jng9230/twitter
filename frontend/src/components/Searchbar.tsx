import React from 'react'
import { config } from '../utils/config';
import { profile } from 'console';
import { BiSearch } from 'react-icons/bi';
// import { searchUsers } from '../utils/APICalls';
import { useState } from 'react';
import { User } from '../utils/APITypes';
import { Link } from 'react-router-dom';

const Searchbar = () => {
    const [searchRes, setSearchRes] = useState<User[]>();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        const searchText = formJson.searchText as string;
        console.log(searchText)
        //call backend
        // searchUsers(searchText)
        //     .then(d => {
        //         setSearchRes(d)
        //     })
        //populate with clickable results
    }

    return (
        <>
            <div className="w-full sticky top-0 z-50">
                <div className="
                    w-full 
                    focus-within:border-twitter-blue 
                    border-2 
                    border-transparent 
                    rounded-full
                    bg-gray-200
                    focus-within:bg-white
                    text-gray-600
                    focus-within:text-twitter-blue
                ">
                    <form action="" onSubmit={handleSubmit} className="flex px-3 py-1 gap-2">
                        <label htmlFor="searchText" className="bg-transparent flex items-center"> 
                            <BiSearch size={20}/>
                        </label>
                        <input className="
                            focus:outline-none 
                            focus:ring-0 
                            w-full 
                            bg-transparent
                            text-black
                        "
                            type="text" name="searchText" id="searchText"/>
                    </form>
                </div>
                {
                    searchRes ?
                    <div className="rounded-full bg-white shadow-md px-2 py-2">
                        {
                            searchRes?.map(d => {
                                const profileImg = d.profileImg && d.profileImg !== "" ? d.profileImg
                                    : config.DEFAULT_PROFILE_IMG
                                return (
                                    <Link to={`/${d.handle}`} className="flex gap-3">
                                        <div>
                                            <img src={profileImg} alt="" className="w-11 h-auto rounded-full"/>
                                        </div>
                                        <div>
                                            <div> {d.username} </div>
                                            <div> @{d.handle} </div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                    : <></>
                }
            </div>
        </>
    )
}

export default Searchbar
