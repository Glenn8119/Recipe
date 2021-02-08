import React, { useEffect, useState } from "react";
import axios from "axios";

const SearchBar = (props) => {
    const [term, setTerm] = useState("burger");
    const [debouncedTerm, setDebouncedTerm] = useState(term);
    const [data, setData] = useState("");



    useEffect(() => {
        let timeoutID = setTimeout(() => {
            setDebouncedTerm(term);
        }, 1000)

        return () => {
            clearTimeout(timeoutID);
        }
    }, [term])

    useEffect(() => {
        const search = async (name) => {
            const res = await axios.get("https://api.edamam.com/search", {
                params: {
                    q: name,
                    app_id: "697d2fcf",
                    app_key: "f6521eaafb4834821afeff6bcb12187b"
                }
            })
            if (res.data.hits.length !== 0) {
                setData(res.data.hits[0].recipe.label);
            }
        }
        search(debouncedTerm);
    }, [debouncedTerm])

    const onSubmit = (e) => {
        e.preventDefault();
    }

    return (
        // <div>
        //     <form onSubmit={onSubmit}>
        //         <input
        //             type="text"
        //             value={term}
        //             onChange={(e) => setTerm(e.target.value)}
        //         />
        //     </form>
        //     <div>{data}</div>
        // </div>
        

        <div className="dropdown">
            <input
            className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false"
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
            />
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li><a className="dropdown-item" href="/#">Action</a></li>
                    <li><a className="dropdown-item" href="/#">Another action</a></li>
                    <li><a className="dropdown-item" href="/#">Something else here</a></li>
                </ul>
            </div>
    )
}

export default SearchBar;