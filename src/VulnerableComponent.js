import React, { useState, useEffect } from "react";

// ⚠️ INTENTIONAL SECURITY VULNERABILITIES FOR TESTING ⚠️
// These vulnerabilities are added for demonstration and testing purposes
// DO NOT use these patterns in production code!

const VulnerableComponent = () => {
  const [userInput, setUserInput] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [urlParam, setUrlParam] = useState("");
  const [userProfile, setUserProfile] = useState({ name: "", bio: "" });

  useEffect(() => {
    // XSS Vulnerability #1: Reading URL parameters without sanitization
    const params = new URLSearchParams(window.location.search);
    const message = params.get("message");
    if (message) {
      setUrlParam(message);
    }
  }, []);

  // XSS Vulnerability #2: dangerouslySetInnerHTML with user input
  const handleDangerousHtml = () => {
    setHtmlContent(userInput);
  };

  // XSS Vulnerability #3: Direct DOM manipulation without sanitization
  const handleDirectDom = () => {
    const element = document.getElementById("vulnerable-div");
    if (element) {
      element.innerHTML = userInput; // Vulnerable: direct innerHTML assignment
    }
  };

  // XSS Vulnerability #4: eval() with user input (extremely dangerous)
  const handleEval = () => {
    try {
      // Never do this in real code!
      eval(userInput);
    } catch (error) {
      console.log("Eval error:", error);
    }
  };

  // XSS Vulnerability #5: Creating script tags dynamically
  const handleScriptInjection = () => {
    const script = document.createElement("script");
    script.textContent = userInput;
    document.head.appendChild(script);
  };

  // XSS Vulnerability #6: URL construction without validation
  const handleRedirect = () => {
    window.location.href = userInput; // Vulnerable to javascript: URLs
  };

  // XSS Vulnerability #7: Setting href attributes with user input
  const createVulnerableLink = (url) => {
    return `<a href="${url}">Click here</a>`; // No URL validation
  };

  // XSS Vulnerability #8: innerHTML in React (rare but possible)
  const VulnerableInnerHTML = ({ content }) => {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  };

  // XSS Vulnerability #9: Window.name and postMessage vulnerabilities
  const handlePostMessage = () => {
    window.parent.postMessage(userInput, "*"); // Wildcard origin
  };

  // XSS Vulnerability #10: Local storage XSS
  const handleLocalStorage = () => {
    localStorage.setItem("userData", userInput);
    const storedData = localStorage.getItem("userData");
    document.getElementById("storage-display").innerHTML = storedData;
  };

  return (
    <div
      className="vulnerable-section"
      style={{
        background: "linear-gradient(45deg, #ff6b6b, #ffa500)",
        padding: "20px",
        margin: "20px 0",
        borderRadius: "10px",
        border: "3px solid #ff0000",
      }}
    >
      <h3>⚠️ Vulnerable Component (For Testing Only) ⚠️</h3>
      <p style={{ color: "#fff", fontWeight: "bold" }}>
        This component contains intentional XSS vulnerabilities for security scanning demonstration.
      </p>

      <div style={{ margin: "10px 0" }}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter potentially malicious content..."
          style={{ width: "300px", padding: "8px", marginRight: "10px" }}
        />
      </div>

      <div style={{ margin: "10px 0" }}>
        <button onClick={handleDangerousHtml} style={{ margin: "5px", padding: "8px 12px" }}>
          Vulnerable HTML Injection
        </button>
        <button onClick={handleDirectDom} style={{ margin: "5px", padding: "8px 12px" }}>
          DOM Manipulation XSS
        </button>
        <button onClick={handleEval} style={{ margin: "5px", padding: "8px 12px" }}>
          Eval() Vulnerability
        </button>
        <button onClick={handleScriptInjection} style={{ margin: "5px", padding: "8px 12px" }}>
          Script Injection
        </button>
        <button onClick={handleRedirect} style={{ margin: "5px", padding: "8px 12px" }}>
          Open Redirect
        </button>
        <button onClick={handlePostMessage} style={{ margin: "5px", padding: "8px 12px" }}>
          PostMessage XSS
        </button>
        <button onClick={handleLocalStorage} style={{ margin: "5px", padding: "8px 12px" }}>
          Storage XSS
        </button>
      </div>

      {/* Vulnerability #1: dangerouslySetInnerHTML */}
      <div style={{ background: "#fff", padding: "10px", margin: "10px 0", borderRadius: "5px" }}>
        <h4>HTML Content (Vulnerable):</h4>
        <VulnerableInnerHTML content={htmlContent} />
      </div>

      {/* Vulnerability #2: Direct DOM manipulation target */}
      <div id="vulnerable-div" style={{ background: "#fff", padding: "10px", margin: "10px 0", borderRadius: "5px" }}>
        <h4>DOM Manipulation Target</h4>
      </div>

      {/* Vulnerability #3: URL parameter display */}
      <div style={{ background: "#fff", padding: "10px", margin: "10px 0", borderRadius: "5px" }}>
        <h4>URL Parameter (Vulnerable):</h4>
        <div dangerouslySetInnerHTML={{ __html: urlParam }} />
      </div>

      {/* Vulnerability #4: Local storage display */}
      <div id="storage-display" style={{ background: "#fff", padding: "10px", margin: "10px 0", borderRadius: "5px" }}>
        <h4>Local Storage Content</h4>
      </div>

      {/* Vulnerability #5: Vulnerable link creation */}
      <div style={{ background: "#fff", padding: "10px", margin: "10px 0", borderRadius: "5px" }}>
        <h4>Dynamic Link (Vulnerable):</h4>
        <div dangerouslySetInnerHTML={{ __html: createVulnerableLink(userInput) }} />
      </div>

      {/* Additional vulnerable patterns */}
      <div style={{ background: "#fff", padding: "10px", margin: "10px 0", borderRadius: "5px" }}>
        <h4>More XSS Patterns:</h4>

        {/* Vulnerability #6: Unescaped user input in attributes */}
        <img
          src="invalid-image.jpg"
          alt={userInput}
          onError={() => {
            // This creates an opportunity for attribute-based XSS
            console.log("Image error with user input:", userInput);
          }}
        />

        {/* Vulnerability #7: Style injection */}
        <div
          style={{
            background: `url('${userInput}')`, // Vulnerable to CSS injection
            width: "100px",
            height: "50px",
          }}
        >
          Style Injection Test
        </div>

        {/* Vulnerability #8: Title attribute XSS */}
        <span title={userInput}>Hover for vulnerable title</span>
      </div>

      <div style={{ background: "#ffe6e6", padding: "10px", margin: "10px 0", borderRadius: "5px" }}>
        <p>
          <strong>Test Payloads to Try:</strong>
        </p>
        <ul style={{ textAlign: "left", fontSize: "12px" }}>
          <li>&lt;script&gt;alert('XSS')&lt;/script&gt;</li>
          <li>&lt;img src=x onerror=alert('XSS')&gt;</li>
          <li>javascript:alert('XSS')</li>
          <li>&lt;svg onload=alert('XSS')&gt;</li>
          <li>" onmouseover="alert('XSS')" "</li>
        </ul>
      </div>
    </div>
  );
};

export default VulnerableComponent;
