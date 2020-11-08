import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ListInfo from './ListInfo';
import ListSearch from './ListSearch';
import { useEffect } from 'react';

FormList.propTypes = {
    musics : PropTypes.array.isRequired,
    items : PropTypes.object,
};



function FormList(props) {
    let { musics , togglePlay} = props;
    const {onReceiveData ,songInfo }  = props;

    const handleMusic = (data) => {
        onReceiveData(data);
    }

    const [items, setItems] = useState([])
    const [filters, setFilters] = useState('')

    useEffect(
        () => {
            if(filters) {
                musics = musics.map(music => {
                    return music.name.toLowerCase().indexOf(filters) !== -1 ? music : ''
                })
            }
            setItems(musics)
        }
    ,[filters])

    // Func

    const handleFilterChange = (newFilter) => {
        setFilters(newFilter.toLowerCase())
    }

   

    return (
        <div className="sound">
            <ListInfo
                togglePlay = {togglePlay}
                songInfo = {songInfo}
            />
            {/* Sound List */}
            <table className="sound-list">
                <thead>
                    <tr className="row col" >
                        {/* Sound Tag */}
                        <th className="sound-list__tag l-8">
                            <span className="sound-list__tag--region">{songInfo.region}</span>
                            <span className="sound-list__tag--category">{songInfo.tag}</span>
                        </th>
                        {/* Sound search */}
                        <ListSearch
                            onSubmit = {handleFilterChange}
                        />
                        {/* End */}
                    {/* End */}
                    </tr>
                </thead>
                <tbody>
                    {items.map((item,index) => {
                            if (item) {
                                return (
                                    <tr 
                                        key = {index} 
                                        onClick = { () => handleMusic(item) }
                                    >
                                        <th>{((index + 1) < 10 ? ("0" + (index + 1)) : (index + 1) )}</th>
                                        <th>{item.name}</th>
                                        <th>
                                            <span className="artist__item">{item.artist}</span>
                                        </th>
                                        <th> {item.duration} </th>
                                        <th>
                                            <i className="fas fa-ellipsis-v"></i>
                                        </th>
                                    </tr>
                                )
                            }
                        })
                    }
                </tbody>
            </table>
        </div>
        // End
    );
}

export default FormList;