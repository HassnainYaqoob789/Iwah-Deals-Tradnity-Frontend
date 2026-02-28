import React, { Component } from 'react';
import ScrollToTop from './scroll_to_top';
import HeadSEO from '../layouts/tradnity/headSEO';
import { LazyLoadImage } from 'react-lazy-load-image-component'; // if you want to use images later

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
  content: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "60px 24px 80px",
    display: "flex",
    flexDirection: "column",
    gap: "32px",
  },
  card: {
    background: "#fff",
    border: "1px solid #ededed",
    borderRadius: "16px",
    padding: "32px 36px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
    position: "relative",
    overflow: "hidden",
  },
  cardAccent: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "4px",
    height: "100%",
    background: `linear-gradient(180deg, ${PRIMARY_ORANGE}, #ffab5e)`,
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "16px",
  },
  numBadge: {
    width: "42px",
    height: "42px",
    borderRadius: "10px",
    background: PRIMARY_ORANGE,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 900,
    fontSize: "0.88rem",
    color: "#fff",
    flexShrink: 0,
    boxShadow: "0 3px 8px rgba(249,136,20,0.3)",
  },
  cardTitle: {
    fontSize: "1.15rem",
    fontWeight: 800,
    color: "#1a1a1a",
    margin: 0,
  },
  cardBody: {
    color: "#555",
    lineHeight: 1.8,
    fontSize: "0.96rem",
    margin: "0 0 16px",
    paddingLeft: "56px",
  },
  bulletList: {
    paddingLeft: "56px",
    margin: "16px 0",
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  bulletItem: {
    color: "#555",
    fontSize: "0.96rem",
    lineHeight: 1.75,
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: PRIMARY_ORANGE,
    marginTop: "8px",
    flexShrink: 0,
  },
  alertStrip: {
    background: "#fff3e6",
    border: `1px solid ${PRIMARY_ORANGE}88`,
    borderRadius: "10px",
    padding: "14px 18px",
    color: PRIMARY_ORANGE,
    fontSize: "0.88rem",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "16px 0 0 56px",
  },
  infoRow: {
    background: "#fff8f0",
    border: `1.5px solid ${PRIMARY_ORANGE}88`,
    borderRadius: "16px",
    padding: "36px 40px",
    display: "flex",
    gap: "24px",
    alignItems: "flex-start",
    flexWrap: "wrap",
    marginTop: "24px",
  },
  infoIcon: { fontSize: "2.8rem", flexShrink: 0, color: PRIMARY_ORANGE },
  infoContent: { flex: "1 1 260px" },
  infoH3: { fontSize: "1.15rem", fontWeight: 800, color: "#1a1a1a", margin: "0 0 12px" },
  infoP: { color: "#666", fontSize: "0.95rem", margin: 0, lineHeight: 1.75 },
};

class PolicyCard extends Component {
  render() {
    const { num, title, children } = this.props;
    return (
      <div style={styles.card}>
        <div style={styles.cardAccent} />
        <div style={styles.cardHeader}>
          <div style={styles.numBadge}>{String(num).padStart(2, '0')}</div>
          <h3 style={styles.cardTitle}>{title}</h3>
        </div>
        {children}
      </div>
    );
  }
}

class ReturnRefundPolicy extends Component {
  render() {
    return (
      <div style={styles.page}>
        <ScrollToTop />
        <HeadSEO title="Return & Refund Policy" />

        {/* Hero */}
        <section style={styles.hero}>
          <div style={styles.heroOverlay} />
          <div style={styles.heroPill}>All Platforms · All Orders</div>
          <h1 style={styles.heroH1}>Return & Refund Policy</h1>
          <p style={styles.heroP}>
            This Return & Refund Policy applies to all purchases made through our official website and social media platforms. By placing an order with us, you agree to the terms stated below.
          </p>
        </section>

        {/* Policy Content */}
        <div style={styles.content}>
          <PolicyCard num={1} title="Eligibility for Returns">
            <ul style={styles.bulletList}>
              <li style={styles.bulletItem}>
                <span style={styles.dot} />
                Returns are accepted only if the product is defective (manufacture fault), damaged at the time of delivery, or incorrect item is delivered.
              </li>
              <li style={styles.bulletItem}>
                <span style={styles.dot} />
                Any product with opened, damaged, altered, or tampered packaging is strictly NOT eligible for return or refund.
              </li>
              <li style={styles.bulletItem}>
                <span style={styles.dot} />
                Products must be unused, unwashed, and in original condition with all tags, labels, and packaging intact.
              </li>
            </ul>
          </PolicyCard>

          <PolicyCard num={2} title="Non-Returnable Items">
            <p style={styles.cardBody}>
              The following items are non-returnable under any circumstances:
            </p>
            <ul style={styles.bulletList}>
              <li style={styles.bulletItem}><span style={styles.dot} />Products with opened or broken packaging</li>
              <li style={styles.bulletItem}><span style={styles.dot} />Clothing items that show signs of wear, washing, or alteration</li>
              <li style={styles.bulletItem}><span style={styles.dot} />Technology and household gadgets once opened or used</li>
              <li style={styles.bulletItem}><span style={styles.dot} />Cell phone gadgets, car accessories & products mentioned with no return and refund in description</li>
              <li style={styles.bulletItem}><span style={styles.dot} />Items purchased on sale, clearance, or promotional offers.</li>
            </ul>
          </PolicyCard>

          <PolicyCard num={3} title="Return Request Process">
            <ul style={styles.bulletList}>
              <li style={styles.bulletItem}><span style={styles.dot} />Return requests must be raised within 48 hours of delivery.</li>
              <li style={styles.bulletItem}><span style={styles.dot} />Customers must provide order number, product images, and reason for return.</li>
              <li style={styles.bulletItem}><span style={styles.dot} />Approval of return requests is at the sole discretion of the company.</li>
            </ul>
          </PolicyCard>

          <PolicyCard num={4} title="Refund Policy">
            <ul style={styles.bulletList}>
              <li style={styles.bulletItem}><span style={styles.dot} />Refunds are issued only after inspection and approval of the returned item.</li>
              <li style={styles.bulletItem}><span style={styles.dot} />Delivery, shipping, and handling charges are NON-REFUNDABLE under all circumstances.</li>
              <li style={styles.bulletItem}><span style={styles.dot} />Refunds will be processed using the original payment method or store credit, as decided by the company.</li>
            </ul>
          </PolicyCard>

          <PolicyCard num={5} title="Exchange Policy">
            <ul style={styles.bulletList}>
              <li style={styles.bulletItem}><span style={styles.dot} />Exchanges are subject to product availability.</li>
              <li style={styles.bulletItem}><span style={styles.dot} />The company reserves the right to refuse exchange requests if policy conditions are not met.</li>
            </ul>
          </PolicyCard>

          <PolicyCard num={6} title="Final Authority">
            <p style={styles.cardBody}>
              The company reserves the right to approve or reject any return, refund, or exchange request. All decisions made by the company shall be final and binding.
            </p>
          </PolicyCard>

          <PolicyCard num={7} title="Policy Updates">
            <p style={styles.cardBody}>
              This policy may be updated or modified at any time without prior notice. Customers are encouraged to review this policy periodically.
            </p>
          </PolicyCard>

          {/* Optional contact/info block – kept minimal */}
          <div style={styles.infoRow}>
            <div style={styles.infoIcon}>📦</div>
            <div style={styles.infoContent}>
              <h3 style={styles.infoH3}>Need Help with Returns?</h3>
              <p style={styles.infoP}>
                Contact our support team with your order number and photos within 48 hours of delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReturnRefundPolicy;