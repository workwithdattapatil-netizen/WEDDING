import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-ornament">❦</div>

      <h3 className="footer-couple">Dattatray &amp; Pooja</h3>
      <p className="footer-date">25 · 02 · 2027</p>

      <div className="footer-divider">
        <span className="footer-divider-icon">✦</span>
      </div>

      <p className="footer-thanks">
        With love and gratitude,
        <br />
        we await your blessings on our special day.
      </p>

      <p className="footer-credit">
        Designed with <span className="heart">♥</span> by Datta
      </p>
    </footer>
  )
}

export default Footer
