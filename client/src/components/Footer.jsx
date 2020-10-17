import React from "react";

function Footer() {
  const yearNow = new Date().getFullYear();

  return (
    <footer className="">
      <div className="footer-copyright text-center py-3 h6">
        <p style={{textAlign: "center"}}> © {yearNow} Copyright: Aras Uludag </p>
      </div>
    </footer>
  );
}
export default Footer;
