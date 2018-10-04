import React from "react";
import { Field, reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";

import { renderField } from "./add-server";

const AddApi = (props) => {
    const { handleSubmit, createApi } = props
    const { id }=props.match.params
    console.log('props.match', props.match)
    const addApi=(values)=>{
        createApi(id,values)
    }

    return (
        <form className="container" onSubmit={handleSubmit(addApi)}>
            <Field component={renderField}
                label="Api path"
                name="api"
                type="text"
                tag="input"
            />
            <Field component={renderField}
                label="Api Method"
                name="method"
                tag="input"
                type="text"
            />

            <Field component={renderField}
                label="Api response function"
                name="response"
                tag="textarea"
            />

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}
export default reduxForm({  form: "addApiForm" })(withRouter(AddApi))
