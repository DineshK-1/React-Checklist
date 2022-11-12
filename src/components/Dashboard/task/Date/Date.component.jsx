import "./Date.styles.scss"

const Date = ({date, type}) => {
    if(type === "green") return <div className="date green">{date}</div>
    if(type === "due") return <div className="date due">{date}</div>
    return null
}

export default Date;