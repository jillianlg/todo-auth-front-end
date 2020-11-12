import React, { Component } from 'react'
import request from 'superagent';

export default class Todos extends Component {
    state = {
        todos: [],
        task: '',
        completed: false,
        loading: false,
    }

    componentDidMount = async () => {
        await this.fetchTodos()
    }
    fetchTodos =async() => {
        this.setState({ loading:true })
        const response = await request.get('https://cryptic-shore-29263.herokuapp.com/api/todos')
        .set('Authorization', this.props.token)

        this.setState({ loading: false })
        this.setState({ todos: response.body })
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        this.setState({ loading:true })
        await request.post('https://cryptic-shore-29263.herokuapp.com/api/todos')
        .send({
            task: this.state.task,
            completed: this.state.completed,
        })
        .set('Authorization', this.props.token)

        await this.fetchTodos();
    }

    handleCheckboxClick = async(id) => {
        this.setState({ loading:true })
        await request.put(`https://cryptic-shore-29263.herokuapp.com/api/todos/${id}`)
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

                {this.state.loading 
                        ? 'LOADING....'
                        : 
                    Boolean(this.state.todos.length) && this.state.todos.map(todo => ( 

                        <div style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>
                            Task: {todo.task}
                            <input
                            type="checkbox"
                            checked={todo.completed}
                            onClick={() => this.handleCheckboxClick(todo.id)}
                            />
                        </div>
                        )
                    )
                }
            </div>
        )
    }
}
