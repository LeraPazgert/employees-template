import { Component } from 'react';
import './employees-add-form.css';
import { v4 as uuidv4 } from 'uuid';


class EmployeesAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            salary: ''
        }
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleAdd = (e) => {
        e.preventDefault();
        const { onAdd } = this.props;
        const newItem = {
            name: this.state.name,
            salary: this.state.salary,
            increase: false,
            promotion: false,
            id: uuidv4(),
        }
        if (this.state.name.length < 2 || !this.state.salary) return;
        onAdd(newItem);
        this.setState({
            name: '',
            salary: ''
        })
    }

    render() {
        const { name, salary } = this.state;

        return (
            <div className="app-add-form">
                <h3>Add a new employee</h3>
                <form onSubmit={this.handleAdd}
                    className="add-form d-flex">
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="His name?"
                        name='name'
                        value={name}
                        onChange={this.onValueChange} />
                    <input type="number"
                        className="form-control new-post-label"
                        placeholder="Salary in $?"
                        name='salary'
                        value={salary}
                        onChange={this.onValueChange} />

                    <button type="submit"
                        className="btn btn-outline-light"
                    >Add</button>
                </form>
            </div>
        )
    }

}

export default EmployeesAddForm;