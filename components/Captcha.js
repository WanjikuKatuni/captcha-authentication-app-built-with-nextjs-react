// captcha component

import React, { useState } from 'react'



export const Captcha = () => {
  const [selectedIndexes, setSelectedIndexes] = useState([])
  const arrayLength = 9;
  const imageLocations = Array(arrayLength).fill(null).map((value, index) => {
  return `/api/captcha-image?index=${index}`;
  })
  // onCLick function to toggle selected images
  function toggleIndex(index){
    // alert(index)

    // save index inside of selected indexes
    setSelectedIndexes(prev => {
      if(prev.includes(index)){
        // removes from array if already selected
        return prev.filter(v => v !== index)
      } else {
        // adds to array if not selected
        return [...prev, index]
      }
    })
  }
  return (
    <div className='captcha'>
      <h2>To confirm you are not a robot, select all images of dogs</h2>
      <div className='captcha-images'>
        {/* map captcha images */}
        {imageLocations.map((imageUrl, index) => (
          <div 

          onClick={()=> toggleIndex(index)}

          // setstate for selected divs with images
          className={selectedIndexes.includes(index) ? 'selected' : ''}>

            <img src={imageUrl} alt=''/>

          </div>
        ))}


      </div>
    
    </div>
  )
}
