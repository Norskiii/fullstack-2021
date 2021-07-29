import React from 'react'

const Countries = (props) => {
    const handleButtonClick = (event) => {
        const id = event.target.id
        event.preventDefault()
        props.handleClick(id)
    }
    return (
        <div>
            {props.countries.map(c =>
            <div key={c.name}> 
            {c.name} 
            <button id={c.name} onClick={handleButtonClick.bind(this)}>show</button></div>
            )}
        </div>
        ) 
}

export default Countries