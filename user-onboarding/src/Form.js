import React, {useState, useEffect} from "react";
import {withFormik, Form, Field} from "formik";
import * as Yup from "yup";
import axios from "axios";

function MyForm({values, errors, touched, status}) {
    const [user, setUser] = useState([]);
    useEffect(()=> {
        status && setUser(user => [...user, status]);
    },[status])
    return(
        <div className='form-holder'>
            <Form className='form-box'>
                <label htmlFor='name'/>
                <Field id='name'
                type='text'
                name='name'
                placeholder='Input Name'></Field>

                {touched.name && errors.name && (
                    <p>{errors.name}</p>
                )}

                <label htmlFor='email'/>
                <Field id='email'
                type='text'
                name='email'
                placeholder='Input Email'></Field>

                {touched.email && errors.email && (
                    <p>{errors.email}</p>
                )}

                <label htmlFor='password'/>
                <Field id='password'
                type='text'
                name='password'
                placeholder='Input Password'></Field>

                <label htmlFor='terms'>Have Read Terms and Conditions</label>
                <Field id='terms'
                type='checkbox'
                name='terms'
                checked={values.terms}></Field>

                <button className='submit-button' type='submit'>Submit</button>
            </Form>
            {user.map(item => {
                return (
                    <ul key={item.id}>
                        <li>Name: {item.name}</li>
                        <li>Email: {item.email}</li>
                        <li>Terms accepted: {`${item.terms}`}</li>
                    </ul>
                );
            })}
        </div>
    );
}

const FormikMyForm = withFormik({
    mapPropsToValues(props) {
        return {
            name: props.name || "",
            email: props.email || "",
            password: props.password || "",
            terms: props.terms || false,
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Must Enter Name, Boy!'),
        email: Yup.string().required('Youre email be mandatory!')
    }),
    handleSubmit(values, {setStatus, resetForm}) {
        axios.post('https://reqres.in/api/users', values).then(response => {
            console.log("Axios Response", response)
            setStatus(response.data);
            resetForm();
        }).catch(error => console.log("Axios Error: ", error));
    }
})(MyForm);

export default FormikMyForm;