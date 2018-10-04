import React from "react";
import {Link} from "react-router-dom"

const Main = (props) => {
    const { servers, activate, deactivate } = props

    const loadAction = (status, index, id) => {

        return (
            <div>
                <button onClick={() => status ? deactivate(index) : activate(index)} className={`btn btn-${status ? "danger" : "success"}`}>{status ? "Deactivate" : "Activate"}</button>
                <Link to={`/addapi/${id}`} className="btn btn-warning ml-1">Add Api</Link>
            </div>
        )

    }

    const renderEach = (server, i) => {
        return (
            <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{server._id}</td>
                <td>{server.port}</td>
                <td>{server.running ? "Active" : "Inactive"}</td>
                <td>{loadAction(server.running, i, server._id)}</td>
            </tr>
        )
    }

    const renderAll = (data) => {
        return data.map(renderEach)
    }

    return (<div>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Sr. No</th>
                    <th scope="col">Server id</th>
                    <th scope="col">Port</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    servers ? renderAll(servers) : "Loading ..."
                }
            </tbody>
        </table>
    </div>)
}
export default Main