import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SerachPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployeesAddForm from '../employers-add-form/employers-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data : [
                {name: "Valery H.", salary: 800, increase: false, rise: true, id: 1},
                {name: "Alesha P.", salary: 11800, increase: true, rise: false, id: 2},
                {name: "Vanya N.", salary: 2500, increase: false, rise: false, id: 3},
            ],
            term: '',
            filterName: 'all'
        }
        this.maxId = this.state.data.length + 1
        this.currentLength = 0
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    } 
    addItem = (name, salary) => {
        const newItem = {
            name, 
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
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
        this.setState({term});
    }

    
    filterPost = (items, filterName) => {
        switch (filterName) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000);
            case 'salaryFilterLH':
                let LH = Array.from(items)
                return LH.sort((prev, next) => prev.salary - next.salary);
            case 'salaryFilterHL':
                let HL = [...items]
                return HL.sort((prev, next) => next.salary - prev.salary);                
            default:
                return items
        }
    }

    onFilterSelect = (filterName) => {
        this.setState({filterName});
        // change condition of filter
    }
    onChangeSalary = (e, name) => {
        e = e.slice(0, -1)

        this.setState(({data}) => ({
            data: data.map(item => {
                if (name === item.name) {
                    item.salary = e    
                }
                return item
            })
        }))
    }

    render() {
        const {data, term, filterName} = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length
        const visibleData = this.filterPost(this.searchEmp(data, term), filterName);

        return (
            <div className="app">
                <AppInfo employees={employees} increased={increased} />
    
                <div className="search-panel">
                    <SerachPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filterName} onFilterSelect={this.onFilterSelect}/>                
                </div>
    
                <EmployersList 
                data={visibleData}
                onDelete={this.deleteItem}
                onToggleProp={this.onToggleProp}
                onChangeSalary={this.onChangeSalary}/>
                <EmployeesAddForm
                onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;