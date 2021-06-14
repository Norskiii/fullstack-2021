import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Votes = ({ votes }) => (
  <div>
    has {votes} votes
  </div>
)

const Header = ({ text }) => (
  <h2>{text}</h2>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length+1).join('0').split('').map(parseFloat))
  
  const handleNext = () => {
    setSelected(Math.floor(Math.random() * 7))
  }

  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <Header text='Anecdote of the day' />
      {anecdotes[selected]}
      <Votes votes={votes[selected]} />
      <Button handleClick={handleVote} text='vote' />
      <Button handleClick={handleNext} text='next anecdote' />
      <Header text='Anecdote with most votes' />
      {anecdotes[votes.indexOf(Math.max(...votes))]}
      <Votes votes={votes[votes.indexOf(Math.max(...votes))]} />
    </div>
  )
}

export default App