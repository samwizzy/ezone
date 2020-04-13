import React, { useRef } from "react";

export default function RefImage() {
  const handleChange = (ev) => {
    console.log(ev.target, "ev target")
    console.log(this.imgInput.value, "this.imgInput")
  }

  const inputEl = useRef(null);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <input type="file" accept="image/*" multiple autoComplete="off" tabIndex="-1" ref={inputEl} onChange={handleChange} />
    </div>
  );
}