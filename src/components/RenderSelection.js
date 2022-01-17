import React, { Fragment } from "react";

//負責顯示智慧搜尋選單
const RenderSelection = ({ data, deleteTerm, setRenderedData }) => {

    const onclick = (e) => {
        deleteTerm();
        //選擇要render的data, 只要點擊的選項符合資料中的某一筆數據, 就將這筆資料回傳給主畫面(RenderedDetails)
        for(let i=0; i<5; i++){
            if(e.target.innerText === data[i].recipe.label){
                setRenderedData(data[i].recipe);
            }
        }
    }

    const options = data.map(({recipe},index) => {
        return (
                <a className="dropdown-item option" onClick={onclick} key={index} href="/#">
                    <h1>{recipe.label}</h1>
                </a>
        )
    })

    return (
        <Fragment>
            {options}
        </Fragment>
    )
}

export default RenderSelection;