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

// iPhone-ish dimensions (you can change these values if you prefer a different model)
const IPHONE_W = 390;
const IPHONE_H = 844;

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
    layoutVariant,
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

  // Small alignment mapping (same as previous)
  let justify = "flex-start";
  if (galleryAlign === "grid-center") justify = "center";
  if (galleryAlign === "grid-right") justify = "flex-end";

  // Compute heights: top image ~30% of phone height
  const imageAreaHeight = Math.round(IPHONE_H * 0.30); // ~30%
  const bottomAreaHeight = IPHONE_H - imageAreaHeight;

  // base styles for the iPhone preview "device" container
  const deviceStyle = {
    width: IPHONE_W,
    height: IPHONE_H,
    borderRadius: 32,
    padding: 12,
    background: "#f8fafc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    // subtle device border
    boxShadow: "0 10px 30px rgba(2,6,23,0.12)",
  };

  // inside the device we render the card area which uses user's store values
  const cardInnerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: Math.max(8, cardRadius),
    overflow: "hidden",
    boxSizing: "border-box",
    background: sectionBg,
    border: `${strokeWeight}px solid ${strokeColor}`,
    display: "flex",
    flexDirection: "column",
    fontFamily,
    fontWeight,
    color: "#222",
  };

  // Top image container (fixed height)
  const topImageWrapper = {
    height: imageAreaHeight,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    padding: containerPadding / 2,
    boxSizing: "border-box",
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.06), transparent)", // slight separation
  };

  const mainImageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: Math.max(8, cardRadius - 8),
    display: "block",
  };

  // Bottom area holds sidebar / controls; scrollable if content overflows
  const bottomAreaStyle = {
    height: bottomAreaHeight,
    width: "100%",
    boxSizing: "border-box",
    padding: containerPadding,
    overflowY: "auto",
    background: "#fff",
    // For a little card feel:
    borderTop: "1px solid rgba(0,0,0,0.04)",
  };

  // For layoutVariant: variantA -> bottom stacked sidebar (single column)
  // variantB -> bottom splits into content + right sidebar columns (mimic desktop right section)
  const bottomInnerStyle =
    layoutVariant === "variantB"
      ? {
          display: "grid",
          gridTemplateColumns: "1fr 120px",
          gap: 12,
          alignItems: "start",
        }
      : {
          display: "block",
        };

  const primaryColumnStyle = {
    // when variantB this is the left content area,
    // when variantA this is the full stacked content
  };

  const sidebarColumnStyle =
    layoutVariant === "variantB"
      ? {
          width: "120px",
          boxSizing: "border-box",
        }
      : {
          width: "100%",
        };

  // Thumbnails: overlayed inside top image on the left vertically or bottom horizontal if not enough height
  const thumbColumnStyle = {
    position: "absolute",
    left: justify === "center" ? "50%" : justify === "flex-end" ? "auto" : 12,
    right: justify === "flex-end" ? 12 : "auto",
    top: "50%",
    transform: justify === "center" ? "translate(-50%, -50%)" : "translateY(-50%)",
    display: "flex",
    flexDirection: "column",
    gap: `${gallerySpacing}px`,
    justifyContent: justify,
    alignItems: "center",
    zIndex: 5,
  };

  const thumbBase = {
    width: 44,
    height: 44,
    objectFit: "cover",
    borderRadius: imageRadius,
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
    transition: "all 0.15s ease",
  };

  const btnStyle = {
    background: btnBg,
    color: btnText,
    borderRadius: btnBorderRadius + "px",
    boxShadow: shadowMap[btnShadow] || shadowMap.none,
    padding: "10px 12px",
    border: "none",
    cursor: "pointer",
    fontSize: Math.max(11, fontSize - 4) + "px",
    transition: "all 0.2s ease-in-out",
  };

  // Keep footer and button container styles compact for phone
  const footerStyle = {
    marginTop: 12,
    paddingTop: 12,
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
    marginLeft: "8px",
  };

  // Render
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 12 }}>
      <div style={deviceStyle} aria-label="iPhone preview">
        <div style={cardInnerStyle}>
          {/* TOP: image area (~30% height) */}
          <div style={topImageWrapper}>
            <img src={furnitureMain} alt="Product" style={mainImageStyle} />

            {/* thumbnails overlayed on the left/center/right of the image */}
            {/* single "folder" thumbnail (stacked look + count badge) */}
<div
  style={{
    position: "absolute",
    left: justify === "center" ? "50%" : justify === "flex-end" ? "auto" : 12,
    right: justify === "flex-end" ? 12 : "auto",
    top: "10%",
    transform: justify === "center" ? "translate(-50%, -50%)" : "translateY(-50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    zIndex: 6,
    cursor: "pointer",
  }}
  onClick={() => setSelectedThumb(0)}
  title={`View ${thumbs.length} images`}
