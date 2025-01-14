import { useState } from 'react'

const Button = ({ handleClick, feedback }) => (
  <button onClick={handleClick}>{feedback}</button>
)

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  const avarage = (props.good + props.bad * -1) / total
  const posPercentage = (props.good / total) * 100

  if (total == 0) {
    return <p>No feedback given</p>
  }
  return(
    <div>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={total} />
      <StatisticLine text="avarage" value={avarage} />
      <StatisticLine text="positive" value={posPercentage + " %"} />
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} feedback="good"/>
      <Button handleClick={handleNeutralClick} feedback="neutral"/>
      <Button handleClick={handleBadClick} feedback="bad"/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App