import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux"

import Header from "./component/header";
import Main from "./component/main";
import AddApi from "./component/add-api";
import AddServer from "./component/add-server";
import HttpService from "./../services/http-conn-service";
import { NOTIFIER_ID } from './../services/notification-service/notification-component'
import NotificationService from "./../services/notification-service/notification-service";
import {addServers} from "./../action"
import { Constants as Server_Constants } from "./../reducers/server";

class FirstPage extends Component {

    http = new HttpService()
    notifier = new NotificationService()
    /** Constructor */
    constructor(props) {
        super(props)
        this.state = {
            servers: []
        }

    }

    componentWillMount() {


        this.http.getServers().then(
            data => {
                const servers = data.data.data
                console.log('servers', servers)
                this.setState({ servers })
                
            }
        ).catch(err => {
            console.log('err', err)
        })
    }

    /** Update the state */
    updateServerState = (index, field, value) => {
        const { servers } = this.state
        servers[index][field] = value
        this.setState({ servers })
    }

    /** create server */
    createServer = (values) => {
        this.http.createServers(values).then(
            (data) => {
                this.notifier.setSuccessAlert(data.data.message);
                this.componentWillMount()
            }).catch(err => {
                this.notifier.setErrorAlert(err.response.data.error)
            })

    }

    /** activate server */
    activate = (index) => {
        const { servers } = this.state
        const { _id } = servers[index]
        this.http.startServers(_id).then(
            (data) => {

                this.notifier.setSuccessAlert(data.data.message)
                this.updateServerState(index, "running", true)
            }).catch(err => {
                this.notifier.setErrorAlert(err.response.data.error)
            })
    }

    /** deactivate server */
    deactivate = (index) => {
        const { servers } = this.state
        const { _id } = servers[index]
        this.http.stopServers(_id).then(
            (data) => {
                this.notifier.setSuccessAlert(data.data.message)
                this.updateServerState(index, "running", false)
            }
        ).catch(err => {
            this.notifier.setErrorAlert(err.response.data.error)
        })
    }

    /** create api */
    createApi = (id, values) => {
        this.http.createApi(id, values).then(
            data => {
                this.notifier.setSuccessAlert(data.data.message)
                console.log('data', data)
            }
        ).catch(err => {
            this.notifier.setErrorAlert(err.response.data.error)
            console.log('err', err)

        })
    }

    /** routes definition */
    routes = () => {
        return (
            <Switch>
                <Route path="/addserver" render={() => (<AddServer createServer={this.createServer} />)} />
                <Route path="/addapi/:id" render={() => (
                    <AddApi createApi={this.createApi} />
                )} />
                <Route path="" render={() => (
                    <Main servers={this.state.servers} activate={this.activate} deactivate={this.deactivate} />
                )} />
            </Switch>
        )
    }

    /** render method */
    render() {
        const { servers } = this.props
        console.log('servers', servers)
        return (
            <div>
                <Header path={this.props.location.pathname} />
                <div className="container m-3" >
                    <div id={NOTIFIER_ID} className="m-1"></div>
                    {this.routes()}
                </div>
            </div>
        )
    }
}

function mapStateToProps({ servers }) {
    return { servers }
}

export default connect(mapStateToProps, {addServers})(withRouter(FirstPage))