>
  {/* stacked / folder effect: three slightly offset miniature images */}
  <div
    style={{
      position: "absolute",
      width: 52,
      height: 40,
      borderRadius: Math.max(4, imageRadius - 4),
      transform: "translate(-6px, -6px) rotate(-4deg)",
      overflow: "hidden",
      boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
      border: "1px solid rgba(0,0,0,0.06)",
      backgroundImage: `url(${cards})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  />
  <div
    style={{
      position: "absolute",
      width: 52,
      height: 40,
      borderRadius: Math.max(4, imageRadius - 2),
      transform: "translate(0px, -3px) rotate(-2deg)",
      overflow: "hidden",
      boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
      border: "1px solid rgba(0,0,0,0.06)",
      backgroundImage: `url(${cards})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  />
  <div
    style={{
      position: "relative",
      width: 52,
      height: 40,
      borderRadius: imageRadius,
      overflow: "hidden",
      boxShadow:
        selectedThumb === 0
          ? "0 6px 14px rgba(0,0,0,0.18)"
          : "0 2px 6px rgba(0,0,0,0.06)",
      border:
        selectedThumb === 0 ? "2px solid rgba(0,0,0,0.85)" : "1px solid rgba(0,0,0,0.08)",
      backgroundImage: `url(${cards})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  />

  {/* count badge */}
  <div
    style={{
      position: "absolute",
      right: -6,
      bottom: -6,
      minWidth: 20,
      height: 20,
      borderRadius: 10,
      padding: "0 6px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(0,0,0,0.8)",
      color: "#fff",
      fontSize: 11,
      fontWeight: 600,
      boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
    }}
  >
    {thumbs.length}
  </div>
</div>
          </div>

          {/* BOTTOM: sidebar / controls (~70%) */}
          <div style={bottomAreaStyle}>
            <div style={bottomInnerStyle}>
              {/* Primary content column */}
              <div style={primaryColumnStyle}>
                <h1
                  style={{
                    fontFamily,
                    fontWeight,
                    fontSize: fontSize + 6,
                    textAlign: "left",
                    color: "#1f2937",
                    margin: 0,
                    marginBottom: 6,
                  }}
                >
                  Cozy Lounge Chair
                </h1>
                <p
                  style={{
                    fontSize,
                    color: "#6b7280",
                    marginTop: 4,
                    marginBottom: 12,
                  }}
                >
                  Customize your Chair
                </p>

                {/* Arms Section */}
                <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 8 }}>
                  <button
                    onClick={() => setOpenSection(openSection === 1 ? null : 1)}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      padding: "8px 0",
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <img
                        src={armsImage}
                        alt="Arm"
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 4,
                          border: "1px solid #d1d5db",
                          objectFit: "cover",
                        }}
                      />
                      <span style={{ fontSize, color: "#4b5563" }}>1. Arms</span>
                    </div>
                    {openSection === 1 ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>

                  {openSection === 1 && (
                    <div
                      style={{
                        paddingTop: 8,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 8,
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
                                selectedArm === index ? "2px solid #b91c1c" : "1px solid #d1d5db",
                              borderRadius: 4,
                              padding: 4,
                              background: "none",
                              cursor: "pointer",
                            }}
                          >
                            <img
                              src={armsImage}
                              alt={`Arm ${index + 1}`}
                              style={{ width: 44, height: 44, display: "block" }}
                            />
                          </button>
                        ))}
                    </div>
                  )}
                </div>

                {/* Arms Finish */}
                <div style={{ borderTop: "1px solid #e5e7eb", marginTop: 12, paddingTop: 8 }}>
                  <button
                    onClick={() => setOpenSection(openSection === 2 ? null : 2)}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      padding: "8px 0",
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 4,
                          backgroundColor: selectedColor.hex,
                          border: "1px solid #d1d5db",
                        }}
                      ></div>
                      <div>
                        <span style={{ fontSize, color: "#4b5563" }}>2. Arms Finish</span>
                        <p style={{ fontSize, color: "#6b7280", margin: 0 }}>
                          {selectedColor.name}
                        </p>
                      </div>
                    </div>
                    {openSection === 2 ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>

                  {openSection === 2 && (
                    <div style={{ paddingTop: 8 }}>
                      {["LEATHER", "STEEL", "ALUMINUM"].map((mat) => (
                        <div key={mat} style={{ marginBottom: 8 }}>
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
                            {openMaterial === mat ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>

                          {openMaterial === mat && (
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 6 }}>
                              {colors.map((c) => (
                                <button
                                  key={c.name}
                                  onClick={() => setSelectedColor(c)}
                                  style={{
                                    backgroundColor: c.hex,
                                    width: 30,
                                    height: 30,
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
                <div style={{ borderTop: "1px solid #e5e7eb", marginTop: 12, paddingTop: 8 }}>
                  <button
                    onClick={() => setOpenSection(openSection === 3 ? null : 3)}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      padding: "8px 0",
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 4,
                          backgroundColor: selectedLegColor.hex,
                          border: "1px solid #d1d5db",
                        }}
                      ></div>
                      <div>
                        <span style={{ fontSize, color: "#4b5563" }}>3. Legs Finish</span>
                        <p style={{ fontSize, color: "#6b7280", margin: 0 }}>
                          {selectedLegColor.name}
                        </p>
                      </div>
                    </div>
                    {openSection === 3 ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>

                  {openSection === 3 && (
                    <div style={{ paddingTop: 8, display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedLegColor(color)}
                          style={{
                            backgroundColor: color.hex,
                            width: 30,
                            height: 30,
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

                {/* footer */}
                <div style={footerStyle}>
                  <div>
                    <span style={{ color: "#4b5563", fontSize }}>Product Price</span>
                    <div>
                      <span
                        style={{
                          fontSize: fontSize + 8,
                          fontWeight: "700",
                          color: "#111827",
                          marginRight: "6px",
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

              {/* Sidebar column (either right column in variantB or stacked below in variantA) */}
              <div style={sidebarColumnStyle}>
                {/* repeat compact info or controls you want here — currently we keep the same controls compact */}
                {/* Keeping this area intentionally minimal since main controls are above; you can replicate content if desired */}
                <div style={{ marginTop: 8 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
