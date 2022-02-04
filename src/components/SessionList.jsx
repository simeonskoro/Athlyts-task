import React, { useState } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

import "./style.scss"

const ids = {
  wrapper: "SessionList-wrapper"
}

const classes = {
  wrapper: "SessionListItem-wrapper",
  typeSpan: "SessionListItem-typeSpan",
  dateSpan: "SessionListItem-dateSpan",
  favoriteButton: "SessionListItem-favoriteButton",
  favoriteIcon: "SessionListItem-favoriteIcon"
}

export const SessionListItem = (props) => {
  const { session, favoriteCallback, favorite } = props

  let className = classes.wrapper
  if (session.type) className += " " + session.type

  return <Link className={className} to={`/session?id=${session.id}`}>
    <button
      className={classes.favoriteButton}
      type="button"
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        favoriteCallback(session.id)
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault()
          event.stopPropagation()
          favoriteCallback(session.id)
        }
      }}
    >
      <svg className={`SessionListItem-favoriteIcon` + (favorite ? " favorite" : '')} version="1.1"
        xmlns="http://www.w3.org/2000/svg" viewBox="40 40 20 20" preserveAspectRatio="xMidYMid meet">
        <path d="M 50 42 L 52.35 46.76 L 57.61 47.53 L 53.8 51.24 L 54.7 56.47 L 50 54 L 45.3 56.47 L 46.2 51.24 L 42.39 47.53 L 47.65 46.76 Z" stroke="rgb(154,160,166)" strokeWidth="1.25" fill="none" />
      </svg>
    </button>
    <span className={classes.typeSpan}>
      {session.type}
    </span>
    <span className={classes.dateSpan}>
      {session.date}
    </span>
  </Link>
}

export const SessionList = (props) => {
  const [favorites, setFavorites] = useState(["2", "6"])
  const { sessions = [] } = props
  const sorted = [...sessions].sort((a, b) => {
    const isAFavorite = Number(favorites.indexOf(a.id) !== -1)
    const isBFavorite = Number(favorites.indexOf(b.id) !== -1)
    const aDateTS = dayjs(a.date).valueOf()
    const bDateTS = dayjs(b.date).valueOf()
    const dateDiff = aDateTS - bDateTS
    const favoriteOrder = isBFavorite - isAFavorite
    return favoriteOrder || -dateDiff
  })
  const toggleFavorite = (id) => {
    const isFavorite = favorites.indexOf(id) !== -1
    if (isFavorite) setFavorites([...favorites].filter(f => f !== id))
    else setFavorites([...favorites, id])
  }
  return <div id={ids.wrapper}>{sorted.map((session) => (<SessionListItem key={session.id} session={session} favoriteCallback={toggleFavorite} favorite={favorites.indexOf(session.id) !== -1} />))}</div>
}

export default SessionList