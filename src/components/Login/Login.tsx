import { useState } from "react";

function Login() {

    const [emailAddress, setEmailAddress] = useState();

    const [password, setPassword] = useState();
    
    return (
        <h1>
            Login
        </h1>
    );
}

export default Login;