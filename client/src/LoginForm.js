import React, {useState} from "react";
import {Button, Form} from "semantic-ui-react";

function LoginForm(props){
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    function handleSubmit(e){
        e.preventDefault();
        console.log(formData)
        // fetch("/login",{
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         username: formData.username,
        //         password: formData.password,
        //     }),
        // })
        //     .then((r)=>r.json())
        //     .then(onLogin);
    };

    return(
        <Form onSubmit={handleSubmit}>
            <Form.Field>
                <label>Username (Your email you signed up with):</label>
                <input
                    placeholder={"Please enter your username."}
                    value={formData.username}
                    onChange={(e)=>{setFormData({...formData, username: e.target.value})}}
                />
            </Form.Field>
            <Form.Field>
                <label>Password:</label>
                <input
                    type={"password"}
                    placeholder={"Please enter your password."}
                    value={formData.password}
                    onChange={(e)=>{setFormData({...formData, password: e.target.value})}}
                />
            </Form.Field>
            <Button type={"submit"}>Login</Button>
        </Form>
    )
}

export default LoginForm;