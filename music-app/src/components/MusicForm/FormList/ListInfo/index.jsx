import React from 'react';
import PropTypes from 'prop-types';

ListInfo.PropsTypes = {
    songInfo : PropTypes.object,
}

function ListInfo(props) {

    const { songInfo, togglePlay } = props;

    return (
        // Sound Info
        <div className="sound__info">
            <h3>Album</h3>
            <div className="sound__info--ball">
                <h1>{songInfo.name}</h1>
                <span className={(togglePlay === false || '') ? '' : 'hide-ball'}>
                    <div></div>
                    <div></div>
                    <div></div>
                </span>
            </div>
            <span>By : {songInfo.artist} </span>
        </div>
        // End
    );
}

export default ListInfo;