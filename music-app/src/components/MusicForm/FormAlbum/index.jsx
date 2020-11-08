import React from 'react';
import PropTypes from 'prop-types';


FormAlbum.PropsType = {
    songInfo : PropTypes.object,
}

function FormAlbum(props) {

    const { songInfo, togglePlay } = props;
    return (
        <div className="album">
            <img
                alt={ songInfo.name }
                src = { songInfo.img }
                className = { togglePlay === false ? "rotate-img" : "un-rotate-img" }
            />
            <span>
                {songInfo.des}
            </span>
      </div>
    );
}

export default FormAlbum;