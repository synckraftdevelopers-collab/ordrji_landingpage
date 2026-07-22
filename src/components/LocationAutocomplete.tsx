"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { MapPin, X, ChevronDown, Check, Compass, Layers } from "lucide-react";
import { searchLocations, SearchResult, states, cities } from "@/data/locations";

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string, details?: SearchResult) => void;
  placeholder?: string;
  name?: string;
  required?: boolean;
  className?: string;
  inputClassName?: string;
}

export default function LocationAutocomplete({
  value,
  onChange,
  placeholder = "Search State, District or City...",
  name = "location",
  required = false,
  className = "",
  inputClassName = "",
}: LocationAutocompleteProps) {
  const [query, setQuery] = useState(value || "");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const prevValueRef = useRef(value);

  // Sync with parent value only when it actually changes
  useEffect(() => {
    if (prevValueRef.current !== value) {
      prevValueRef.current = value;
      setQuery(value || "");
    }
  }, [value]);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        // If query doesn't match selected value, reset query to selected value
        if (query !== value) {
          setQuery(value || "");
        }
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [query, value]);

  // Derive results from query directly — no effect needed
  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchLocations(query, 8);
  }, [query]);

  const handleSelect = (item: SearchResult) => {
    const displayValue = `${item.name}, ${item.stateCode}`;
    setQuery(displayValue);
    onChange(displayValue, item);
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuery("");
    onChange("");
    setActiveIndex(-1);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (results.length > 0) {
          setActiveIndex((prev) => (prev + 1) % results.length);
        } else {
          // If empty query, we might navigate default lists (but keep it simple for now)
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (results.length > 0) {
          setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
        }
        break;
      case "Enter":
        e.preventDefault();
        if (isOpen && activeIndex >= 0 && activeIndex < results.length) {
          handleSelect(results[activeIndex]);
        } else if (isOpen && !query.trim()) {
          // Just close
          setIsOpen(false);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setQuery(value || "");
        break;
      case "Tab":
        setIsOpen(false);
        break;
    }
  };

  // Helper to highlight matching text
  const highlightMatch = (text: string, match: string) => {
    if (!match.trim()) return <span>{text}</span>;
    const parts = text.split(new RegExp(`(${match.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")})`, "gi"));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === match.toLowerCase() ? (
            <strong key={index} style={{ color: "var(--accent-orange)", fontWeight: 700 }}>
              {part}
            </strong>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </span>
    );
  };

  // Filter default states and cities for quick browsing
  const defaultPopularCities = cities.filter((c) => c.isMajor).slice(0, 8);

  const citiesGroup = results.filter((c) => c.type === "city");
  const districtsGroup = results.filter((c) => c.type === "district");
  const statesGroup = results.filter((c) => c.type === "state");

  const renderItem = (item: SearchResult) => {
    const idx = results.indexOf(item);
    const isSelected = value === `${item.name}, ${item.stateCode}`;
    const isActive = idx === activeIndex;

    let Icon = MapPin;
    let iconColor = "var(--accent-orange)";
    let badgeBg = "rgba(227,6,19,0.06)";
    let badgeColor = "var(--accent-orange)";

    if (item.type === "district") {
      Icon = Compass;
      iconColor = "var(--accent-blue, #0284c7)";
      badgeBg = "rgba(2,132,199,0.08)";
      badgeColor = "var(--accent-blue, #0284c7)";
    } else if (item.type === "state") {
      Icon = Layers;
      iconColor = "var(--accent-purple, #7c3aed)";
      badgeBg = "rgba(124,58,237,0.08)";
      badgeColor = "var(--accent-purple, #7c3aed)";
    }

    return (
      <li
        key={`${item.type}-${item.slug}`}
        onClick={() => handleSelect(item)}
        onMouseEnter={() => setActiveIndex(idx)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.6rem 0.8rem",
          borderRadius: "8px",
          cursor: "pointer",
          background: isActive
            ? "rgba(227,6,19,0.05)"
            : isSelected
            ? "rgba(227,6,19,0.03)"
            : "transparent",
          transition: "background 0.15s ease",
          marginBottom: "2px"
        }}
        className="autocomplete-li-item"
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", minWidth: 0, flex: 1 }}>
          <Icon size={15} style={{ color: iconColor, flexShrink: 0 }} />
          <div style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {highlightMatch(item.name, query)}
            </span>
            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.subtext}</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
          <span
            style={{
              fontSize: "0.6rem",
              fontWeight: 800,
              textTransform: "uppercase",
              padding: "0.15rem 0.4rem",
              borderRadius: "4px",
              background: badgeBg,
              color: badgeColor,
            }}
          >
            {item.type}
          </span>
          {isSelected && <Check size={14} style={{ color: "var(--accent-orange)" }} />}
        </div>
      </li>
    );
  };

  return (
    <div className={`location-autocomplete-container ${className}`} ref={containerRef} style={{ position: "relative", width: "100%" }}>
      <div style={{ position: "relative", width: "100%" }}>
        <input
          ref={inputRef}
          type="text"
          name={name}
          required={required}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`${inputClassName || "field-input"} autocomplete-input`}
          autoComplete="off"
          style={{ paddingRight: "2.5rem" }}
        />
        
        <div style={{ position: "absolute", right: "0.85rem", top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", gap: "0.35rem", pointerEvents: "auto", color: "var(--text-muted)" }}>
          {query && (
            <button
              type="button"
              onClick={handleClear}
              style={{ background: "none", border: "none", padding: 2, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", borderRadius: "50%" }}
              className="clear-btn"
            >
              <X size={14} />
            </button>
          )}
          <ChevronDown size={16} style={{ transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "none", color: "var(--text-muted)" }} />
        </div>
      </div>

      {isOpen && (
        <div
          className="autocomplete-dropdown"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            marginTop: "0.35rem",
            background: "var(--bg-card, #fff)",
            border: "1px solid var(--border-color, #e0e0e0)",
            borderRadius: "12px",
            boxShadow: "0 14px 35px rgba(0, 0, 0, 0.16)",
            zIndex: 9999,
            maxHeight: "350px",
            overflowY: "auto",
          }}
        >
          {query.trim() ? (
            // Search Results grouped visually
            <div style={{ padding: "0.4rem" }}>
              {results.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {/* Cities Group */}
                  {citiesGroup.length > 0 && (
                    <div>
                      <div className="autocomplete-group-header">Cities</div>
                      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                        {citiesGroup.map((item) => renderItem(item))}
                      </ul>
                    </div>
                  )}

                  {/* Districts Group */}
                  {districtsGroup.length > 0 && (
                    <div>
                      <div className="autocomplete-group-header">Districts</div>
                      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                        {districtsGroup.map((item) => renderItem(item))}
                      </ul>
                    </div>
                  )}

                  {/* States Group */}
                  {statesGroup.length > 0 && (
                    <div>
                      <div className="autocomplete-group-header">States & Union Territories</div>
                      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                        {statesGroup.map((item) => renderItem(item))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ padding: "1.5rem 1rem", textAlign: "center", color: "var(--text-muted)" }}>
                  <MapPin size={24} style={{ margin: "0 auto 0.5rem", opacity: 0.5, color: "var(--accent-orange)" }} />
                  <p style={{ fontSize: "0.9rem", fontWeight: 500, margin: 0 }}>No matches found</p>
                  <p style={{ fontSize: "0.75rem", margin: "0.25rem 0 0" }}>Try checking your spelling or search another city/state</p>
                </div>
              )}
            </div>
          ) : (
            // Default Browsing Menu
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", padding: "1rem" }}>
              <div>
                <h5 style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 0.5rem" }}>
                  Popular Cities
                </h5>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem" }}>
                  {defaultPopularCities.map((city) => (
                    <div
                      key={city.id}
                      onClick={() =>
                        handleSelect({
                          type: "city",
                          name: city.name,
                          slug: city.slug,
                          subtext: `City in ${city.stateCode}`,
                          stateCode: city.stateCode,
                          item: city,
                        })
                      }
                      style={{
                        padding: "0.45rem 0.6rem",
                        borderRadius: "6px",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        background: "var(--bg-primary)",
                        color: "var(--text-secondary)",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        transition: "all 0.15s ease",
                      }}
                      className="popular-city-pill"
                    >
                      <MapPin size={11} style={{ color: "var(--accent-orange)" }} />
                      <span>{city.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "0.75rem" }}>
                <h5 style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 0.5rem" }}>
                  Browse States & UTs
                </h5>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem", maxHeight: "120px", overflowY: "auto" }}>
                  {states.map((state) => (
                    <div
                      key={state.id}
                      onClick={() =>
                        handleSelect({
                          type: "state",
                          name: state.name,
                          slug: state.slug,
                          subtext: state.type === "ut" ? "Union Territory" : "State",
                          stateCode: state.code,
                          item: state,
                        })
                      }
                      style={{
                        padding: "0.4rem 0.6rem",
                        borderRadius: "6px",
                        fontSize: "0.8rem",
                        fontWeight: 500,
                        cursor: "pointer",
                        color: "var(--text-primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        transition: "all 0.15s ease",
                      }}
                      className="state-browse-item"
                    >
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{state.name}</span>
                      <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontWeight: 700 }}>{state.code}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <style jsx global>{`
        .autocomplete-dropdown {
          animation: autocompSlide 0.22s cubic-bezier(0.16, 1, 0.3, 1) both;
          border-color: var(--border-color) !important;
          background: #fdfaf4 !important;
          z-index: 9999 !important;
          width: 100% !important;
          max-width: 100% !important;
          box-sizing: border-box !important;
        }
        @keyframes autocompSlide {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .autocomplete-group-header {
          font-size: 0.65rem;
          font-weight: 800;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.8px;
          padding: 0.5rem 0.8rem 0.3rem;
          border-bottom: 1px solid rgba(0,0,0,0.03);
          margin-bottom: 0.35rem;
        }
        .popular-city-pill:hover {
          background: rgba(227, 6, 19, 0.08) !important;
          color: var(--accent-orange) !important;
        }
        .state-browse-item:hover {
          background: var(--bg-primary) !important;
          color: var(--accent-orange) !important;
        }
        .clear-btn:hover {
          background: rgba(0, 0, 0, 0.05) !important;
          color: var(--text-primary) !important;
        }
      `}</style>
    </div>
  );
}
