import React, { Component } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; // optional
import ScrollToTop from './scroll_to_top';
import HeadSEO from '../layouts/tradnity/headSEO';

const PRIMARY_ORANGE = '#F98814';

const styles = {
  page: {
    margin: 0,
    padding: 0,
    fontFamily: "'Poppins', 'Segoe UI', sans-serif",
    background: "#ffffff",
    color: "#1a1a1a",
    minHeight: "100vh",
    overflowX: "hidden",
  },
  /* ── Page hero ── */
  hero: {
    background: `linear-gradient(120deg, ${PRIMARY_ORANGE} 0%, #e07000 70%, #c45e00 100%)`,
    padding: "72px 40px 64px",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 15% 50%, rgba(255,255,255,0.07) 0%, transparent 55%), radial-gradient(ellipse at 85% 20%, rgba(255,255,255,0.05) 0%, transparent 45%)",
    pointerEvents: "none",
  },
  heroPill: {
    display: "inline-block",
    background: "rgba(255,255,255,0.2)",
    color: "#fff",
    borderRadius: "999px",
    padding: "5px 20px",
    fontSize: "0.72rem",
    fontWeight: 800,
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: "20px",
  },
  heroH1: {
    fontSize: "clamp(2rem,5vw,3.2rem)",
    fontWeight: 900,
    color: "#fff",
    margin: "0 0 14px",
    letterSpacing: "-0.5px",
    lineHeight: 1.15,
    textShadow: "0 2px 14px rgba(0,0,0,0.15)",
  },
  heroP: {
    color: "rgba(255,255,255,0.88)",
    fontSize: "1.02rem",
    maxWidth: "560px",
    margin: "0 auto",
    lineHeight: 1.75,
  },
  /* ── Content ── */
  content: {
    maxWidth: "1080px",
    margin: "0 auto",
    padding: "64px 24px 80px",
    display: "flex",
    flexDirection: "column",
    gap: "48px",
  },
  p: {
    color: "#444",
    lineHeight: 1.85,
    fontSize: "1.05rem",
    margin: "0 0 20px",
  },
  highlight: { color: PRIMARY_ORANGE, fontWeight: 700 },
  list: {
    margin: "24px 0",
    paddingLeft: "0",
  },
  listItem: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "16px",
    fontSize: "1.05rem",
    color: "#444",
  },
  check: {
    color: PRIMARY_ORANGE,
    fontSize: "1.4rem",
    marginRight: "12px",
    flexShrink: 0,
    lineHeight: 1.4,
  },
  returnNote: {
    background: "#fff8f0",
    border: `1.5px solid ${PRIMARY_ORANGE}88`,
    borderRadius: "16px",
    padding: "36px 40px",
    display: "flex",
    gap: "24px",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  returnIcon: {
    fontSize: "2.8rem",
    flexShrink: 0,
    color: PRIMARY_ORANGE,
  },
  returnBody: { flex: "1 1 260px" },
  returnTitle: {
    fontSize: "1.45rem",
    fontWeight: 800,
    color: PRIMARY_ORANGE,
    margin: "0 0 16px",
  },
  ctaBanner: {
    background: `linear-gradient(120deg, ${PRIMARY_ORANGE} 0%, #e07000 100%)`,
    borderRadius: "20px",
    padding: "50px 48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "24px",
    overflow: "hidden",
    position: "relative",
  },
  ctaGlow: {
    position: "absolute",
    inset: 0,
    backgroundImage: "radial-gradient(circle at 90% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
    pointerEvents: "none",
  },
  ctaH2: {
    fontSize: "clamp(1.4rem,3vw,2rem)",
    fontWeight: 900,
    color: "#fff",
    margin: "0 0 8px",
    lineHeight: 1.2,
  },
  ctaP: {
    color: "rgba(255,255,255,0.9)",
    fontSize: "1.05rem",
    margin: 0,
    lineHeight: 1.6,
  },
};

/* ── Main ── */
class AboutUsStructure extends Component {
  render() {
    const { about } = this.props;

    return (
      <div style={styles.page}>
        <ScrollToTop />
        <HeadSEO title="About Us" />

        {/* Banner images from original
        {about && about.length > 0 && about.map((res, index) => (
          <div key={index}>
            <LazyLoadImage
              style={{ width: "100%", height: "auto", display: "block" }}
              src={res?.image_url}
              effect="blur"
              alt="About IWAHDEALS banner"
            />
          </div>
        ))} */}

        {/* Hero – keeping same style as reference */}
        <section style={styles.hero}>
          <div style={styles.heroOverlay} />
          <div style={styles.heroPill}>Registered · Trusted · Transparent</div>
          <h1 style={styles.heroH1}>Welcome to IWAHDEALS Trading</h1>
          <p style={styles.heroP}>
            where innovation meets affordability — bringing you the newest, trending products at the best prices across Bahrain and worldwide.
          </p>
        </section>

        {/* Main content area – keeping layout feel */}
        <div style={styles.content}>
          <p style={styles.p}>
            We are a properly registered company in Bahrain under{" "}
            <span style={styles.highlight}>CR Number: 176652-3</span>, operating under the registered business name{" "}
            <span style={styles.highlight}>IWAHDEALS Trading</span>. Transparency, trust, and customer satisfaction are the foundation of our business.
          </p>

          <p style={styles.p}>
            Our journey began with one clear mission: to bring the newest, trending, and modified products to customers at the best bottom prices — without compromising on quality. We continuously explore global markets to deliver smart, unique, and in-demand products that make everyday life better and more convenient.
          </p>

          <p style={styles.p}>
            At IWAHDEALS, we are proud to be a responsible and trustworthy eCommerce company, serving customers not only across Bahrain but also worldwide. Our commitment is simple:
          </p>

          <ul style={styles.list}>
            <li style={styles.listItem}>
              <span style={styles.check}>✔️</span> Authentic & quality products
            </li>
            <li style={styles.listItem}>
              <span style={styles.check}>✔️</span> Competitive bottom pricing
            </li>
            <li style={styles.listItem}>
              <span style={styles.check}>✔️</span> Secure online shopping
            </li>
            <li style={styles.listItem}>
              <span style={styles.check}>✔️</span> Reliable customer support
            </li>
          </ul>

          {/* Return note – keeping same card style from reference */}
          <div style={styles.returnNote}>
            <div style={styles.returnIcon}>📦</div>
            <div style={styles.returnBody}>
              <div style={styles.returnTitle}>Easy & Customer-Friendly Return Policy</div>
              <p style={styles.p}>Your satisfaction is our priority. We offer a customer-friendly return and refund policy for your peace of mind:</p>
              <p style={styles.p}>We believe online shopping should be safe, simple, and stress-free.</p>
            </div>
          </div>

          {/* Closing CTA banner – keeping visual style */}
          <div style={styles.ctaBanner}>
            <div style={styles.ctaGlow} />
            <div>
              <h2 style={styles.ctaH2}>IWAHDEALS – Smart Shopping Starts Here.</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutUsStructure;