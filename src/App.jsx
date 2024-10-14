import React, { useState, useEffect } from 'react';
import './App.css';
import me from './image.jpg';

const Poem = ({ title, content, showFull, toggleReadMore }) => {
  return (
    <div className="poem-card">
      <h3>{title}</h3>
      <p 
        dangerouslySetInnerHTML={{ 
          __html: showFull ? content : content.substring(0, 100) + '...' 
        }} 
      />
      <button onClick={toggleReadMore} className="read-more-btn">
        {showFull ? 'Show Less' : 'Read More'}
      </button>
    </div>
  );
};

const FloatingButton = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://embed.ycb.me';
    script.async = true;
    script.setAttribute('data-domain', 'anushagarg');
    script.setAttribute('data-type', 'button-floating');
    script.setAttribute('data-buttonicon', 'time');
    script.setAttribute('data-buttonposition', 'topRight');
    script.setAttribute('data-buttoncolor', '#FFE7F9');

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // FloatingButton does not render anything
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPoems, setFilteredPoems] = useState([]);
  const [poems, setPoems] = useState([
    { title: 'Turn Back Time', content: 'I wish I could turn back time... (full content)', showFull: false },
    { title: 'Teenage Chronicles', content: 'Being a teen is so cool... (full content)', showFull: false },
    { title: 'Dark Phase', content: 'Oh God when will this dark phase end... (full content)', showFull: false },
    { title: 'Happiness, A Question', content: 'What is happiness?... (full content)', showFull: false },
    { title: 'A Temptation Tale', content: '"I\'m on a diet," I assured... (full content)', showFull: false },
    { title: 'The Saga Of Indian Cuisine', content: 'Indian cuisine, a tale indeed... (full content)', showFull: false },
  ]);

  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    if (searchTerm === '') {
      setFilteredPoems(poems);
    } else {
      setFilteredPoems(poems.filter(poem => 
        poem.title.toLowerCase().includes(lowercasedSearchTerm) ||
        poem.content.toLowerCase().includes(lowercasedSearchTerm)
      ));
    }
  }, [searchTerm, poems]);

  const toggleReadMore = (index) => {
    const newPoems = [...poems];
    newPoems[index].showFull = !newPoems[index].showFull;
    setPoems(newPoems);
  };

  return (
    <div>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <title>ANUSHAGARG.COM</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" crossOrigin="anonymous" />
      
      <header>
        <nav className="navbar">
          <div className="container">
            <a href="index.html" className="navbar-brand">AnushaGarg</a>
            <div className="navbar-nav">
              <a href="#home">home</a>
              <a href="#poem">poem</a>
              <a href="#blog">blog</a>
              <a href="#about">about</a>
            </div>
          </div>
        </nav>
        <div className="banner">
          <div className="container">
            <h1 className="banner-title">
              <span>Anusha</span> Garg
            </h1>
            <p>everything that I compose &amp; write</p>
            <form>
              <input 
                type="text" 
                className="search-input" 
                placeholder="find your poem . . ." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="button" className="search-btn">
                <i className="fas fa-search" />
              </button>
            </form>
          </div>
        </div>
      </header>

      <section className="poem" id="poem">
        <div className="container">
          <div className="title">
            <h2>Recent Poems &amp; Stories</h2>
            <p>recent poems &amp; stories on the blog</p>
          </div>
          {filteredPoems.map((poem, index) => (
            <Poem 
              key={index} 
              title={poem.title} 
              content={poem.content} 
              showFull={poem.showFull} 
              toggleReadMore={() => toggleReadMore(index)} 
            />
          ))}
        </div>
      </section>

      <section className="about" id="about">
        <div className="container">
          <div className="about-content">
            <div>
              <img src={me} alt="About" />
            </div>
            <div className="about-text">
              <div className="title">
                <h2>Anusha</h2>
                <p>literature &amp; coding is my passion</p>
              </div>
              <p>
                I am a storyteller and poet who crafts immersive worlds through words. Beyond prose, I create captivating front-end websites, merging creativity with code. My YouTube channel offers insights into my creative process, writing snippets, and web development projects. Join me on a journey where imagination meets technology, and creativity knows no bounds.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <footer>
        <div className="social-links">
          <a href="https://www.facebook.com/Princess.techaffair/"><i className="fab fa-facebook-f" /></a>
          <a href="https://www.instagram.com/poet_anusha/"><i className="fab fa-instagram" /></a>
          <a href="https://www.youtube.com/@anushahere2010"><i className="fab fa-youtube" /></a>
        </div>
        <span>anushagarg.com</span>
      </footer>

      <FloatingButton /> {/* Include the floating button here */}
    </div>
  );
}
