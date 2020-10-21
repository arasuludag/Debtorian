import React from "react";

function Footer() {
  const yearNow = new Date().getFullYear();

  return (
    <footer style={{ marginTop: "200px" }}>
      <div className="footer-copyright text-center py-3 h6">
        <p style={{ textAlign: "center" }}>
          {" "}
          © {yearNow} Copyright: Aras Uludag{" "}
        </p>
      </div>
    </footer>
  );
}
export default Footer;
