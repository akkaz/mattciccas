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

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % videos.length);
  };

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
          ) : video.type === 'mp4' ? (
            <video
              src={video.src}
              autoPlay
              muted
              loop
              playsInline
            />
          ) : null}
        </div>
      ))}
      <div className="hero-overlay" />

      {/* Navigation Arrows */}
      <button
        className="slider-arrow slider-arrow-prev"
        onClick={goToPrevious}
        aria-label="Video precedente"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button
        className="slider-arrow slider-arrow-next"
        onClick={goToNext}
        aria-label="Video successivo"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
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

  // Hero slider videos - Sostituisci con i tuoi video YouTube o MP4 locali
  const heroVideos = [
    {
      type: 'mp4',
      src: '/video/video-premi.mp4', // Video locale dalla cartella public/video
      title: 'Video Premi'
    },
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="YouTube">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Vimeo">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z" />
                </svg>
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
