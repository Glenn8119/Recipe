import "./style.css";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import SearchBar from "./SearchBar";
import RenderDetails from "./RenderDetails";
import FavoriteList from "./FavoriteList";

//data = 輸入關鍵字後顯示的五個data
//renderedData = 顯示在主畫面的data,是一個array
//favoriteData = 顯示在favorite list上的data,是一個array

const App = () => {
    //顯示在主畫面的data
    const [renderedData, setRenderedData] = useState([]);
    //顯示在list上的data
    const [favoriteData, setFavoriteData] = useState([]);
    return (
        <div>
            <h1 className="title mx-auto mt-3">r e c i p e</h1>
            <div className="container mt-4 pt-4 mb-4 rounded">
                <SearchBar setRenderedData={setRenderedData} />
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-7 p-3 mb-3 main-col">
                        <RenderDetails renderedData={renderedData} setFavoriteData={setFavoriteData} favoriteData={favoriteData}/>
                    </div>
                    <div className="col-3 favorite mb-3 rounded">
                        <p className="list-title text-center mt-3 mb-3">Favorite List</p>
                        <FavoriteList favoriteData={favoriteData} setFavoriteData={setFavoriteData} setRenderedData={setRenderedData}/>
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.querySelector("#root")
)