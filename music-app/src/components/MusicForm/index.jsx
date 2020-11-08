import React, { useState } from 'react';
import FormAlbum from './FormAlbum/';
import FormList from './FormList/';
import PropTypes from 'prop-types';

MusicForm.propsTypes = {
    musics : PropTypes.object,
    onReceived : PropTypes.func,
    song: PropTypes.object,
    togglePlayFunc : PropTypes.func,
}
MusicForm.defaultProps = {
    musics : {},
    song : {},
    onReceived :null,
    togglePlayFunc : null,
}


function MusicForm(props) {
    const { musics,
            onReceived, 
            song,
            togglePlay
            } = props;


    const [ songInfo, setSongInfo ] = useState(musics[0])


    if(song !== songInfo) {
        setSongInfo(song)
    }

    const onReceiveData = (data) => {
        setSongInfo(data)
        onReceived(data)
    }


    return (
        <main className="col l-12 m-12 c-12">
            <div className="row">
                {/* Ablum */}
                <div className="col l-4 c-12 m-12">
                    <FormAlbum
                        songInfo = { songInfo }
                        togglePlay = { togglePlay }
                    />
                </div>
                {/* End */}
                {/* Sound List */}
                <div className="col l-8 m-12 c-12">
                    <FormList
                        togglePlay = { togglePlay }
                        songInfo = { songInfo }
                        musics = {musics}
                        onReceiveData = { onReceiveData }
                    />
                </div>
                {/* End */}
            </div>
            {/* End */}
        </main>
    );
}

export default MusicForm;