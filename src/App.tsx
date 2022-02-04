import React, { FC } from 'react'
import { useQuery } from 'react-query'
import { Route, Routes } from 'react-router'
import SessionList from './components/SessionList'
import { mockApiCallToFetchSessions } from './data'

import './style.scss'

export const App: FC = () => {
  const { data: sessions } = useQuery('sessions', mockApiCallToFetchSessions)
  return (
    <Routes>
      <Route path="/" element={<SessionList sessions={sessions} />} />
    </Routes>
  )
}
