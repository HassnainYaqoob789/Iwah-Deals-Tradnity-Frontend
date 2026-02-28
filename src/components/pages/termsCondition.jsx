import React, { Component } from 'react';
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
            "radial-gradient(ellipse at 15% 50%, rgba(255,255,255,0.07) 0%, transparent 55%)",
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
    outerLayout: {
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "60px 24px 80px",
        display: "flex",
        gap: "32px",
        alignItems: "flex-start",
        flexWrap: "wrap",
    },
    sidebar: {
        flex: "0 0 230px",
        position: "sticky",
        top: "88px",
    },
    tocBox: {
        background: "#f9f9f9",
        border: "1px solid #ededed",
        borderRadius: "14px",
        padding: "24px",
    },
    tocHeading: {
        fontSize: "0.7rem",
        fontWeight: 800,
        color: PRIMARY_ORANGE,
        letterSpacing: "2px",
        textTransform: "uppercase",
        marginBottom: "16px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
    tocHeadingBar: {
        width: "4px",
        height: "14px",
        background: PRIMARY_ORANGE,
        borderRadius: "4px",
    },
    tocList: {
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: "2px",
    },
    tocLink: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "8px 10px",
        borderRadius: "8px",
        textDecoration: "none",
        color: "#666",
        fontSize: "0.8rem",
        fontWeight: 500,
        lineHeight: 1.4,
        transition: "background 0.15s",
    },
    tocNum: {
        fontSize: "0.68rem",
        fontWeight: 800,
        color: PRIMARY_ORANGE,
        width: "22px",
        flexShrink: 0,
    },
    main: {
        flex: "1 1 500px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    card: {
        background: "#fff",
        border: "1px solid #ededed",
        borderRadius: "16px",
        padding: "28px 32px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
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
        borderRadius: "16px 0 0 16px",
    },
    cardHeader: {
        display: "flex",
        alignItems: "center",
        gap: "14px",
    },
    numBadge: {
        width: "40px",
        height: "40px",
        borderRadius: "10px",
        background: PRIMARY_ORANGE,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 900,
        fontSize: "0.85rem",
        color: "#fff",
        flexShrink: 0,
        boxShadow: "0 3px 8px rgba(249,136,20,0.3)",
    },
    cardTitle: {
        fontSize: "1.02rem",
        fontWeight: 800,
        color: "#1a1a1a",
        margin: 0,
    },
    cardBody: {
        color: "#666",
        lineHeight: 1.85,
        fontSize: "0.93rem",
        margin: 0,
        paddingLeft: "54px",
    },
    bulletList: {
        paddingLeft: "54px",
        margin: 0,
        listStyle: "none",
        display: "flex",
        flexDirection: "column",
        gap: "9px",
    },
    bulletItem: {
        color: "#666",
        fontSize: "0.93rem",
        lineHeight: 1.75,
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
    },
    dot: {
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        background: PRIMARY_ORANGE,
        marginTop: "8px",
        flexShrink: 0,
    },
    agreeBox: {
        background: `linear-gradient(120deg, ${PRIMARY_ORANGE}, #e07000)`,
        borderRadius: "16px",
        padding: "42px 40px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
    },
    agreeGlow: {
        position: "absolute",
        inset: 0,
        backgroundImage: "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.09) 0%, transparent 50%)",
        pointerEvents: "none",
    },
    agreeH3: {
        fontSize: "1.3rem",
        fontWeight: 900,
        color: "#fff",
        margin: "0 0 10px",
    },
    agreeP: {
        color: "rgba(255,255,255,0.85)",
        fontSize: "0.92rem",
        margin: "0 0 20px",
        lineHeight: 1.65,
    },
    agreeBtn: {
        display: "inline-block",
        background: "#fff",
        color: PRIMARY_ORANGE,
        borderRadius: "8px",
        padding: "11px 28px",
        fontWeight: 800,
        fontSize: "0.88rem",
        textDecoration: "none",
        boxShadow: "0 3px 10px rgba(0,0,0,0.12)",
    },
};

class SectionCard extends Component {
    render() {
        const { num, title, children } = this.props;
        return (
            <div id={`sec-${num}`} style={styles.card}>
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

class BulletList extends Component {
    render() {
        return (
            <ul style={styles.bulletList}>
                {this.props.items.map((item, i) => (
                    <li key={i} style={styles.bulletItem}>
                        <span style={styles.dot} />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        );
    }
}

class Sidebar extends Component {
    render() {
        const sections = [
            "Business Scope",
            "Pricing & Payments",
            "Order Acceptance & Cancellation",
            "Delivery",
            "Product Information",
            "Limitation of Liability",
            "Intellectual Property",
            "Amendments",
        ];
        return (
            <aside style={styles.sidebar}>
                <div style={styles.tocBox}>
                    <div style={styles.tocHeading}>
                        <span style={styles.tocHeadingBar} />
                        Contents
                    </div>
                    <ul style={styles.tocList}>
                        {sections.map((sec, i) => (
                            <li key={i}>
                                <a href={`#sec-${i + 1}`} style={styles.tocLink}>
                                    <span style={styles.tocNum}>{String(i + 1).padStart(2, '0')}</span>
                                    <span>{sec}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        );
    }
}

class TermsAndConditions extends Component {
    render() {
        return (
            <div style={styles.page}>
                <ScrollToTop />
                <HeadSEO title="Terms & Conditions" />

                {/* Hero */}
                <section style={styles.hero}>
                    <div style={styles.heroOverlay} />
                    <div style={styles.heroPill}>Legal Agreement · All Platforms</div>
                    <h1 style={styles.heroH1}>Terms & Conditions</h1>
                    <p style={styles.heroP}>
                        These Terms & Conditions govern your use of our website, social media pages, and services. By accessing or purchasing from our platforms, you agree to be legally bound by these terms.
                    </p>
                </section>

                {/* Two-column layout */}
                <div style={styles.outerLayout}>
                    <Sidebar />

                    <main style={styles.main}>
                        <SectionCard num={1} title="Business Scope">
                            <p style={styles.cardBody}>
                                We sell eastern clothing, technology products, and household gadgets through online platforms only. All products are subject to availability.
                            </p>
                        </SectionCard>

                        <SectionCard num={2} title="Pricing & Payments">
                            <BulletList items={[
                                "All prices are listed in applicable currency and are subject to change without notice.",
                                "Full payment must be made at cash on delivery along with delivery charges.",
                            ]} />
                        </SectionCard>

                        <SectionCard num={3} title="Order Acceptance & Cancellation">
                            <BulletList items={[
                                "The company reserves the right to accept or reject any order at its sole discretion.",
                                "Orders once dispatched cannot be cancelled.",
                            ]} />
                        </SectionCard>

                        <SectionCard num={4} title="Delivery">
                            <BulletList items={[
                                "Delivery timelines are estimated and may vary due to external factors.",
                                "The company is not responsible for delays caused by courier services or force majeure events.",
                            ]} />
                        </SectionCard>

                        <SectionCard num={5} title="Product Information">
                            <BulletList items={[
                                "Product images are for illustration purposes only.",
                                "Minor variations in color, design, or packaging may occur.",
                            ]} />
                        </SectionCard>

                        <SectionCard num={6} title="Limitation of Liability">
                            <p style={styles.cardBody}>
                                The company shall not be liable for any indirect, incidental, or consequential damages arising from the use of products or services.
                            </p>
                        </SectionCard>

                        <SectionCard num={7} title="Intellectual Property">
                            <p style={styles.cardBody}>
                                All content including logos, images, text, and designs are the property of the company and may not be used without written permission.
                            </p>
                        </SectionCard>

                        <SectionCard num={8} title="Amendments">
                            <p style={styles.cardBody}>
                                The company reserves the right to modify these Terms & Conditions at any time without prior notice.
                            </p>
                        </SectionCard>

                        {/* Agreement banner */}
                        <div style={styles.agreeBox}>
                            <div style={styles.agreeGlow} />
                            <h3 style={styles.agreeH3}>By Using Our Services, You Agree</h3>
                            <p style={styles.agreeP}>
                                Accessing or purchasing from IWAHDEALS confirms your acceptance of these Terms & Conditions.
                            </p>
                            <a href="/" style={styles.agreeBtn}>
                                Continue Shopping →
                            </a>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

export default TermsAndConditions;