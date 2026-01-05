import { useState, useEffect, useCallback } from 'react';
import './App.css';

// Hero Video Slider Component
function HeroSlider({ videos, currentSlide, setCurrentSlide }) {
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % videos.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [videos.length, setCurrentSlide]);

  return (
    <div className="hero-slider">
      {videos.map((video, index) => (
        <div
          key={index}
          className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
        >
          {video.type === 'youtube' ? (
            <iframe
              src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&loop=1&playlist=${video.id}&controls=0&showinfo=0&modestbranding=1&playsinline=1`}
              title={video.title}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : (
            <video
              src={video.src}
              autoPlay
              muted
              loop
              playsInline
            />
          )}
        </div>
      ))}
      <div className="hero-overlay" />
    </div>
  );
}

// Navbar Component
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <a href="#" className="navbar-logo">
          <span className="text-gradient">Matt Ciccas</span>
        </a>
        <div className="navbar-links">
          <a href="#showcase" className="navbar-link">Portfolio</a>
          <a href="#about" className="navbar-link">Chi Sono</a>
          <a href="#contact" className="navbar-link">Contatti</a>
        </div>
      </div>
    </nav>
  );
}

// Showcase Card Component
function ShowcaseCard({ project, onClick }) {
  return (
    <div className="showcase-card" onClick={() => onClick(project)}>
      <div className="showcase-thumbnail">
        <img src={project.thumbnail} alt={project.title} />
        <div className="showcase-play" />
      </div>
      <div className="showcase-info">
        <span className="showcase-category">{project.category}</span>
        <h3 className="showcase-title">{project.title}</h3>
        <p className="showcase-description">{project.description}</p>
      </div>
    </div>
  );
}

// Video Modal Component
function VideoModal({ video, isOpen, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen || !video) return null;

  return (
    <div className={`video-modal ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="video-modal-close" onClick={onClose}>×</button>
        <iframe
          src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
          title={video.title}
          frameBorder="0"
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Hero slider videos - Sostituisci con i tuoi video YouTube
  const heroVideos = [
    {
      type: 'youtube',
      id: 'dQw4w9WgXcQ', // Placeholder - sostituisci con il tuo video ID
      title: 'Video 1'
    },
    {
      type: 'youtube',
      id: 'jNQXAC9IVRw', // Placeholder - sostituisci con il tuo video ID
      title: 'Video 2'
    },
    {
      type: 'youtube',
      id: 'M7lc1UVf-VE', // Placeholder - sostituisci con il tuo video ID
      title: 'Video 3'
    },
  ];

  // Portfolio projects - Sostituisci con i tuoi lavori
  const projects = [
    {
      id: 1,
      title: 'Brand Commercial',
      category: 'Advertising',
      description: 'Spot pubblicitario per brand di moda',
      thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format',
      videoId: 'dQw4w9WgXcQ',
    },
    {
      id: 2,
      title: 'Music Video',
      category: 'Music',
      description: 'Video musicale per artista indie',
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format',
      videoId: 'jNQXAC9IVRw',
    },
    {
      id: 3,
      title: 'Event Coverage',
      category: 'Events',
      description: 'Copertura evento corporate',
      thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format',
      videoId: 'M7lc1UVf-VE',
    },
    {
      id: 4,
      title: 'Documentary',
      category: 'Documentary',
      description: 'Mini-documentario su artigiani locali',
      thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format',
      videoId: 'dQw4w9WgXcQ',
    },
    {
      id: 5,
      title: 'Social Content',
      category: 'Social',
      description: 'Contenuti per campagna social',
      thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format',
      videoId: 'jNQXAC9IVRw',
    },
    {
      id: 6,
      title: 'Corporate Video',
      category: 'Corporate',
      description: 'Video istituzionale aziendale',
      thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format',
      videoId: 'M7lc1UVf-VE',
    },
  ];

  const handleProjectClick = useCallback((project) => {
    setSelectedVideo(project);
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setSelectedVideo(null);
  }, []);

  return (
    <div className="app">
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <HeroSlider
          videos={heroVideos}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
        />

        <div className="hero-content animate-fade-in-up">
          <span className="hero-badge">🎬 Videomaker Professionista</span>
          <h1 className="hero-title">
            Raccontiamo <span className="text-gradient">Storie</span> Insieme
          </h1>
          <p className="hero-subtitle">
            Creo video che emozionano, coinvolgono e lasciano il segno.
            Dal concept alla post-produzione, trasformo le tue idee in realtà visive.
          </p>
          <div className="hero-cta">
            <a href="#contact" className="btn btn-primary btn-lg">
              Iniziamo un Progetto
            </a>
            <a href="#showcase" className="btn btn-secondary btn-lg">
              Guarda i Lavori
            </a>
          </div>
        </div>

        <div className="slider-controls">
          {heroVideos.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Vai al video ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Showcase Section */}
      <section id="showcase" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Portfolio</span>
            <h2 className="section-title">I Miei <span className="text-gradient">Lavori</span></h2>
            <p className="section-subtitle">
              Una selezione dei progetti video realizzati per brand, eventi e artisti
            </p>
          </div>

          <div className="showcase-grid">
            {projects.map((project) => (
              <ShowcaseCard
                key={project.id}
                project={project}
                onClick={handleProjectClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <div className="about-grid">
            <div className="about-image">
              <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=600&auto=format"
                alt="Matt Ciccas - Videomaker"
              />
            </div>
            <div className="about-content">
              <span className="section-label">Chi Sono</span>
              <h2>Ciao, sono <span className="text-gradient">Matt</span></h2>
              <p>
                Sono un videomaker appassionato con anni di esperienza nella creazione
                di contenuti visivi che catturano l'attenzione e raccontano storie autentiche.
              </p>
              <p>
                Lavoro con brand, aziende, artisti e privati per trasformare idee
                in video coinvolgenti. Dalla fase di pre-produzione fino alla consegna
                finale, curo ogni dettaglio per garantire risultati eccellenti.
              </p>
              <div className="about-stats">
                <div className="stat-item">
                  <div className="stat-number text-gradient">50+</div>
                  <div className="stat-label">Progetti</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number text-gradient">30+</div>
                  <div className="stat-label">Clienti</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number text-gradient">5+</div>
                  <div className="stat-label">Anni</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="container">
          <div className="contact-content">
            <span className="section-label">Contatti</span>
            <h2 className="section-title">Hai un <span className="text-gradient">Progetto</span>?</h2>
            <p className="section-subtitle">
              Parliamone! Sono sempre alla ricerca di nuove sfide creative.
            </p>
            <a href="mailto:ciao@mattciccas.it" className="contact-email">
              ciao@mattciccas.it
            </a>
            <div className="contact-social">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                📸
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="YouTube">
                ▶️
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                💼
              </a>
              <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Vimeo">
                🎬
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© 2025 Matt Ciccas. Tutti i diritti riservati.</p>
        </div>
      </footer>

      {/* Video Modal */}
      <VideoModal
        video={selectedVideo}
        isOpen={modalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
