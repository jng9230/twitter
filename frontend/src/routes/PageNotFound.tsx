import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const PageNotFound = ({
}:{
}) => {
  const [thingThatWasntFound, setThingThatWasntFound] = useState(useParams().thing)
  return (
    <div className="h-screen w-screen text-center">
      <div className="text-9xl">
        404
      </div>
      <div>
        Page not found
      </div>
    </div>
  )
}

export default PageNotFound
