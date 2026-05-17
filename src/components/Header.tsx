import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="header-bg-pattern" />

      <div className="ganesh-wrap">
        <img
          src="/Vianyak%20png.png"
          alt="Lord Ganesha"
          className="ganesh-icon"
        />
      </div>

      <p className="sanskrit-line">
        वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ
      </p>
      <p className="sanskrit-line">
        निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा
      </p>

      <div className="divider">
        <span className="divider-icon">❦</span>
      </div>

      <p className="invite-text">
        With the blessings of <em>Lord Ganesha</em>
        <br />
        and our beloved elders
      </p>

      <p className="request-line">we joyfully invite you to the wedding of</p>

      <div className="couple-block">
        <h1 className="groom-name">Dattatray</h1>
        <p className="parents-line">
          Son of Mr. Shamrao Patil &amp; Mrs. Sunanda Patil
        </p>
        <p className="elders-line">
          (Grandson of Late Shri Patil)
        </p>

        <div className="amp-row">
          <span className="amp-line" />
          <span className="amp-glyph">&amp;</span>
          <span className="amp-line" />
        </div>

        <h1 className="bride-name">Pooja</h1>
        <p className="parents-line">
          Daughter of Mr. Ulhas Kesarkar &amp; Mrs. Priyanka Kesarkar
        </p>
        <p className="elders-line">
          (Granddaughter of Late Shri Kesarkar)
        </p>
      </div>

      <div className="floral-corner top-left">❀</div>
      <div className="floral-corner top-right">❀</div>
      <div className="floral-corner bottom-left">❀</div>
      <div className="floral-corner bottom-right">❀</div>
    </header>
  )
}

export default Header
