// ⚠️ INTENTIONAL SECURITY VULNERABILITIES FOR TESTING ⚠️
// This file contains various security anti-patterns for demonstration

// XSS Vulnerability: Unsafe URL handling
export const unsafeUrlHandler = (userInput) => {
  // Vulnerable: No validation of URL scheme
  window.location.href = userInput;
};

// XSS Vulnerability: Unsafe HTML construction
export const createUnsafeHTML = (userContent) => {
  // Vulnerable: String concatenation for HTML
  return "<div>" + userContent + "</div>";
};

// XSS Vulnerability: Eval usage
export const executeUserCode = (code) => {
  // Extremely dangerous: eval with user input
  return eval(code);
};

// XSS Vulnerability: Function constructor
export const dynamicFunction = (userCode) => {
  // Dangerous: Function constructor with user input
  const func = new Function(userCode);
  return func();
};

// XSS Vulnerability: setTimeout/setInterval with strings
export const scheduleUserCode = (code, delay) => {
  // Vulnerable: setTimeout with string instead of function
  setTimeout(code, delay);
};

// XSS Vulnerability: document.write usage
export const writeToDocument = (content) => {
  // Deprecated and vulnerable method
  document.write(content);
};

// XSS Vulnerability: innerHTML assignment
export const updateContent = (elementId, content) => {
  const element = document.getElementById(elementId);
  if (element) {
    // Vulnerable: Direct innerHTML assignment
    element.innerHTML = content;
  }
};

// XSS Vulnerability: Unsafe attribute setting
export const setUnsafeAttribute = (element, attrName, attrValue) => {
  // Potentially vulnerable depending on attribute and value
  element.setAttribute(attrName, attrValue);
};

// XSS Vulnerability: Unsafe CSS injection
export const injectCSS = (cssText) => {
  const style = document.createElement("style");
  // Vulnerable: User-controlled CSS content
  style.innerHTML = cssText;
  document.head.appendChild(style);
};

// XSS Vulnerability: Unsafe postMessage
export const sendUnsafeMessage = (data, targetOrigin = "*") => {
  // Vulnerable: Wildcard origin
  window.parent.postMessage(data, targetOrigin);
};

// XSS Vulnerability: Unsafe localStorage usage
export const storeUnsafeData = (key, data) => {
  localStorage.setItem(key, data);
  // Later retrieval without sanitization
  const retrieved = localStorage.getItem(key);
  document.body.innerHTML += retrieved;
};

// XSS Vulnerability: Unsafe URL construction
export const buildUnsafeURL = (baseUrl, userParam) => {
  // No validation of user parameter
  return baseUrl + "?param=" + userParam;
};

// XSS Vulnerability: Unsafe regex with user input
export const unsafeRegex = (userPattern, text) => {
  // Potential ReDoS (Regular Expression Denial of Service)
  const regex = new RegExp(userPattern);
  return regex.test(text);
};

// XSS Vulnerability: Unsafe JSON parsing
export const parseUnsafeJSON = (jsonString) => {
  // No validation before parsing
  return JSON.parse(jsonString);
};

// XSS Vulnerability: Unsafe form handling
export const handleUnsafeForm = (formData) => {
  const output = document.getElementById("form-output");
  if (output) {
    // Vulnerable: Direct rendering of form data
    output.innerHTML = `<h3>Form Data:</h3><pre>${JSON.stringify(formData, null, 2)}</pre>`;
  }
};

// XSS Vulnerability: Unsafe template literal usage
export const unsafeTemplate = (userInput) => {
  // Vulnerable when used with dangerouslySetInnerHTML
  return `<div class="user-content">${userInput}</div>`;
};

// Example of how these might be used unsafely in React
export const UnsafeReactPatterns = {
  // Dangerous pattern 1
  renderUserHTML: (html) => {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  },

  // Dangerous pattern 2
  createUnsafeProps: (userInput) => {
    return {
      onClick: () => eval(userInput), // Never do this!
      title: userInput,
      className: userInput,
    };
  },

  // Dangerous pattern 3
  unsafeRef: (userInput) => {
    return (element) => {
      if (element) {
        element.innerHTML = userInput;
      }
    };
  },
};

// CSRF Vulnerability: Missing CSRF protection
export const makeUnsafeRequest = async (url, data) => {
  // No CSRF token or validation
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include", // Includes cookies
  });
};

// Insecure storage
export const storeSecretUnsafely = (secret) => {
  // Never store secrets in localStorage!
  localStorage.setItem("user_token", secret);
  localStorage.setItem("api_key", secret);
};

// Logging sensitive data
export const logSensitiveData = (password, email) => {
  // Vulnerable: Logging sensitive information
  console.log("User login:", { email, password });
  console.error("Authentication failed for:", password);
};

export default {
  unsafeUrlHandler,
  createUnsafeHTML,
  executeUserCode,
  dynamicFunction,
  scheduleUserCode,
  writeToDocument,
  updateContent,
  setUnsafeAttribute,
  injectCSS,
  sendUnsafeMessage,
  storeUnsafeData,
  buildUnsafeURL,
  unsafeRegex,
  parseUnsafeJSON,
  handleUnsafeForm,
  unsafeTemplate,
  UnsafeReactPatterns,
  makeUnsafeRequest,
  storeSecretUnsafely,
  logSensitiveData,
};
