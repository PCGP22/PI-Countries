import { useState } from 'react'

function InputEstrellas() {
    const ratings = [1,2,3,4,5]
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    return (
    <div>
        {
            ratings.map(i => {
                return(
                    <button className={i <= (hover || rating)? "on star" : "off star"} key={i} index={i} 
                    onClick={() => setRating(index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(rating)}>★</button>
                )
                
            })
        }
    </div>
  )
}

export default InputEstrellas