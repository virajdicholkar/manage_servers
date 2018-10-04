import HttpService from "./../services/http-conn-service";

import { Constants as Server_Constants } from "./../reducers/server";

const http = new HttpService()
export function addServers() {
    return (dispatch) => {
    http.getServers().then(
        data => {
            const servers = data.data.data
            {
                dispatch({
                    type: Server_Constants.SERVER_ADDED,
                    payload: servers
                })
            }
        }
    ).catch(err => {
        console.log('err', err)
        return (dispatch) => {
            dispatch({
                type: Server_Constants.SERVER_ADDED,
                payload: []
            })
        }
    })
}}