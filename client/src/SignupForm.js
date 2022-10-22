import React, {useState} from "react";
import {Button, Checkbox, Form} from "semantic-ui-react";

function SignupForm() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        passwordConfirmation: "",
        premiumUser: "false",
    })

    function handleSubmit(e){
        e.preventDefault()
        console.log(formData)
    }

    return(
        <Form onSubmit={handleSubmit}>
            <Form.Field>
                <label>Username (Your email address will be your username):</label>
                <input
                    placeholder={"Please enter an email address!"}
                    value={formData.username}
                    onChange={(e)=>{setFormData({...formData, username: e.target.value})}}
                />
            </Form.Field>
            <Form.Field>
                <label>Password: </label>
                <input
                    type={"password"}
                    placeholder={"Please enter a password with at least 6 characters!"}
                    value={formData.password}
                    onChange={(e)=>{setFormData({...formData, password: e.target.value})}}
                />
            </Form.Field>
            <Form.Field>
                <label>Confirm Password: </label>
                <input
                    type={"password"}
                    placeholder={"Please enter the same password again!"}
                    value={formData.passwordConfirmation}
                    onChange={(e)=>{setFormData({...formData, passwordConfirmation: e.target.value})}}
                />
            </Form.Field>
            <Form.Field>
                <Checkbox
                    label={"Would you like to pay $4.99/month for premium meats and discounts?"}
                    onChange={(event,data)=>{setFormData({...formData, premiumUser: data.checked})}}
                ></Checkbox>
            </Form.Field>
            <Button type={"submit"}>Register</Button>
        </Form>
    )
}

export default SignupForm