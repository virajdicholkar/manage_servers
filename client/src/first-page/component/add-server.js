import React from "react";
import { Field, reduxForm } from "redux-form";

export const renderField = (field) => {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
        <div className={className}>
            <label>{field.label}</label>
            <field.tag className="form-control" type={field.type} {...field.input} />
            <div className="text-help">
                {touched ? error : ""}
            </div>
        </div>
    );
}

const AddServer = (props) => {
    const {handleSubmit, createServer}=props
    return (
        <form className="container" onSubmit={handleSubmit(createServer)}>
            <Field component={renderField}
                label="Name"
                name="host"
                tag="input"
                type="text"
            />
            <Field component={renderField}
                label="Port"
                name="port"
                tag="input"
                type="number"
            />
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )


}


export default reduxForm({  form: "addServerForm" })(AddServer)