import React, { useState, useTransition, useEffect } from 'react'
import './index.css'
import Loading from './loading'

const title = ["age", "alone", "amazing", "anger", "architecture", "art", "attitude", "beauty", "best", "birthday", "business", "car", "change", "communications", "computers", "cool", "courage", "dad", "dating", "death", "design", "dreams", "education", "environmental", "equality", "experience", "failure", "faith", "family", "famous", "fear", "fitness", "food", "forgiveness", "freedom", "friendship", "funny", "future", "god", "good", "government", "graduation", "great", "happiness", "health", "history", "home", "hope", "humor", "imagination", "inspirational", "intelligence", "jealousy", "knowledge", "leadership", "learning", "legal", "life", "love", "marriage", "medical", "men", "mom", "money", "morning", "movies", "success"]

export default function App() {
  const [index, setIndex] = useState(0);
  const [quote, setQuote] = useState([]);
  const [isPending, startTransition] = useTransition()
  const [loading, setLoading] = useState(false)
  function newQuote() {
    fetch('https://api.api-ninjas.com/v1/quotes?category=' + title[index],
      { headers: { 'X-Api-Key': 'rUCUlQUkH4TdMYrRP98CRA==KWcuwqwmxJ3aQAzR' } })
      .then(response => response.json())
      .then(data => {
        setQuote(data[0]);
        setIndex(Math.floor(Math.random() * 67));
        setLoading(prev => !prev)
      })
      .catch(error => console.log(error))
  }
  function handleClick() {
    setLoading(prev => !prev)
    startTransition(() => {
      newQuote();
    })
  }
  useEffect(() => {
    handleClick();
  }, [])
  if (loading) {
    return <Loading />
  }
  else
    return (
      <>
        <div className="quote"><p className="content"> {quote.quote}</p>
          <b className="author">- {quote.author}</b></div><br />
        <button onClick={handleClick}>Generate New Quote</button>
      </>
    )
}

