import { Link } from 'react-router-dom'
import './header.css'
import { useState } from 'react'

function header() {
    const [count, setCount] = useState(0)

    return (
        <>
            {/* Header */}
            <div className="header">
                <div className="logo">
                    <Link to="/">Logo</Link>
                </div>
            </div>
        </>
    )
}

export default header