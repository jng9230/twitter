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
        <>
            <div className="w-full sticky top-0 z-50">
                <div className="w-full bg-white">
                    <form action="" onSubmit={handleSubmit}></form>
                    <label htmlFor="searchText"></label>
                    <input type="text" name="searchText" id="searchText"/>
                    <button type="submit">
                        search
                    </button>
                </div>
            </div>
            <div className="sticky top-0">
                <div className="w-full h-96 border-2 border-black bg-gray-400">
                    BIG BOI
                </div>
                <div className="w-full h-96 border-2 border-black bg-gray-400">
                    BIG BOI
                </div>
                <div className="w-full h-96 border-2 border-black bg-gray-400">
                    BIG BOI
                </div>
                <div className="w-full h-96 border-2 border-black bg-gray-400">
                    BIG BOI
                </div>
            </div>
        </>
    )
}

export default Searchbar
