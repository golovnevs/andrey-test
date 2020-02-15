import React from 'react'
import Link from 'next/link'

export default ({ children }) => {
  return (
    <div>
      <header>
        <Link href="/">
          <a>🧞 Andrey+™ (closed beta)</a>
        </Link>
        <Link href="/history">
          <a>История желаний</a>
        </Link>
      </header>
      { children }
      <style jsx>{ `
        div {
          height: 100vh;
          width: 100%;
          background-image: url("/static/djinn.jpeg");
          background-size: cover;
        }
        
        header {
          background: rgb(93, 64, 175);
          padding: 10px;
        }
        
        a {
            font-size: 24px;
            margin: 20px;
        }
        
        a + a {
            margin-left: 60px;
        }
        
        a:hover {
            color: white;
        }
      ` }</style>
    </div>
  )
}
