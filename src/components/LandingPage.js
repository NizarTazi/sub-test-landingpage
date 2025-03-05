import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faPencilAlt, faQuestionCircle, faUserGraduate, faFileAlt, faUserCog, faPhone, faEnvelope, faLocation} from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import './LandingPage.css';
import tutoBot from '../media/TutoBot.png'; 
import tutoBotResonse from '../media/tutobotresponse.png'; 

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    childName: '',
    childLevel: '',
    description: '',
    TC_ID: '' // Add TC_ID to your form data state
  });
  
  const [submitted, setSubmitted] = useState(false);
  
  useEffect(() => {
    // Function to get URL parameters
    const getUrlParameter = (name) => {
      name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
      const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      const results = regex.exec(window.location.search);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };
    
    // Get TC_ID from URL if it exists
    const tcIdFromUrl = getUrlParameter('tc_id');
    if (tcIdFromUrl) {
      console.log('TC_ID found in URL:', tcIdFromUrl);
      setFormData(prevState => ({
        ...prevState,
        TC_ID: tcIdFromUrl
      }));
    }
  }, []); // Empty dependency array ensures this runs once when component mounts
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    // Now formData includes TC_ID if it was in the URL
    
    try {
      const webhookUrl="https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTZmMDYzMjA0MzY1MjZiNTUzZDUxMzUi_pc";
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(formData) // TC_ID is now included in formData
      });
      
      if (response.ok) {
        console.log('Data successfully sent to webhook with TC_ID:', formData.TC_ID);
        setSubmitted(true);
      } else {
        console.error('Failed to send data to webhook:', response.statusText);
        alert('There was an error submitting the form. Please try again.');
      }
    } catch (error) {
      console.error('Error sending data to webhook:', error);
      alert('There was an error submitting the form. Please try again.');
    }
  };
  
  useEffect(() => {
    // For the sticky header effect
    const handleScroll = () => {
      const header = document.querySelector('.header');
      if (window.scrollY > 100) {
        header.classList.add('header-sticky');
      } else {
        header.classList.remove('header-sticky');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="header">
        <div className="container header-container">
          <div className="logo">
            <img src="https://tutorcruncher-public.s3.eu-west-1.amazonaws.com/tutorax/3269/logos/page_logo_230517195117.png.400x100_q95.png" alt="Tutorax Logo" />
          </div>
          <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <ul>
              <li><a href="#hero">Accueil</a></li>
              <li><a href="#features">Services</a></li>
              <li><a href="#ai-TutoBot">TutoBot IA</a></li>
              <li><a href="#subscription">S'abonner</a></li>
              <li><a href="#testimonials">Témoignages</a></li>
            </ul>
          </nav>
          <div className="cta-header">
            <a href="#subscription" className="btn btn-primary">Essai Gratuit</a>
          </div>
          <div className="mobile-menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <h1>Transformez l'avenir de votre enfant avec la plateforme éducative de Tutorax</h1>
            <p>Une éducation personnalisée avec des cours interactifs, de l'aide aux devoirs et un tutorat IA intelligent. Notre plateforme aide votre enfant à exceller.</p>
            <div className="hero-buttons">
              <a href="#subscription" className="btn btn-primary">Commencer Maintenant</a>
              <a href="#features" className="btn btn-secondary">Découvrir Nos Services</a>
            </div>
          </div>
          <div className="hero-image">
            <img src="https://tutorax.com/wp-content/uploads/2025/01/Page-dapplication-tuteurs_Tutorax-1.png" alt="Tutorax Education Platform" />
          </div>
        </div>
        <div className="hero-shape"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Tout ce dont votre enfant a besoin pour réussir</h2>
            <p>Notre plateforme complète offre tout le soutien nécessaire pour l'excellence académique</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FontAwesomeIcon icon={faBook} />
              </div>
              <h3>Cours interactifs</h3>
              <p>Accès à des centaines de cours interactifs qui suivent le programme scolaire officiel</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
              <FontAwesomeIcon icon={faPencilAlt} />
              </div>
              <h3>Exercices pratiques</h3>
              <p>Des milliers d'exercices avec correction instantanée pour renforcer l'apprentissage</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
              <FontAwesomeIcon icon={faQuestionCircle} />
              </div>
              <h3>Aide aux devoirs</h3>
              <p>Support personnalisé pour aider votre enfant à comprendre et terminer ses devoirs</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
              <FontAwesomeIcon icon={faUserGraduate} />
              </div>
              <h3>Tuteurs experts</h3>
              <p>Nos tuteurs qualifiés fournissent une assistance en direct et des corrections d'exercices</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
              <FontAwesomeIcon icon={faFileAlt} />
              </div>
              <h3>Contenu renouvelé</h3>
              <p>Nouveau contenu ajouté régulièrement pour maintenir l'engagement et suivre les évolutions</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
              <FontAwesomeIcon icon={faUserCog } />
              </div>
              <h3>Parcours personnalisé</h3>
              <p>Apprentissage adapté au niveau, style et rythme d'apprentissage de votre enfant</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI TutoBot Section */}
      <section id="ai-TutoBot" className="ai-TutoBot-section">
        <div className="container">
          <div className="ai-TutoBot-content">
            <div className="ai-TutoBot-text">
              <div className="section-header left-aligned">
                <h2>Rencontrez TutoBot, votre assistant IA personnel</h2>
                <p>Une révolution dans l'apprentissage personnalisé</p>
              </div>
              <ul className="ai-TutoBot-features">
                <li>
                  <span className="check-icon">✓</span>
                  <div>
                    <h4>Disponible 24/7</h4>
                    <p>Assistance instantanée à tout moment, pour toutes les matières</p>
                  </div>
                </li>
                <li>
                  <span className="check-icon">✓</span>
                  <div>
                    <h4>Explications personnalisées</h4>
                    <p>Adapte ses explications au niveau de compréhension de votre enfant</p>
                  </div>
                </li>
                <li>
                  <span className="check-icon">✓</span>
                  <div>
                    <h4>Aide pas à pas</h4>
                    <p>Guide votre enfant à travers les problèmes complexes</p>
                  </div>
                </li>
                <li>
                  <span className="check-icon">✓</span>
                  <div>
                    <h4>Conçu par des experts</h4>
                    <p>Développé par des enseignants et spécialistes en éducation</p>
                  </div>
                </li>
              </ul>
              <a href="#subscription" className="btn btn-primary">Essayer TutoBot maintenant</a>
            </div>
            <div className="ai-TutoBot-image">
              <div className="main-image-container">
                <img src={tutoBotResonse} alt="Main Response" className="main-image" />
                <img src={tutoBot} alt="TutoBot AI Assistant" className="tutobot-bubble" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>Ce que disent nos utilisateurs</h2>
            <p>Découvrez comment Tutorax transforme l'expérience d'apprentissage</p>
          </div>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-rating">★★★★★</div>
              <p className="testimonial-text">"Depuis que ma fille utilise Tutorax, ses notes en mathématiques se sont considérablement améliorées. L'IA TutoBot est incroyablement patiente!"</p>
              <div className="testimonial-author">
                <img src="/api/placeholder/60/60" alt="Parent" className="testimonial-avatar" />
                <div>
                  <h4>Marie Dupont</h4>
                  <p>Parent d'élève de 4ème</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-rating">★★★★★</div>
              <p className="testimonial-text">"Les cours sont interactifs et captivants. Mon fils attend avec impatience ses sessions sur Tutorax, ce qui était inimaginable avant!"</p>
              <div className="testimonial-author">
                <img src="/api/placeholder/60/60" alt="Parent" className="testimonial-avatar" />
                <div>
                  <h4>Thomas Bernard</h4>
                  <p>Parent d'élève de CM2</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-rating">★★★★★</div>
              <p className="testimonial-text">"Le support des tuteurs réels combiné à l'IA offre une expérience d'apprentissage complète. C'est comme avoir un précepteur personnel à la maison."</p>
              <div className="testimonial-author">
                <img src="/api/placeholder/60/60" alt="Parent" className="testimonial-avatar" />
                <div>
                  <h4>Sophie Martin</h4>
                  <p>Parent d'élève de 2nde</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Section */}
      <section id="subscription" className="subscription-section">
        <div className="container">
          <div className="subscription-container">
            <div className="subscription-content">
              <div className="section-header left-aligned">
                <h2>Démarrez votre voyage éducatif aujourd'hui</h2>
                <p>Inscrivez-vous pour débloquer tout le potentiel de votre enfant</p>
              </div>
              
              <div className="pricing-cards">
                <div className="pricing-card">
                  <div className="pricing-header">
                    <h3>Mensuel</h3>
                    <div className="price">
                      <span className="amount">34,99$</span>
                      <span className="period">/mois</span>
                    </div>
                  </div>
                  <ul className="pricing-features">
                    <li>Tous les cours et exercices</li>
                    <li>Accès à TutoBot IA illimité</li>
                    <li>Aide aux devoirs</li>
                    <li>2 sessions avec tuteur réel</li>
                  </ul>
                </div>
                
                <div className="pricing-card featured">
                  <div className="recommended-badge">Recommandé</div>
                  <div className="pricing-header">
                    <h3>Annuel</h3>
                    <div className="price">
                      <span className="amount">349,99$</span>
                      <span className="period">/an</span>
                    </div>
                    <p className="savings">Économisez 30%</p>
                  </div>
                  <ul className="pricing-features">
                    <li>Tous les cours et exercices</li>
                    <li>Accès à TutoBot IA illimité</li>
                    <li>Aide aux devoirs illimitée</li>
                    <li>4 sessions avec tuteur réel par mois</li>
                    <li>Correction prioritaire</li>
                    <li>Contenu exclusif</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="subscription-form-wrapper">
              {submitted ? (
                <div className="success-message">
                  <div className="success-icon">✓</div>
                  <h3>Merci pour votre inscription!</h3>
                  <p>Nous avons bien reçu votre demande. Un de nos conseillers vous contactera très prochainement pour finaliser votre abonnement.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    style={{ backgroundColor: 'rgba(255, 182, 6, 1)' }}
                    className="btn btn-primary"
                  >
                    Nouvelle inscription
                  </button>
                </div>
              ) : (
                <form className="subscription-form" onSubmit={handleSubmit}>
                  <h3>Inscrivez-vous maintenant</h3>
                  <p>Essai gratuit de 7 jours, sans engagement</p>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">Prénom</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder="Votre prénom"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Nom</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder="Votre nom"
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Votre adresse email"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Téléphone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="Votre numéro de téléphone"
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="childName">Prénom de l'enfant</label>
                      <input
                        type="text"
                        id="childName"
                        name="childName"
                        value={formData.childName}
                        onChange={handleChange}
                        required
                        placeholder="Prénom de l'enfant"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="childLevel">Niveau scolaire</label>
                      <select
                        id="childLevel"
                        name="childLevel"
                        value={formData.childLevel}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Sélectionnez un niveau</option>
                        <option value="CP">CP</option>
                        <option value="CE1">CE1</option>
                        <option value="CE2">CE2</option>
                        <option value="CM1">CM1</option>
                        <option value="CM2">CM2</option>
                        <option value="6ème">6ème</option>
                        <option value="5ème">5ème</option>
                        <option value="4ème">4ème</option>
                        <option value="3ème">3ème</option>
                        <option value="2nde">2nde</option>
                        <option value="1ère">1ère</option>
                        <option value="Terminale">Terminale</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="description">Besoins spécifiques (optionnel)</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Décrivez les besoins particuliers de votre enfant"
                      rows="3"
                    ></textarea>
                  </div>
                  
                  <div className="form-group checkbox-group">
                    <input type="checkbox" id="terms" required />
                    <label htmlFor="terms">J'accepte les <a href="/terms">conditions d'utilisation</a> et la <a href="/privacy">politique de confidentialité</a></label>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary subscribe-btn"
                    style={{ backgroundColor: 'rgba(255, 182, 6, 1)' }}
                  >
                    Commencer l'essai gratuit
                  </button>
                  
                  <p className="form-note">Sans engagement. Annulez à tout moment pendant la période d'essai.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-container">
            <div className="stat-item">
              <h3>50,000+</h3>
              <p>Élèves satisfaits</p>
            </div>
            <div className="stat-item">
              <h3>1,200+</h3>
              <p>Cours disponibles</p>
            </div>
            <div className="stat-item">
              <h3>98%</h3>
              <p>Taux de satisfaction</p>
            </div>
            <div className="stat-item">
              <h3>85%</h3>
              <p>Amélioration des notes</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2>Questions fréquentes</h2>
            <p>Tout ce que vous devez savoir sur la plateforme éducative de Tutorax</p>
          </div>
          
          <div className="faq-container">
            <div className="faq-item">
              <h3>Comment fonctionne l'essai gratuit ?</h3>
              <p>L'essai gratuit vous donne accès à toutes les fonctionnalités de la plateforme éducative de Tutorax pendant 7 jours. Vous pouvez annuler à tout moment avant la fin de cette période sans être facturé.</p>
            </div>
            
            <div className="faq-item">
              <h3>Qui sont vos tuteurs ?</h3>
              <p>Nos tuteurs sont des enseignants qualifiés et des experts dans leurs domaines respectifs. Ils sont soigneusement sélectionnés et formés pour offrir le meilleur soutien éducatif possible.</p>
            </div>
            
            <div className="faq-item">
              <h3>Comment Tutobot aide-t-il mon enfant ?</h3>
              <p>TutoBot IA est un assistant d'apprentissage personnalisé qui répond aux questions, explique les concepts difficiles et guide votre enfant à travers ses devoirs, le tout adapté à son niveau et à son style d'apprentissage.</p>
            </div>
            
            <div className="faq-item">
              <h3>Puis-je changer de forfait ?</h3>
              <p>Oui, vous pouvez changer de forfait à tout moment. Si vous passez à un forfait supérieur, la différence sera ajustée pro-rata. Si vous passez à un forfait inférieur, le changement prendra effet à votre prochaine date de facturation.</p>
            </div>
            
            <div className="faq-item">
              <h3>Les cours suivent-ils le programme officiel ?</h3>
              <p>Oui, tous nos cours sont alignés sur les programmes scolaires québécois officiels, tout en offrant des approches pédagogiques innovantes pour renforcer la compréhension.</p>
            </div>
            
            <div className="faq-item">
              <h3>Combien d'enfants puis-je inscrire avec un seul compte ?</h3>
              <p>Un abonnement couvre un enfant. Pour des abonnements multi-enfants, nous proposons des réductions familiales. Contactez notre service client pour plus d'informations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <img src="https://tutorcruncher-public.s3.eu-west-1.amazonaws.com/tutorax/3269/logos/page_logo_230517195117.png.400x100_q95.png" alt="Tutorax Logo" />
              <p>Transformons l'éducation ensemble.</p>
            </div>
            
            <div className="footer-links">
              <div className="footer-links-column">
                <h4>Produit</h4>
                <ul>
                  <li><a href="/courses">Cours</a></li>
                  <li><a href="/exercises">Exercices</a></li>
                  <li><a href="/tutobot">TutoBot IA</a></li>
                  <li><a href="/tutoring">Tutorat réel</a></li>
                </ul>
              </div>
              
              <div className="footer-links-column">
                <h4>Entreprise</h4>
                <ul>
                  <li><a href="/about">À propos</a></li>
                  <li><a href="/blog">Blog</a></li>
                  <li><a href="/careers">Carrières</a></li>
                  <li><a href="/contact">Contact</a></li>
                </ul>
              </div>
              
              <div className="footer-links-column">
                <h4>Légal</h4>
                <ul>
                  <li><a href="/terms">Conditions d'utilisation</a></li>
                  <li><a href="/privacy">Politique de confidentialité</a></li>
                  <li><a href="/cookies">Cookies</a></li>
                </ul>
              </div>
              
              <div className="footer-links-column">
                <h4>Nous contacter</h4>
                <ul className="contact-info">
                  <li><FontAwesomeIcon icon={faPhone} />  1-800-513-5358 </li>
                  <li><FontAwesomeIcon icon={faEnvelope} /> contact@tutorax.com</li>
                  <li><FontAwesomeIcon icon={faLocation} />  30 Rue Lefort Laval, QC H7L 0C5</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2025 Tutorax. Tous droits réservés.</p>
            <div className="social-icons">
              <a href="https://facebook.com/tutorax" aria-label="Facebook"><FontAwesomeIcon icon={faFacebook} /></a>
              <a href="https://instagram.com/tutorax" aria-label="Instagram"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="https://linkedin.com/company/tutorax" aria-label="LinkedIn"><FontAwesomeIcon icon={faLinkedin} /></a>
              <a href="https://twitter.com/tutorax" aria-label="Twitter"><FontAwesomeIcon icon={faTwitter} /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;