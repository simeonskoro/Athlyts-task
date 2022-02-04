import React from "react";
import { Link } from "react-router-dom";

import "./style.scss"

const ids = {
  wrapper: "SessionList-wrapper"
}

const classes = {
  wrapper: "SessionListItem-wrapper",
  typeSpan: "SessionListItem-typeSpan"
}

export const SessionListItem = (props) => {
  const { session } = props
  console.log(session)

  let className = classes.wrapper
  if (session.type) className += " " + session.type

  return <Link className={className} to={`/session?id=${session.id}`}>
    <span className={classes.typeSpan}>
      {session.type}
    </span>
  </Link>
}

export const SessionList = (props) => {
  const { sessions = [] } = props

  return <div id={ids.wrapper}>{sessions.map((session) => (<SessionListItem key={session.id} session={session} />))}</div>
}

export default SessionList