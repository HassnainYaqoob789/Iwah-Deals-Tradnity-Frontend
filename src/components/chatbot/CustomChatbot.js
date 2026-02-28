import React from "react";
import { connect } from "react-redux";
import { FaWhatsapp } from "react-icons/fa";

function CustomChatbot(props) {
  const { number } = props;  // name prop use nahi ho raha to remove kar diya, agar zarurat ho to rakh lena

  let original =
    number && number.length !== 0
      ? number.substring(0, 2) === "03"
        ? "+923" + number.substring(2)
        : number.substring(0, 2) !== "03"
        ? "+" + number
        : "03331203726"
      : "03331203726"; // fallback number

  const whatsappNumber = original.replace("+", ""); // API/link ke liye clean number

  return (
    <>
      {original && original.length !== 0 ? (
        <a
          href={`https://wa.me/${whatsappNumber}?text=Hello!`}
          target="_blank"
          rel="noopener noreferrer"
          className="myWhatsapp" // tera class (fixed bottom-right styling ke liye)
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp
            style={{
              fontSize: "36px",
              color: "#fff",           // white icon
              backgroundColor: "#25D366", // WhatsApp green
              borderRadius: "50%",
              padding: "8px",          // circle padding for nice look
            }}
          />
        </a>
      ) : null}
    </>
  );
}

const mapStateToProps = (state) => ({
  number:
    state?.contactDetails?.contactDetails?.data?.whatsapp_number || "",
  // name: state,   // agar use nahi ho raha to comment out kar sakta hai
});

export default connect(mapStateToProps)(CustomChatbot);