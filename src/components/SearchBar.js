import React, { useEffect, useState, useRef, Fragment } from "react";
import axios from "axios";
import RenderSelection from "./RenderSelection";

const SearchBar = ({ setRenderedData }) => {
    const [term, setTerm] = useState("");
    //一秒後input的值,用來減少get request的次數
    const [debouncedTerm, setDebouncedTerm] = useState(term);
    const [data, setData] = useState([]);
    const refMenu = useRef();
    const refDropdown = useRef();
    const deleteTerm = () => {
        setTerm("");
        refMenu.current.classList.remove("show");
    }

    //點擊dropdown以外的任何地方都要收合dropdown
    document.addEventListener("click", (e) => {
        if (!refDropdown.current.contains(e.target)) {
            refMenu.current.classList.remove("show");
        }
    })

    //在0.5秒內改變input的值都不會request
    useEffect(() => {
        let timeoutID = setTimeout(() => {
            setDebouncedTerm(term);
        }, 500)

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
                    app_key: "f6521eaafb4834821afeff6bcb12187b",
                    from: "0",
                    to: "5"
                }
            })
            //如果查詢有結果則將結果設定為data
            if (res.data.hits.length !== 0) {
                setData(res.data.hits);
                //雖然data有傳給renderselection, 但是沒有show, 所以要加下面這行
                refMenu.current.classList.add("show");
            }
            //起始畫面/查詢沒有結果/將input改成空白值 這三個狀況就收合dropdown
            else {
                setData([]);
                //如果沒有下面這行把selection隱藏起來, 會跑出空的selection
                refMenu.current.classList.remove("show");
            }
        }
        search(debouncedTerm);
    }, [debouncedTerm])

    const onSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <Fragment>
            <form className="dropdown" ref={refDropdown} onSubmit={onSubmit}>
                <input
                    className="dropdown-toggle form-control"
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="Search For a Food..."
                />
                <div className="dropdown-menu" ref={refMenu}>
                    <RenderSelection data={data} deleteTerm={deleteTerm} setRenderedData={setRenderedData} />
                </div>
            </form>
        </Fragment>
    )
}

export default SearchBar;