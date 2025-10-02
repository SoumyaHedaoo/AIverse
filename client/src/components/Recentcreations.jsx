import React, { useState } from 'react'
import Markdown from 'react-markdown'

const Recentcreations = ({item}) => {
    const [expand , setExpand] = useState(false);
  return (
    <div onClick={()=> setExpand(!expand)}>
        <div>
            <div>
                <h2>
                    {item.prompt}
                </h2>
                <p>{item.type} -{new Date(item.created_at).toLocaleDateString() } </p>
            </div>
            <button>
                {item.type}
            </button>
        </div>
        {
            expand && (
                <div>
                    {
                        item.type === 'image' ? (
                            <div>
                                <img src={item.content} alt="" />
                            </div>
                        ) : (
                            <div>
                                <div>
                                   <Markdown>{item.content}</Markdown> 
                                </div>
                            </div>
                        )
                    }
                </div>
            )
        }
    </div>
  )
}

export default Recentcreations