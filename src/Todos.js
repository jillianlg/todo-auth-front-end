import React, { Component } from 'react'
import request from 'superagent';

export default class Todos extends Component {
    state = {
        todos: []
    }

    componentDidMount = async () => {
        const response = await request.get('https://cryptic-shore-29263.herokuapp.com/api/plants')
        .set('Authorization', this.props.token)

        this.setState({ todos: response.body })
    }
    render() {
        return (
            <div>
                <h3>Your to do list:</h3>
                {
                    Boolean(this.state.todos.length) && this.state.todos.map
                    (todo => <div>
                        Task: {todo.task};
                        Completed: {todo.completed}
                            </div>
                    )
                }
            </div>
        )
    }
}
