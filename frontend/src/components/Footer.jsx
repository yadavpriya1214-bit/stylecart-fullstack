import "../css/Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-section">
          <h3>StyleSpectrum</h3>
          <p>pk Fashion Street</p>
          <p>Coimbatore, Tamil Nadu</p>
          <p>Email: stylespectrum@gmail.com</p>
          <p>Phone: +91 9876543210</p>
        </div>

        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <p>Home</p>
          <p>Products</p>
          <p>Cart</p>
          <p>Login</p>
        </div>

       
        <div className="footer-section">
          <h4>Customer Service</h4>
          <p>Help Center</p>
          <p>Return Policy</p>
          <p>Complaint</p>
          <p>Support</p>
        </div>

      </div>

     
      <div className="footer-bottom">
        <p>© 2026 StyleSpectrum. All rights reserved.</p>
      </div>

    </footer>
  );
}

export default Footer;