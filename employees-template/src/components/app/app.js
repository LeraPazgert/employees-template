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

            ],
            term: '',
            filter: 'all'
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
    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }
        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({ term });
    }
    onFilterSelect = (filter) => {
        this.setState({ filter });
    }

    filterPost = (array, filter) => {
        switch (filter) {
            case 'promotion':
                return array.filter(item => item.promotion);
            case 'moreThen1000':
                return array.filter(item => item.salary > 1000);
            default:
                return array
        }
    }

    render() {
        const { employees, term, filter } = this.state;
        const total = this.state.employees.length;
        const award = this.state.employees.filter(item => item.increase).length;
        const visibleEmployees = this.searchEmp(employees, term);
        const filterEmployees = this.filterPost(visibleEmployees, filter);
        return (
            <div className='app'>
                <AppInfo total={total} award={award} />

                <div className='search-panel'>
                    <SearchPanel onUpdateSearch={this.onUpdateSearch} />
                    <AppFilter onFilterSelect={this.onFilterSelect} filter={filter} />
                </div>
                <EmployeesList
                    employees={filterEmployees}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp} />
                <EmployeesAddForm onAdd={this.addItem} />
            </div>
        )
    }

}

export default App;