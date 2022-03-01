
import './app-filter.css';

const AppFilter = ({filter, onFilterSelect}) => {
    const buttonsData = [
        {name: 'all', label: 'All emploees'},
        {name: 'rise', label: 'On raising'},
        {name: 'moreThen1000', label: 'Salary more than 1000'},
        {name: 'salaryFilterLH', label: 'Salary from low to hight'},
        {name: 'salaryFilterHL', label: 'Salary from hight to low'},
    ];

    const buttons = buttonsData.map(({name, label}) => {
        const active = filter === name;
        const clazz = active ? 'btn-light' : 'btn-outline-light';
        return (
            <button 
                className={`btn ${clazz}`}
                type='button'
                key={name}
                onClick={() => onFilterSelect(name)}>
                    {label}
            </button>
        )
    })

    return (
        <div className="btn-group">
            {buttons}
        </div>
    )
}

export default AppFilter;