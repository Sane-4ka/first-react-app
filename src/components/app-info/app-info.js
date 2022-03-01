import './app-info.css';

const AppInfo = ({increased, employees}) => {    
    return (
        <div className="app-info">
            <h1>Number of employers in the company N</h1>
            <h2>All number of employers: {employees}</h2>
            <h2>Prize recieve: {increased}</h2>
        </div>
    )
}

export default AppInfo;