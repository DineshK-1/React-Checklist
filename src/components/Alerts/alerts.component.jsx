const Alerts = (props) => {
    if (props.errors.length === 0) {
        return;
    } else {
        return (<div className="alerts">
            {props.errors.map(name => {
                return <li>{name}</li>
            })}
        </div>);
    }

}

export default Alerts;