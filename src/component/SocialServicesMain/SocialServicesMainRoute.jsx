import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SocialServicePage from './SocialServicesMain/SocialServicePage';
function SocialServicesMainRoute() {
  const [count, setCount] = useState(0)

  return (
    <>
       <SocialServicePage/>
    </>
  )
}

export default SocialServicesMainRoute
