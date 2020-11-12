import React, { Component } from 'react'
import request from 'superagent';

export default class Todos extends Component {
    state = {
        todos: [],
        task: '',
        completed: false,
    }

    componentDidMount = async () => {
        await this.fetchTodos()
    }
    fetchTodos =async() => {
        const response = await request.get('https://cryptic-shore-29263.herokuapp.com/api/todos')
        .set('Authorization', this.props.token)

        this.setState({ todos: response.body })
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        await request.post('https://cryptic-shore-29263.herokuapp.com/api/todos')
        .send({
            task: this.state.task,
            completed: this.state.completed,
        })
        .set('Authorization', this.props.token)

        await this.fetchTodos();
      }



    render() {
        return (
            <div>
                <h3>Your to do list:</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Add a task:
                        <input 
                            value={this.state.task} 
                            onChange={(e) => this.setState({ task: e.target.value })}
                        />
                    </label>
                    
                        <button>
                            Add
                        </button>
                </form>
                {/* figure out a way to map through the todos state (from the GET route) to generate indiviual checkboxes for each to do item*/}
                {/* <div>
                        Completed:
                        <radio 
                            type="checkbox"
                            value={this.state.completed} 
                            onChange={(e) => this.setState({ completed: e.target.value })}
                        />
                    </div> */}
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
