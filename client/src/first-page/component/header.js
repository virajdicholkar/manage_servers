import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
    const { path } = props

    const goBack = () => {
        if (path !== "/")
            return <Link className="btn btn-primary ml-1" to="/">Go Back</Link>
    }
    
    const returnAddserver = () => {
        if (path != '/addserver')
            return <div>
                <Link className="btn btn-primary" to="addserver">Add server</Link>
            </div>
    }



    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
            <a className="navbar-brand" href="#">Server Manager</a>
            <div className="row ">
            {returnAddserver()}
            {goBack()}
            </div>
        </nav>
    )
}
export default Header