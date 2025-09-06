import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import axios from "axios";
import Markdown from "react-markdown";
import "./App.css";

function App() {
  const [code, setCode] = useState(`function sum(){
  return 1+1
}`);

  const [review, setReview] = useState("");

  useEffect(() => {
    prism.highlightAll();
  });

  async function reviewCode() {
    try {
      const response = await axios.post("http://localhost:3000/ai/get-review", { code });
      setReview(response.data);
    } catch (err) {
      console.error(err);
      setReview("⚠️ Error fetching review");
    }
  }

  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              backgroundColor: "#1e1e1e",
              color: "#fff",
              borderRadius: "8px",
              height: "100%",
              width: "100%",
            }}
          />
        </div>
        <div className="review-btn" onClick={reviewCode}>
          Review
        </div>
      </div>

      <div className="right">
        <Markdown>{review}</Markdown>
      </div>
    </main>
  );
}

export default App;

