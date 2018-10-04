import React from 'react'
import ReactDOM from 'react-dom';
import NotificationComponent, {NOTIFIER_ID} from './notification-component'


class NotificationService {
    notifierIdName=NOTIFIER_ID;

    /** Methods */

    setSuccessAlert(msg){
        ReactDOM.render(
            (
                <NotificationComponent classes='success' message={msg}/>
            ),
            document.getElementById(this.notifierIdName)
        )               
    }

    setErrorAlert(msg){
        ReactDOM.render(
            (
                <NotificationComponent classes='danger' message={msg}/>
            ),
            document.getElementById(this.notifierIdName)
        )               
    }

} 

export default NotificationService;