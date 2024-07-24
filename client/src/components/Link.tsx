import React from 'react'

const Link: React.FC<{ description: string, url: string }>
  = ({ description, url }) => {
    return (
      <div>
        <div>
          {description} ({url})
        </div>
      </div>
    )
  }

export default Link