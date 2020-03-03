import React, { Component } from "react";
import './register.css';
import { Link } from "react-router-dom";

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            pass: ''
        };    
    }

    inputChange = (evt) => {
        const name = evt.target.id;
        const value = evt.target.value;
        this.setState({
            [name]: value
        })
    }

    getRegister = (email, pass) => {
        // eslint-disable-next-line no-undef
        axios.post('http://34.89.93.186:8080/apiv1/register' , {
            username: email,
            password: pass
        })
        .then(() => {
            this.props.history.push('/login');
        })
        .catch(() => {
            alert("Something is wrong! Try again!");
        })
    }

    onSubmit = (evt) => {
        evt.preventDefault();
        this.getRegister(this.state.email, this.state.pass);
    }

    render() {
        return (
            <div className='form-container rounded mx-auto d-block'>
                <div class="card border-dark mb-3 border-card">
                    <div class="card-header">Creating a new user</div>
                    <div class="card-body text-dark">
                        <form onSubmit={this.onSubmit}>
                            <div class="form-group">
                                <label for="email">Username</label>
                                <input type="text" class="form-control" id="email" onChange={this.inputChange} value={this.state.email} />
                                <Link to='/login'><small>I have account, i want to log on.</small></Link>
                            </div>
                            <div class="form-group">
                                <label for="pass">Password</label>
                                <input type="password" class="form-control" id="pass" onChange={this.inputChange} value={this.state.pass} />
                            </div>
                            <button type="submit" class="btn btn-primary" >Submit</button>
                        </form>
                    </div>
                </div> 
            </div>
        );
    }
}