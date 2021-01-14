import React from 'react'
import './index.css'

const FAQ = ({faq, index, toggleFAQ}) => {
    return (
        <div 
        className={"faq "+(faq.open ? 'open' : '')}
        key={index}
        onClick={() => toggleFAQ(index)}
        >
            <div className='faq-question'>
                {faq.question}
            </div>
            <hr/>
            <div className='faq-answer'>
                {faq.answer}
            </div>
        </div>
        
    )
}

export default FAQ