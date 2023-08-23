// captcha component

import React from 'react'

const arrayLength = 9;
const imageLocations = Array(arrayLength).fill(null).map((value, index) => {
  return `/api/captcha-image?index=${index}.png`;
})

export const Captcha = () => {
  return (
    <div className='captcha'>
      <h2>To confirm you are not a robot, select all images of dogs</h2>
      <div className='captcha-images'>
        {/* map captcha images */}
        {imageLocations.map(imageUrl => (
          <div>
            <img src={imageUrl} alt=''/>
          </div>
        ))}


      </div>
    
    </div>
  )
}
