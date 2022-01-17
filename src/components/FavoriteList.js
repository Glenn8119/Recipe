import React, { Fragment, useRef } from "react";

const FavoriteList = ({ favoriteData, setFavoriteData, setRenderedData }) => {
    const refDetail = useRef();
    const refClose = useRef();

    const favoriteList = favoriteData.map((item, index) => {
        //點擊Detail用新視窗開啟網頁
        const newWindow = (e) => {
            e.stopPropagation();
            window.open(item.shareAs);
        }

        //點擊x取消favorite list裡面的item
        const rmv = (e) => {
            e.stopPropagation();
            //因為splice會改變array的值, 不能直接用在state值上面
            let copyArr = [...favoriteData];
            copyArr.splice(index, 1);
            setFavoriteData(copyArr);
        }

        //點擊favorite list裡面的項目時(非x和button時)會在主畫面顯示該食譜
        const reShow = (e) => {
            if (!refDetail.current.contains(e.target) && !refClose.current.contains(e.target)) {
                setRenderedData(item);
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