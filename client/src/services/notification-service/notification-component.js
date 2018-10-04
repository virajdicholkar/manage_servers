import React from 'react'
import ReactDOM from 'react-dom';

export const NOTIFIER_ID="Notification"

const NotificationComponent=(props)=> {

   

    /***************************/
    /*Methods*/
    const resetNotifier=()=>{
        ReactDOM.unmountComponentAtNode(document.getElementById(NOTIFIER_ID))
    }

    setTimeout(resetNotifier,3000);
    return(
        <div className={`alert alert-${props.classes}`}>{props.message}</div>
    )

} 

export default NotificationComponent;