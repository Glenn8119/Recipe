import React, { Fragment } from "react";


const RenderDetails = ({ renderedData, setFavoriteData, favoriteData }) => {
    const foodImg = renderedData.image;
    const name = renderedData.label;
    const ingredients = renderedData.ingredientLines === undefined ?
        null :
        renderedData.ingredientLines.map((ingredient,index) => {
            return (
                <p key={index}>． {ingredient}</p>
            )
        });
    const detailLink = renderedData.shareAs;
    const newWindow = () =>{
        window.open(detailLink);
    }

    //點擊按鈕時會檢查list是不是已經有這個recipe, 如果已經有就不加入收藏
    const clickBtn = () =>{
        //不用push的原因是push返回的值不會是新陣列, 而是一個數字
        let newItems = favoriteData.concat(renderedData);
        if(!favoriteData.includes(renderedData)){
            setFavoriteData(newItems);
        }else{
            alert("Already in the list!")
        }
    }

    return (
        <Fragment>
            {renderedData.length === 0 ? null :
                <Fragment>
                    <div className="pic mb-5">
                        <img src={foodImg} className="img-thumbnail" alt={name}/>
                    </div>
                    <dl className="row">
                        <dt className="col-sm-3">Name</dt>
                        <dd className="col-sm-9">{name}</dd>

                        <dt className="col-sm-3">Ingredient</dt>
                        <dd className="col-sm-9">{ingredients}</dd>
                    </dl>
                    <div className="d-flex justify-content-center">
                        <button onClick={newWindow} className="btn btn-success btn-lg">Get Detail !</button>
                        <button className="btn btn-warning btn-lg" onClick={clickBtn}>Add To Favovite</button>
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}


export default RenderDetails;