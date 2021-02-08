import React, { Fragment } from "react";

const FavoriteList = ({ favoriteData, setFavoriteData }) => {

    const favoriteList = favoriteData.map((item, index) => {

        const newWindow = () => {
            window.open(item.shareAs);
        }

        const rmv = () =>{
            let copyArr = [...favoriteData];
            copyArr.splice(index, 1);
            setFavoriteData(copyArr);
        }

        return (
            <div className="card mb-3" style={{ maxWidth: "540px" }} key={index}>
                <button type="button" className="close" aria-label="Close" onClick={rmv}>
                    <span aria-hidden="true">&times;</span>
                </button>
                <div className="row no-gutters">
                    <div className="col-4 favorite-image-box">
                        <img className="favorite-image" src={item.image} alt={item.label} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h6 className="card-title">{item.label} </h6>
                            <button className="btn btn-success btn-sm" onClick={newWindow}>Get Detail !</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    });

    return (
        <Fragment>
            {favoriteData.length === 0 ?
                null :
                <Fragment>
                    {favoriteList}
                </Fragment>
            }
        </Fragment>
    )
}

export default FavoriteList;