import { Component } from 'react';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';
import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [
                { name: 'John Smith', salary: 800, increase: false, promotion: false, id: 1 },
                { name: 'Alex Stivenson', salary: 3000, increase: false, promotion: false, id: 2 },
                { name: 'Tyler Lock', salary: 5700, increase: false, promotion: false, id: 3 }

            ]
        }
    }

    deleteItem = (id) => {
        this.setState(({ employees }) => {
            return {
                employees: employees.filter(item => item.id !== id)
            }
        })
    }
    addItem = (obj) => {
        this.setState(({ employees }) => {
            return {
                employees: [...employees, obj]
            }
        })
    };

    onToggleProp = (id, prop) => {
        this.setState(({ employees }) => ({
            employees: employees.map(item => {
                if (item.id === id) {
                    return { ...item, [prop]: !item[prop] }
                }
                return item;
            })
        }))

    }

    render() {
        const total = this.state.employees.length;
        const award = this.state.employees.filter(item => item.increase).length;
        return (
            <div className='app'>
                <AppInfo total={total} award={award} />

                <div className='search-panel'>
                    <SearchPanel />
                    <AppFilter />
                </div>
                <EmployeesList
                    employees={this.state.employees}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp} />
                <EmployeesAddForm onAdd={this.addItem} />
            </div>
        )
    }

}

export default App;