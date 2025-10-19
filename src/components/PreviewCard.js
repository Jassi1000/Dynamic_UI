import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import furnitureMain from "./assets/furnitureMain.png";
import cards from "./assets/cards.jpg";
import armsImage from "./assets/arms.png";
import { useUIStore } from "../store/uistore";

const shadowMap = {
  none: "none",
  small: "0 1px 3px rgba(0,0,0,0.08)",
  medium: "0 4px 8px rgba(0,0,0,0.12)",
  large: "0 8px 20px rgba(0,0,0,0.16)",
};

export default function PreviewCard() {
  const {
    fontFamily,
    fontWeight,
    fontSize,
    btnBg,
    btnText,
    btnBorderRadius,
    btnShadow,
    btnAlign,
    cardRadius,
    containerPadding,
    sectionBg,
    strokeWeight,
    strokeColor,
    gallerySpacing,
    imageRadius,
    galleryAlign,
  } = useUIStore();

  const [selectedThumb, setSelectedThumb] = useState(0);
  const [openSection, setOpenSection] = useState(1);
  const [openMaterial, setOpenMaterial] = useState("LEATHER");
  const [selectedArm, setSelectedArm] = useState(0);
  const [selectedColor, setSelectedColor] = useState({
    name: "Leather Brown",
    hex: "#5D4a40",
  });
  const [selectedLegColor, setSelectedLegColor] = useState({
    name: "Sage Green",
    hex: "#727863",
  });

  const colors = [
    { name: "Leather Brown", hex: "#5D4a40" },
    { name: "Sage Green", hex: "#727863" },
    { name: "Forest Green", hex: "#637363" },
    { name: "Teal", hex: "#526563" },
    { name: "Dusty Plum", hex: "#695A6C" },
    { name: "Muted Lilac", hex: "#8F7D8F" },
    { name: "Deep Navy", hex: "#4C5A72" },
    { name: "Terracotta", hex: "#A45C54" },
    { name: "Burgundy", hex: "#6F3F3F" },
    { name: "Emerald", hex: "#2E6458" },
  ];

  const thumbs = [1, 2, 3, 4, 5, 6];

  // Alignment for thumbnails
  let justify = "flex-start";
  if (galleryAlign === "grid-center") justify = "center";
  if (galleryAlign === "grid-right") justify = "flex-end";

  // --- Style objects ---
  const cardStyle = {
    borderRadius: cardRadius + "px",
    padding: containerPadding + "px",
    background: sectionBg,
    border: `${strokeWeight}px solid ${strokeColor}`,
    fontFamily,
    fontWeight,
    fontSize: fontSize + "px",
    color: "#222",
    width: "100%",
    boxSizing: "border-box",
    display: "flex",
    height: "calc(100vh - 100px)",
    overflow: "hidden",
  };

  const btnStyle = {
    background: btnBg,
    color: btnText,
    borderRadius: btnBorderRadius + "px",
    boxShadow: shadowMap[btnShadow] || shadowMap.none,
    padding: "12px 18px",
    border: "none",
    cursor: "pointer",
    fontSize: Math.max(12, fontSize - 2) + "px",
    transition: "all 0.2s ease-in-out",
  };

  const footerStyle = {
    marginTop: "auto",
    paddingTop: "24px",
    borderTop: "1px solid #e5e7eb",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const buttonContainerStyle = {
    display: "flex",
    flex: 1,
    justifyContent:
      btnAlign === "left"
        ? "flex-start"
        : btnAlign === "center"
        ? "center"
        : "flex-end",
    marginLeft: "16px",
  };

  return (
    <div style={cardStyle}>
      {/* LEFT SIDE */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: 24,
          borderRadius: Math.max(8, cardRadius - 4),
        }}
      >
        {/* main product image */}
        <div style={{ textAlign: "center", width: "100%", paddingLeft: 100 }}>
          <img
            src={furnitureMain}
            alt="Product"
            style={{
              width: "100%",
              maxWidth: 640,
              borderRadius: 12,
              objectFit: "cover",
              boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
            }}
          />
        </div>

        {/* thumbnails */}
        {/* thumbnails */}
<div
  style={{
    position: "absolute",
    left: justify === "center" ? "50%" : justify === "flex-end" ? "auto" : 16,
    right: justify === "flex-end" ? 16 : "auto",
    top: "30%",
    transform:
      justify === "center" ? "translate(-50%, -50%)" : "translateY(-50%)",
    display: "flex",
    flexDirection: "column",
    gap: `${gallerySpacing}px`,
    justifyContent: justify,
    alignItems: "center",
  }}
>
  {thumbs.map((_, idx) => (
    <img
      key={idx}
      src={cards}
      alt={`thumb-${idx}`}
      onClick={() => setSelectedThumb(idx)}
      style={{
        width: 48,
        height: 48,
        objectFit: "cover",
        borderRadius: imageRadius,
        cursor: "pointer",
        boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
        border:
          selectedThumb === idx
            ? "2px solid rgba(0,0,0,0.8)"
            : "1px solid rgba(0,0,0,0.1)",
        transition: "all 0.2s ease-in-out",
      }}
    />
  ))}
</div>

      </div>

      {/* RIGHT SIDE — SIDEBAR */}
      <div
        style={{
          width: 380,
          background: "#fff",
          borderLeft: "1px solid rgba(0,0,0,0.05)",
          padding: 24,
          boxSizing: "border-box",
          overflowY: "auto",
        }}
      >
        <h1
          style={{
            fontFamily,
            fontWeight,
            fontSize: fontSize + 8,
            color: "#1f2937",
          }}
        >
          Cozy Lounge Chair
        </h1>
        <p
          style={{
            fontSize,
            color: "#6b7280",
            marginBottom: 16,
          }}
        >
          Customize your Chair
        </p>

        {/* Arms Section */}
        <div style={{ borderTop: "1px solid #e5e7eb" }}>
          <button
            onClick={() => setOpenSection(openSection === 1 ? null : 1)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              padding: "12px 0",
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <img
                src={armsImage}
                alt="Arm"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 4,
                  border: "1px solid #d1d5db",
                  objectFit: "cover",
                }}
              />
              <span style={{ fontSize, color: "#4b5563" }}>1. Arms</span>
            </div>
            {openSection === 1 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {openSection === 1 && (
            <div
              style={{
                paddingTop: 16,
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              {Array(6)
                .fill(null)
                .map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedArm(index)}
                    style={{
                      border:
                        selectedArm === index
                          ? "2px solid #b91c1c"
                          : "1px solid #d1d5db",
                      borderRadius: 4,
                      padding: 4,
                      background: "none",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={armsImage}
                      alt={`Arm ${index + 1}`}
                      style={{ width: 50, height: 50, display: "block" }}
                    />
                  </button>
                ))}
            </div>
          )}
        </div>

        {/* Arms Finish */}
        <div style={{ borderTop: "1px solid #e5e7eb", marginTop: 16 }}>
          <button
            onClick={() => setOpenSection(openSection === 2 ? null : 2)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              padding: "12px 0",
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 4,
                  backgroundColor: selectedColor.hex,
                  border: "1px solid #d1d5db",
                }}
              ></div>
              <div>
                <span style={{ fontSize, color: "#4b5563" }}>
                  2. Arms Finish
                </span>
                <p
                  style={{
                    fontSize,
                    color: "#6b7280",
                    margin: 0,
                  }}
                >
                  {selectedColor.name}
                </p>
              </div>
            </div>
            {openSection === 2 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {openSection === 2 && (
            <div style={{ paddingTop: 12 }}>
              {["LEATHER", "STEEL", "ALUMINUM"].map((mat) => (
                <div key={mat} style={{ marginBottom: 12 }}>
                  <button
                    onClick={() =>
                      setOpenMaterial(openMaterial === mat ? null : mat)
                    }
                    style={{
                      width: "100%",
                      background: "none",
                      border: "none",
                      textAlign: "left",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <h4 style={{ margin: 0, color: "#6b7280" }}>{mat}</h4>
                    {openMaterial === mat ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>

                  {openMaterial === mat && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 10,
                        marginTop: 8,
                      }}
                    >
                      {colors.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColor(c)}
                          style={{
                            backgroundColor: c.hex,
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            border:
                              selectedColor.hex === c.hex
                                ? "2px solid #b91c1c"
                                : "1px solid #d1d5db",
                            cursor: "pointer",
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Legs Finish */}
        <div style={{ borderTop: "1px solid #e5e7eb", marginTop: 16 }}>
          <button
            onClick={() => setOpenSection(openSection === 3 ? null : 3)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              padding: "12px 0",
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 4,
                  backgroundColor: selectedLegColor.hex,
                  border: "1px solid #d1d5db",
                }}
              ></div>
              <div>
                <span style={{ fontSize, color: "#4b5563" }}>
                  3. Legs Finish
                </span>
                <p
                  style={{
                    fontSize,
                    color: "#6b7280",
                    margin: 0,
                  }}
                >
                  {selectedLegColor.name}
                </p>
              </div>
            </div>
            {openSection === 3 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {openSection === 3 && (
            <div
              style={{
                paddingTop: 12,
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedLegColor(color)}
                  style={{
                    backgroundColor: color.hex,
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    border:
                      selectedLegColor.hex === color.hex
                        ? "2px solid #b91c1c"
                        : "1px solid #d1d5db",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div style={footerStyle}>
          <div>
            <span style={{ color: "#4b5563", fontSize }}>Product Price</span>
            <div>
              <span
                style={{
                  fontSize: fontSize + 10,
                  fontWeight: "700",
                  color: "#111827",
                  marginRight: "8px",
                }}
              >
                $200
              </span>
              <span
                style={{
                  fontSize,
                  color: "#9ca3af",
                  textDecoration: "line-through",
                }}
              >
                $245
              </span>
            </div>
          </div>
          <div style={buttonContainerStyle}>
            <button style={btnStyle}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
