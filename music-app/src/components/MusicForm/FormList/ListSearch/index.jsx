import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useRef } from 'react';


ListSearch.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

ListSearch.defaultProps = {
    onSubmit: null,
}

function ListSearch(props) {

    const { onSubmit } = props;

    const [searchTerm, setSearchTerm] = useState(undefined)

    const typingTimeoutRef = useRef(null)


    const handleChange = (e) => {
        const value = e.target.value
        setSearchTerm(value);

        if (!onSubmit) return;

        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)

        typingTimeoutRef.current = setTimeout(() => {
            onSubmit(value)
        }, 400)
    };

    return (
        <th className="sound-list__search l-4">
            <input 
                type="text" 
                placeholder="Search . . . "
                onChange = {handleChange}
                value = {searchTerm || ''}
            />
            <i className="fas fa-search"></i>
        </th>
    );
}

export default ListSearch;