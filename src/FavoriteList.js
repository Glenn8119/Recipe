import React, { Fragment, useRef } from "react";

const FavoriteList = ({ favoriteData, setFavoriteData, setRenderedData }) => {
    const refDetail = useRef();
    const refClose = useRef();

    const favoriteList = favoriteData.map((item, index) => {
        const newWindow = (e) => {
            e.stopPropagation();
            window.open(item.shareAs);
        }

        const rmv = (e) => {
            e.stopPropagation();
            let copyArr = [...favoriteData];
            copyArr.splice(index, 1);
            setFavoriteData(copyArr);
        }

        const reShow = (e) => {
            if (!refDetail.current.contains(e.target) && !refClose.current.contains(e.target)) {
                setRenderedData(item);
            } else {
                return;
            }
        }

        return (
            <div className="card mb-3" style={{ maxWidth: "540px" }} key={index} onClick={reShow}>
                <button type="button" className="close" aria-label="Close" onClick={rmv} ref={refClose}>
                    <span aria-hidden="true">&times;</span>
                </button>
                <div className="row no-gutters">
                    <div className="col-4 favorite-image-box">
                        <img className="favorite-image" src={item.image} alt={item.label} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h6 className="card-title">{item.label} </h6>
                            <button className="btn btn-success btn-sm" onClick={newWindow} ref={refDetail}>Get Detail !</button>
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