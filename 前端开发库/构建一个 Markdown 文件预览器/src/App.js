import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import './App.css';

function App() {
  const [markdown, setMarkdown] = useState('');

  // 默认的 Markdown 内容，包含所有必需的元素
  const defaultMarkdown = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Here's some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And ~~feel free to go crazy~~ crossing stuff out.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)`;

  useEffect(() => {
    setMarkdown(defaultMarkdown);
  }, []);

  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  // 配置 marked 选项
  marked.setOptions({
    breaks: true, // 将换行符转换为 <br> 标签
    gfm: true, // 启用 GitHub 风格的 Markdown
  });

  // 将 Markdown 转换为 HTML 并清理
  const createMarkup = () => {
    const rawMarkup = marked(markdown);
    const cleanMarkup = DOMPurify.sanitize(rawMarkup);
    return { __html: cleanMarkup };
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Markdown Previewer</h1>
        <div className="editor-container">
          <div className="editor-wrapper">
            <h3 className="editor-title">Editor</h3>
            <textarea
              id="editor"
              value={markdown}
              onChange={handleChange}
              placeholder="Enter your markdown here..."
            />
          </div>
          <div className="preview-wrapper">
            <h3 className="preview-title">Preview</h3>
            <div
              id="preview"
              className="preview"
              dangerouslySetInnerHTML={createMarkup()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
