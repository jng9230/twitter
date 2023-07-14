import React from 'react'
import { AiOutlineConsoleSql } from 'react-icons/ai';

const Searchbar = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        const searchText = formJson.searchText as string;
        console.log(searchText)
        //call backend
        //populate with clickable results
    }
    return (
        <div className="w-full sticky top-0">
            <div className="">
                <form action="" onSubmit={handleSubmit}></form>
                <label htmlFor="searchText"></label>
                <input type="text" name="searchText" id="searchText"/>
                <button type="submit">
                    search
                </button>
            </div>
        </div>
    )
}

export default Searchbar
