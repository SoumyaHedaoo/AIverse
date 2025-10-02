import {Edit, Sparkles} from 'lucide-react'
import React, { useState } from 'react'

  const articleLength =[
    {length : 800 , text : 'Short(500-800 words)'},
    {length : 1200 , text : 'Medium(800-1200 words)'},
    {length : 1600 , text : 'Large(1200+ words)'},

  ]



const onSubmitHandler= async (e)=>{
   e.preventDefault();
}

const WriteArticle = () => {
  const [selectedLength , setSelectedLength] = useState(articleLength[0]);
  const [input , setInput] = useState('');

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
          <div>
             <Sparkles/>
             <h1>
              Article Configuration
             </h1>
          </div>
          <p>Article Topic</p>
          <input onChange={(e)=>setInput(e.target.value)} value={input} type="text " placeholder='' className='' />
          <p>Article Length</p>

          <div>
            {
              articleLength.map((item , index)=>(
                <span onClick={()=>setSelectedLength(item)} key={index} className={`${selectedLength.text === item.text ? '' : ''}`}>{item.text}</span>
              ))
            }
          </div>
          <br />
          <button>
            <Edit />
            Generate Article
          </button>
      </form>

      <div>
            <div>
              <Edit/>
              <h1>
                Generated article
              </h1>
            </div>
            <div>
              <div>
                <Edit/>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est, voluptate!</p>
              </div>
            </div>
      </div>
    </div>
  )
}

export default WriteArticle