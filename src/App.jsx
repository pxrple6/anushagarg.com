import React, { useState, useEffect } from 'react';
import './App.css';
import me from './image.jpg';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPoems, setFilteredPoems] = useState([]);
  const [poems, setPoems] = useState([
    { 
      title: 'Turn Back Time', 
      content: 'I wish I could turn back time<br> when I used to shine<br> shine as a daughter, sister, and a friend<br> oh my lord! when did this end<br><br> I used to be a prodigy<br> But now I feel my life is a tragedy<br><br> With every passing day<br> I think my parents made a mistake<br> the mistake of bringing me to this world<br> how much of a disappointment can they take<br><br> I know I am not perfect<br> I know I am not a star<br> But one day for sure<br> I will take myself far<br><br> Far in success and as of for now<br> I wish my future self all the best', 
      showFull: false 
    },
    { 
      title: 'Teenage Chronicles', 
      content: 'Being a teen is so cool, the kids say<br> But they never realize how quickly time flies<br> Yesterday I was crying to play<br> Now at the blink of an eye,<br> I will soon be facing bills to pay<br><br> Dressing our barbies carefree<br> Climbing huge trees with glee<br> Oh, what sweet reminiscence it brings<br> I still want those wings<br><br> Believing in unicorns, Santa, and fairies<br> Believing in magic, where dreams never vary<br> Now, I\'m a teenager, sitting on the couch<br> Filled with a world of screens and devices one can touch<br><br> I miss the days when I used to play<br> Now I\'m stuck in a world of teens<br> Battling emotions I’ve never seen<br> Day and night I try to figure what life is about<br> But I always end with expectations and self-doubt<br><br> Peer pressure Is always in my ear,<br> The motive of being is never clear<br> No matter how old I get<br> A spark in my heart is set<br> The spark of childhood euphoria<br> The pure joy of a child\'s glee<br> Is the only joy I once again want to see', 
      showFull: false 
    },
    { 
      title: 'Dark Phase', 
      content: 'Oh God when will this dark phase end<br> Everyday when I look at my friends<br> With shimmer in my eyes<br> All I see is a dimmed light<br> The light of friendship trust and believe<br> is the only faded light I see<br><br> Oh God what is my mistake<br> Why is my friendship at it’s stake<br><br> Oh God please save this light<br> I beg you so with all my might', 
      showFull: false 
    },
    { 
      title: 'Happiness, A Question', 
      content: 'What is happiness?<br> Happiness is nothing but caring less<br> Happiness is a weaving tale<br> Happiness is love but never on a scale<br> Happiness might be a disease<br> Passing from one other with ease<br><br> But If you were to dare<br> If you somewhat actually care<br> You will forced by yourself to ask<br> Is happiness a mask?<br> Does happiness exist?<br> Is happiness just a myth?<br><br> The Answer is quite complicated<br> I believe it is better to gatekeep it<br> Whether happiness exists or not<br> Always remember it has a cost<br> Thus another question arised<br> Shall happiness be compromised?<br> Because what if we fail to pay back?<br><br> By now happiness may seem like a mess<br> But you shall care less<br> Because even if you fail to pay back<br> Happiness would never be something you lack<br> The world is full of happiness<br> Happiness is helping beat the stress<br> The stress of anything that troubles<br> So let\'s spread happiness with our words<br> Let\'s try making happiness free<br> Let\'s try making it as simple as a glee', 
      showFull: false 
    },
    { 
      title: 'A Temptation Tale', 
      content: '"I\'m on a diet," I assured,<br> But pizza thoughts, my cravings procured.<br> I picked up the phone to place the call,<br> Oh! How hard my mind tried to haul.<br><br> Tick-tock, the clock felt slow,<br> My cravings aglow, a tempting glow.<br> Ding-dong, the doorbell rang,<br> My pizza order, ready to hang.<br><br> Opening the box, anticipation soared high,<br> A cheesy delight, pleasing to the eye.<br> But as cheese melts, my resolve\'s demise,<br> Resisting temptation, a futile guise.<br><br> Though I aimed for discipline, I must confess,<br> In the face of pizza, I couldn\'t suppress.<br> So I indulged, with guilt and pleasure combined,<br> A fleeting moment of weakness, in my diet confined.', 
      showFull: false 
    },
    { 
      title: 'The Saga Of Indian Cuisine', 
      content: 'Indian cuisine, a tale indeed<br> With every state, a new one we weave<br> From paneer to dosa’s<br> From chicken to samosa’s<br><br> Indian cuisine, a divine treat<br> Every corner provides you with a feast<br> From Rasmalai to Boorelu<br> From Kajukatli to Pateleo<br><br> Indian cuisine, you’ll never regret<br> Your cravings always met<br> So immerse yourself in this power divine<br> Cause after all, shikanji is better than wine', 
      showFull: false 
    },
  ]);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredPoems(poems);
    } else {
      setFilteredPoems(poems.filter(poem => 
        poem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        poem.content.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    }
  }, [searchTerm, poems]);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleReadMore = (index) => {
    const newPoems = [...poems];
    newPoems[index].showFull = !newPoems[index].showFull;
    setPoems(newPoems);
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
              <a href="#home" onClick={() => handleScroll('home')}>home</a>
              <a href="#poem" onClick={() => handleScroll('poem')}>poem</a>
              <a href="#blog" onClick={() => handleScroll('blog')}>blog</a>
              <a href="#about" onClick={() => handleScroll('about')}>about</a>
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
      <a 
        href="https://www.amazon.in/BEST-FRIEND-ADVENTURES-DIARY-1-ebook/dp/B08P633K6P" 
        target="_blank" 
        rel="noopener noreferrer"
        className="book-link"
      >
        Check out "Best Friend Adventures: Diary 1" on Amazon
      </a>
    </div>
    
    {/* ADDING THIS SECTION TO DISPLAY POEMS */}
    <div className="poem-list"> {/* NEW DIV TO CONTAIN POEMS */}
      {filteredPoems.map((poem, index) => ( // LOOP THROUGH FILTERED POEMS
        <div key={index} className="poem-item"> {/* NEW DIV FOR EACH POEM */}
          <h3>{poem.title}</h3> {/* TITLE OF THE POEM */}
          <p 
            dangerouslySetInnerHTML={{
              __html: poem.showFull ? poem.content : poem.content.split('<br>').slice(0, 2).join('<br>') + '...' // DISPLAY CONTENT BASED ON STATE
            }}
          />
          <button onClick={() => toggleReadMore(index)}> {/* TOGGLE READ MORE BUTTON */}
            {poem.showFull ? 'Read Less' : 'Read More'} {/* BUTTON TEXT BASED ON STATE */}
          </button>
        </div>
      ))}
    </div> {/* END OF POEM LIST DIV */}

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
