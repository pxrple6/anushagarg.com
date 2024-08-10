// src/Poem.js
import React, { useState } from 'react';

function Poem() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <h2>Turn Back Time</h2>
      <p>
        {isExpanded ? (
          <>
            In the prose, a young girl's fervent desire to rectify her errors and remain in the past is vividly depicted. 
            <br />
            She wishes to turn back time, <br />
            To a moment sublime, <br />
            To erase the mistakes, <br />
            And ease the heartaches.
          </>
        ) : (
          <>
            In the prose, a young girl's fervent desire to rectify her errors and remain in the past is vividly depicted.
          </>
        )}
      </p>
      <button onClick={toggleExpansion}>
        {isExpanded ? 'Read Less' : 'Read More'}
      </button>
    </div>
  );
}

export default Poem;