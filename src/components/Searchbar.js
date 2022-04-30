import React from "react";
import '../styles/Searchbar.css'
import SearchIcon from '@mui/icons-material/Search';

const Searchbar = ({placeholder, data}) => {

    return(
        <div className="search">
            <div className="searchInputs">
                <input type="text" placeholder={placeholder}/>
                <div className="searchIcon"><SearchIcon/></div>
            </div>
            <div className="dataResult"></div>
        </div>
    )


}