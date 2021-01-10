import React from 'react'

const RedirectOr404 = () => {
  window.location = 'http://google.com';
  return (
    <div>
      check if exists or 404
    </div>
  )
}

export default RedirectOr404
