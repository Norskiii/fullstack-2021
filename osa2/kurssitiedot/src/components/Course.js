import React from 'react'

const Header = (props) => {
    return (
      <div>
        <h2> {props.course} </h2>
      </div>
    )
  }
  
  const Part = (props) => {
    return (
      <div>
        <p>
          {props.part} {props.ex}
        </p>
      </div>
    )
  }
  
  const Content = (props) => {
    return (
      <div>
        {props.parts.map(part =>
          <Part key={part.id} part={part.name} ex={part.exercises} />
        )}
      </div>
    )
  }
  
  const Total = ({parts}) => {
    const total = parts.reduce( (s, p) => {
      return s + p.exercises
    }, 0)
  
    return (
      <div>
        <p><b>total of {total} exercises</b></p>
      </div>
    )
  }
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

  export default Course