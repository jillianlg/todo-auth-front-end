import React, { Component } from 'react'
import './App.css';	import './App.css';
import request from 'superagent';

export default class Signup extends Component {
    state = {
        email: '',
        password: '',
        loading: false,
    }

    handleSubmit = async(e) => {
        e.preventDefault();

        console.log(this.state);

        this.setState({ loading:true })
        const user = await request
            .post('https://cryptic-shore-29263.herokuapp.com/auth/signup')
            .send(this.state); 


        console.log(user.body, 'sending you to todos');
        this.setState({ loading: false })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Email:
                        <input 
                        onChange={(e) => this.setState({ email: e.target.value })}
                        value={this.state.email} />
                    </label>
                    <label>
                        Password:
                        <input 
                        onChange={(e) => this.setState({ password: e.target.value })}
                        value={this.state.password} type="password"/>
                    </label>
                    {
                        this.state.loading 
                        ? 'LOADING....'
                        : <button>
                            Sign up!
                        </button>
                    }
                </form>
            </div>
        )
    }
}