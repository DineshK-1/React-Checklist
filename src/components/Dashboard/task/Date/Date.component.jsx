import "./Date.styles.scss"

const DateComp = ({date, type}) => {
    const convertedDate = new Date(0);
    convertedDate.setUTCSeconds(date);
    
    if(type === "green") return <div className="date green">{convertedDate.toDateString()}</div>
    if(type === "due") return <div className="date due">{convertedDate.toDateString()}</div>
    return null
}

export default DateComp;