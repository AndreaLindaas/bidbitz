import "./Footer.scss";
export default function Footer() {
  return (
    <footer>
      <div>
        <h2>BidBitz</h2>
      </div>
      <div className="footer-contact">
        <div>Mølleparken 4, 0459 Oslo</div>
        <div>+47 22 22 22 22</div>
        <div>bidbitz@bid.com</div>
      </div>
      <div>
        <div className="copyright">Copyright &copy; 2023</div>
      </div>
    </footer>
  );
}
