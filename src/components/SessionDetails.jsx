import React, { useMemo } from "react";
import { useLocation } from "react-router";

import Volleyball from '../icons/volleyball.svg'
import Battery from '../icons/battery-charging.svg'
import Chevron from '../icons/chevron-left.svg'
import dayjs from "dayjs";
import AdvancedFormat from 'dayjs/plugin/advancedFormat'
import Duration from 'dayjs/plugin/duration'
import RelativeTime from 'dayjs/plugin/relativeTime'
import { Link } from "react-router-dom";

dayjs.extend(AdvancedFormat)
dayjs.extend(Duration)
dayjs.extend(RelativeTime)

const ids = {
  wrapper: "SessionDetails-wrapper",
  topDiv: "SessionDetails-topDiv",
  backButton: "SessionDetails-backButton",
  typeSpan: "SessionDetails-typeSpan",
  dateSpan: "SessionDetails-dateSpan",
  timeSpan: "SessionDetails-timeSpan",
  backgroundImage: "SessionDetails-backgroundImage",
  bottomDiv: "SessionDetails-bottomDiv",
  messageSpan: "SessionDetails-messageSpan",
}

export const SessionDetails = (props) => {
  const { sessions = [] } = props
  const { search } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search]);
  const id = query.get("id")
  if (!id) return null
  const session = sessions.find((session) => session.id === id)
  if (!session) return null
  console.log(session)
  // const backgroundImage = session.type === 'training' ? Volleyball : Battery
  return <div id={ids.wrapper} className={session.type}>
    <div id={ids.topDiv}>
      <Link id={ids.backButton} to="/">
        <img src={Chevron} alt="Back" />
      </Link>
      <span id={ids.typeSpan}>{session.type}</span>
      <span id={ids.dateSpan}>{dayjs(session.date).format("MMMM Do")}</span>
      {/* <span id={ids.timeSpan}>{null}</span> */}
      {/* <img id={ids.backgroundImage} scr={backgroundImage} alt="Background" /> */}
    </div>
    <div id={ids.bottomDiv}>
      <span id={ids.messageSpan}>{session.description}</span>
    </div>
  </div>
}

export default SessionDetails