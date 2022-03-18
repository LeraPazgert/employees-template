import './app-info.css';

const AppInfo = ({ total, award }) => {
    return (
        <div className='app-info'>
            <h1>Employee accounting at Coffeein </h1>
            <h2>Total number of employees: {total} </h2>
            <h2>Will receive an award: {award}</h2>
        </div>
    )
}

export default AppInfo;