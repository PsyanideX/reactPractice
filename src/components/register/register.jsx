import React from 'react';
import { Link } from 'react-router-dom';

let registerTemplate = 
    <div>
        <fieldset>
            <legend>Register</legend>
            <input type="text" placeholder="Username"/>
            <input type="text" placeholder="Password"/>
            <button type="submit">Register</button>
        </fieldset>
        <p>Already have an account?</p>
        <Link to="/login">
            <button type="button">
                Login
            </button>
        </Link>
    </div>;

function Register() {
    return registerTemplate;
}

export default Register;