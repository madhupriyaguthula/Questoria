export const worlds = [
  {
    id: 1,
    title: "World 1: HTML Mastery",
    pathId: "frontend",
    isMiniProject: false,
    isBossWorld: false,
    questBrief: {
      objectives: [
        "Understand HTML tags and document structure",
        "Master links, lists, tables, and forms",
        "Write semantic, accessible, and responsive HTML",
      ],
      resourceLabel: "MDN Web Docs — HTML Basics",
      resourceUrl: "https://developer.mozilla.org/en-US/docs/Web/HTML",
      estTime: "45 min",
      difficulty: "Easy",
    },
    storyDialogue: [
      { speaker: "Owl", text: "Welcome, traveler. You stand at the gates of the Front-End Sanctuary." },
      { speaker: "Owl", text: "Before you can craft visual magic, you must master the structural bones: HTML." },
      { speaker: "Player", text: "I am ready to learn the structural ruins." },
    ],
    learningContent: [
      // MODULE 1
      {
        id: "t1",
        module: "M1: HTML Intro & Web Basics",
        title: "Introduction to HTML",
        content: "HTML (HyperText Markup Language) is the absolute foundation of all web development. It is the language used to structure and display content on the internet, from simple paragraphs to complex web application layouts. By using tags, HTML tells the browser exactly what kind of content is on the screen, whether it is a heading, an image, a link, or a form. Every single page you visit on the web has an HTML backbone underneath it, making it the most critical skill for any front-end developer to master.",
        code: "<h1>Hello, World!</h1>\n<p>This is a paragraph.</p>",
        subtopics: [
          { heading: "Is HTML a programming language?", content: "No, HTML is a markup language, not a programming language. It does not have programming logic, variables, or functions. Its sole purpose is to 'mark up' plain text so that web browsers (like Chrome or Safari) understand how to organize and render the content on the screen. It describes the structure, not the behavior." },
          { heading: "What is a markup tag?", content: "A markup tag is a keyword enclosed in angle brackets, such as <p> or <h1>. Tags usually come in pairs: an opening tag to start the element, and a closing tag (which contains a forward slash like </p>) to signal the end of the element. The browser parses these tags to draw the corresponding elements on your screen." }
        ]
      },
      {
        id: "t2",
        module: "M1: HTML Intro & Web Basics",
        title: "History of HTML",
        content: "HTML was first created by Tim Berners-Lee in 1991 while working at CERN. He wanted a way for scientists to share research documents easily over the internet. Since then, HTML has gone through several major versions. HTML 2.0 was defined in 1995, followed by HTML 3.2, 4.01, and eventually XHTML. In 2014, the W3C published the HTML5 specification, bringing massive improvements like native media players, modern APIs, and clearer semantic elements.",
        code: "<!-- HTML5 doctype declaration -->\n<!DOCTYPE html>",
        subtopics: [
          { heading: "HTML5 evolution", content: "HTML5 represents the modern standard of the web. It introduced native support for audio (<audio>) and video (<video>) tags, removing the need for third-party plugins like Adobe Flash. It also brought in new semantic section elements like <header>, <nav>, <main>, and <footer> to make code cleaner." },
          { heading: "W3C and WHATWG", content: "Originally, the World Wide Web Consortium (W3C) managed the official standards. Over time, the Web Hypertext Application Technology Working Group (WHATWG) was formed to create a 'Living Standard' version of HTML. Today, WHATWG drives the continuous updates and features added to HTML to match modern browser capabilities." }
        ]
      },
      {
        id: "t3",
        module: "M1: HTML Intro & Web Basics",
        title: "How the Web Works",
        content: "When you type a URL into a browser, a complex request-response cycle begins. Your browser acts as a client, sending an HTTP request over the internet to a server where the website is hosted. The server processes this request, locates the requested files, and sends them back as a response. The browser then reads, parses, and executes these files (HTML, CSS, JavaScript) to construct the document object model and paint the pixels on your screen.",
        code: "Browser Request -> DNS Lookup -> Server Response (HTML/CSS/JS) -> Browser Rendering",
        subtopics: [
          { heading: "HTML, CSS, and JS relationship", content: "To build a modern website, you need three core technologies. HTML builds the skeleton (the paragraphs, forms, and layout blocks). CSS acts as the presentation layer, defining colors, margins, fonts, and responsive grid layouts. JavaScript acts as the interactive engine, handling logic, user clicks, and dynamic calculations." },
          { heading: "Client-side rendering", content: "The web browser does the final layout painting (rendering) locally on your device based on code sent by the server. The browser engine parses the HTML tags into the DOM (Document Object Model) and matches it with the CSS stylesheet rules to draw the layout on the screen." }
        ]
      },
      // MODULE 2
      {
        id: "t4",
        module: "M2: Document Structure & Tags",
        title: "HTML Document Structure",
        content: "Every valid HTML document must follow a precise structural template. The file must begin with a doctype declaration, followed by the main HTML element. Inside the HTML element, the document is split into two primary child sections: the head (<head>) and the body (<body>). The head contains technical data about the page, while the body holds everything that users actually interact with.",
        code: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Document Title</title>\n</head>\n<body>\n  <h1>Welcome</h1>\n</body>\n</html>",
        subtopics: [
          { heading: "What is the DOCTYPE?", content: "The <!DOCTYPE html> declaration is the very first line of code in an HTML file. It tells the browser that the page is written in modern HTML5. This prevents the browser from falling back into 'quirks mode', which is an old rendering style used for older, non-compliant websites from the 1990s." },
          { heading: "The role of Head vs Body", content: "The <head> element is a container for metadata (data about data). It includes page titles, character encodings, viewport scales, SEO keywords, and links to external CSS files. None of the head content is visible on the web page itself. The <body> element holds visible text, images, and buttons." }
        ]
      },
      {
        id: "t5",
        module: "M2: Document Structure & Tags",
        title: "Elements, Tags and Attributes",
        content: "Understanding the difference between elements, tags, and attributes is crucial for clean coding. An HTML element represents a complete building block of a page. It is defined by an opening tag, the inner content, and a closing tag. Attributes provide additional configuration parameters for elements and are always written inside the opening tag as key-value pairs.",
        code: "<a href=\"https://google.com\" target=\"_blank\" class=\"gold-link\">Google</a>",
        subtopics: [
          { heading: "Nested elements", content: "HTML documents are hierarchical trees. Elements can be nested inside other elements. For example, you can nest a strong tag (<strong>) inside a paragraph tag (<p>). It is critical to close nested tags in the exact reverse order that they were opened, otherwise the browser might render the layout incorrectly." },
          { heading: "Empty/Self-closing tags", content: "While most elements require an opening and closing tag to wrap content, some elements are self-closing because they don't contain any nested text. Examples include the line break tag (<br>), the image tag (<img>), and the input tag (<input>). In modern HTML5, a trailing slash is optional." }
        ]
      },
      // MODULE 3
      {
        id: "t6",
        module: "M3: Text & Formatting",
        title: "Headings and Paragraphs",
        content: "Text content in HTML is organized using headings and paragraphs to provide semantic structure. HTML provides six levels of headings, ranging from <h1> (the most important) down to <h6> (the least important). Paragraphs are created using the <p> tag, which is a block-level element that automatically starts on a new line and receives default browser margins above and below it.",
        code: "<h1>Main Topic</h1>\n<h2>Sub-section</h2>\n<p>This is a detailed paragraph explaining the main topic.</p>",
        subtopics: [
          { heading: "Heading hierarchy", content: "Heading levels should follow a strict outline order. The <h1> tag should represent the primary title of the page (only one per page). <h2> tags should mark main sections, while <h3> tags represent sub-sections. Skipping heading levels (like jumping from h1 to h4) breaks page accessibility structure." },
          { heading: "Default margins and spacing", content: "Web browsers apply default styling rules (user agent stylesheets) to elements. Headings and paragraphs automatically receive vertical margins (empty spacing) to separate them. You can customize, reduce, or remove these spacing behaviors later using CSS margin properties." }
        ]
      },
      {
        id: "t7",
        module: "M3: Text & Formatting",
        title: "Text Formatting Tags",
        content: "HTML includes a variety of inline formatting tags to emphasize text within paragraphs. Using formatting tags, you can make text bold, italic, highlighted, small, superscripted, or subscripted. Selecting the correct formatting tag is important because it changes how screen readers and search engines interpret the weight and meaning of your text.",
        code: "Use <strong>bold emphasis</strong> and <em>italic stress</em> to guide the reader's eye.",
        subtopics: [
          { heading: "Bold vs Strong", content: "The <b> tag makes text bold for purely decorative reasons. The <strong> tag also makes text bold, but it carries a semantic meaning of high importance. Screen readers will read text inside a strong tag with a different emphasis tone, and search engines prioritize strong keywords." },
          { heading: "Italics vs Emphasis", content: "The <i> tag formats text in italics for decorative styling. The <em> tag stands for emphasis, indicating that the word should be verbally stressed when spoken. Always prefer <strong> and <em> over <b> and <i> for modern, accessible web development." }
        ]
      },
      {
        id: "t8",
        module: "M3: Text & Formatting",
        title: "HTML Comments",
        content: "HTML comments allow developers to write internal notes directly inside the source code. Comments are completely ignored by the web browser when rendering the webpage, meaning they are invisible to standard site visitors. They are essential for organizing complex, long HTML documents, explaining section structures, and debugging buggy code blocks.",
        code: "<!-- This is a comment. It won't render on the screen. -->\n<p>Visible paragraph</p>",
        subtopics: [
          { heading: "Debugging with comments", content: "If you have a rendering bug or a broken element, you can temporarily 'comment out' a block of HTML code by wrapping it in comment brackets. This prevents the browser from rendering it, allowing you to test if the rest of the layout displays correctly without deleting code." },
          { heading: "Security warning", content: "Even though comments are not painted on the browser window, they are still sent to the client. Any user can right-click the page and select 'View Source' to read every comment. Never place private keys, passwords, developer names, or sensitive server details in comments." }
        ]
      },
      // MODULE 4
      {
        id: "t9",
        module: "M4: Links, Images & Media",
        title: "Links (Anchors)",
        content: "Hyperlinks are the glue that holds the web together, allowing users to jump from one page to another. In HTML, links are created using the anchor tag (<a>). The most important attribute of the anchor tag is 'href', which specifies the target web address or file path. You can link to external websites, internal files, email addresses, or specific section IDs on the same page.",
        code: "<a href=\"https://google.com\" target=\"_blank\" rel=\"noopener\">Visit Google</a>",
        subtopics: [
          { heading: "Absolute vs Relative paths", content: "Absolute paths specify the complete URL, including the protocol (e.g., https://site.com/page). They are used to link to external websites. Relative paths point to files within the same folder structure (e.g., about.html or images/logo.png), making the code portable." },
          { heading: "The target attribute", content: "By default, links open in the same browser tab, replacing the current page. By adding target='_blank', you force the browser to open the link in a new tab. When using target='_blank', always add rel='noopener' or rel='noreferrer' to prevent security vulnerabilities." }
        ]
      },
      {
        id: "t10",
        module: "M4: Links, Images & Media",
        title: "Images in HTML",
        content: "Images make webpages visually engaging. To display an image, HTML uses the <img> tag. The <img> tag is an empty/self-closing element that requires the 'src' attribute to locate the image file. It also requires the 'alt' attribute to provide a textual alternative of the image for screen readers and search engines.",
        code: "<img src=\"assets/hero.png\" alt=\"Knight standing in front of castle\" width=\"300\" />",
        subtopics: [
          { heading: "Why is alt text mandatory?", content: "The alt attribute is critical for two reasons: accessibility and image indexing. If a visually impaired user visits your site, their screen reader will read the alt text aloud. If the image path is broken or the network is slow, the alt text displays on screen in place of the missing picture." },
          { heading: "Supported image formats", content: "Web developers use various formats. JPEG is ideal for complex photographs. PNG is perfect for transparent graphic overlays. SVG is a vector format that scales infinitely without losing sharpness. WebP is a modern compressed format that loads much faster than PNG or JPEG." }
        ]
      },
      {
        id: "t11",
        module: "M4: Links, Images & Media",
        title: "Multimedia & Iframes",
        content: "Modern HTML5 provides native elements to embed audio, video, and external webpages directly without using third-party plugins. The <audio> and <video> elements handle multimedia files, while the <iframe> element acts as a window to embed other HTML documents, map grids, or external media player layouts.",
        code: "<video src=\"assets/trailer.mp4\" controls width=\"350\"></video>\n<iframe src=\"https://example.com\" width=\"100%\" height=\"200\"></iframe>",
        subtopics: [
          { heading: "Media control attributes", content: "The video and audio tags support attributes to control playback. Adding 'controls' displays play/pause buttons, volume bars, and scrubbers. 'autoplay' starts playback immediately. 'loop' repeats the track infinitely. 'muted' starts the media silently, which is required by most browsers to allow autoplay." },
          { heading: "Iframe security considerations", content: "Because iframes display external sites, they present security risks (like clickjacking). You should always apply the 'sandbox' attribute to restrict what scripts, forms, or popups can execute within the embedded window, keeping your host site secure." }
        ]
      },
      // MODULE 5
      {
        id: "t12",
        module: "M5: Lists & Tables",
        title: "HTML Lists",
        content: "Lists are used to group related text items together in structured sequences. HTML supports three types of lists: Unordered lists (<ul>) for bulleted items, Ordered lists (<ol>) for numbered sequences, and Description lists (<dl>) for term-definition pairs. Every list item must be wrapped inside the <li> tag to be valid.",
        code: "<ul>\n  <li>Learn HTML</li>\n  <li>Build Projects</li>\n</ul>",
        subtopics: [
          { heading: "Ordered list formats", content: "By default, ordered lists display decimal numbers (1, 2, 3). You can customize this numbering format using the 'type' attribute. For example, type='A' uses uppercase letters, type='a' uses lowercase, type='I' uses Roman numerals, and type='i' uses lowercase Roman numerals." },
          { heading: "Description lists (dl, dt, dd)", content: "A description list (<dl>) is perfect for glossaries, dictionaries, or key-value metadata. It does not use standard li tags. Instead, it pairs a term (<dt>) with a description (<dd>). This provides a clean, highly structured outline that search engines parse easily." }
        ]
      },
      {
        id: "t13",
        module: "M5: Lists & Tables",
        title: "HTML Tables",
        content: "Tables organize complex data sets into grids of rows and columns. While tables were once used for full-page website layouts in the early 2000s, this is now a bad practice. Today, tables should only be used to present tabular data. A table consists of the <table> wrapper, rows (<tr>), headers (<th>), and standard data cells (<td>).",
        code: "<table>\n  <tr>\n    <th>Weapon</th>\n    <th>Damage</th>\n  </tr>\n  <tr>\n    <td>Steel Sword</td>\n    <td>45</td>\n  </tr>\n</table>",
        subtopics: [
          { heading: "Rowspan and Colspan attributes", content: "To merge grid cells together, HTML provides colspan and rowspan. Setting colspan='2' on a cell makes it expand horizontally across two columns. Setting rowspan='3' on a cell makes it expand vertically down across three rows. This is useful for complex data headers." },
          { heading: "Table semantic sections", content: "To make tables clean and accessible, group cells into semantic blocks. Use <thead> to wrap the column headers, <tbody> to enclose the data contents, and <tfoot> to display final summary numbers. This structure enables clear accessibility reading flows." }
        ]
      },
      // MODULE 6
      {
        id: "t14",
        module: "M6: Forms & Inputs",
        title: "HTML Forms",
        content: "Forms are the primary way web applications interact with users, allowing them to enter and submit data. Registration pages, login portals, comment sections, and payment checkouts all rely on HTML forms. A form is defined using the <form> element, which handles the submission route via the 'action' and 'method' attributes.",
        code: "<form action=\"/register\" method=\"POST\">\n  <button type=\"submit\">Register</button>\n</form>",
        subtopics: [
          { heading: "GET vs POST submit methods", content: "The 'method' attribute defines how data is transmitted. GET appends all form values directly to the browser address URL query string. It is ideal for search queries. POST sends data silently within the HTTP request body. It is required for sensitive data like passwords or credit cards." },
          { heading: "The crucial role of Labels", content: "Always pair inputs with a <label> tag. The label's 'for' attribute must match the input's 'id'. This connects them semantically. It increases the clickable area (clicking the label focuses the input) and allows screen readers to read the label aloud when the field is focused." }
        ]
      },
      {
        id: "t15",
        module: "M6: Forms & Inputs",
        title: "Input Elements",
        content: "The <input> element is the most versatile form element, capable of transforming into various control types based on the 'type' attribute. You can collect single-line text, passwords, email addresses, numbers, check options, date pickers, or file uploads. Proper configuration of inputs guarantees high-quality user inputs.",
        code: "<input type=\"email\" placeholder=\"mail@site.com\" required />\n<input type=\"checkbox\" id=\"agree\" />",
        subtopics: [
          { heading: "Form validation attributes", content: "HTML forms provide built-in validation features. Adding the 'required' attribute blocks form submission if the field is empty. 'min' and 'max' restrict number range limits. 'pattern' uses regular expressions to validate text structures, like phone numbers or postcodes." },
          { heading: "Radio buttons grouping", content: "Radio buttons select one option from a list. To make multiple radio inputs mutually exclusive (so selecting one deselects the others), you must assign them the exact same 'name' attribute value. If names differ, they behave independently." }
        ]
      },
      // MODULE 7
      {
        id: "t16",
        module: "M7: Advanced HTML, SEO & Access",
        title: "Semantic HTML",
        content: "Semantic HTML refers to writing tags that carry a clear structural meaning. Elements like <header>, <nav>, <main>, <article>, <section>, <aside>, and <footer> tell the browser and search engines exactly what role their content plays. Writing semantic HTML is a core best practice, replacing nested generic divisions.",
        code: "<main>\n  <article>\n    <h2>Semantic Article</h2>\n    <p>Semantic paragraph content.</p>\n  </article>\n</main>",
        subtopics: [
          { heading: "Div vs Semantic tags", content: "A <div> tag is a generic block container with zero semantic meaning. It is purely a visual styling hook. In contrast, <article> indicates that the contents represent a self-contained, independent article. <nav> clearly defines the page's main navigation links, helping search engines index menus." },
          { heading: "Accessibility benefits", content: "Visually impaired users rely on screen readers. Semantic elements act as anchors. Screen readers allow users to skip header links and jump directly to <main> or navigate by <section> headers, saving them from reading through menus on every page load." }
        ]
      },
      {
        id: "t17",
        module: "M7: Advanced HTML, SEO & Access",
        title: "HTML5 Storage & APIs",
        content: "HTML5 brought powerful application program interfaces (APIs) directly to web browsers, turning them into capable software platforms. Key features include client-side storage mechanisms like Local Storage and Session Storage, which allow web apps to save data locally on the user's device without database requirements.",
        code: "localStorage.setItem('heroXP', '1250');\nlet xp = localStorage.getItem('heroXP');",
        subtopics: [
          { heading: "Local Storage vs Session Storage", content: "Local Storage holds data permanently. Even if the user closes the browser tab or restarts their computer, the data remains. Session Storage is temporary. It stores data only for the current browser session. Closing the tab immediately clears the session storage cache." },
          { heading: "HTML5 Geolocation API", content: "The Geolocation API allows web applications to request the user's current GPS location coordinates. For privacy reasons, the browser displays a permission prompt, and the application can only access latitude and longitude details after explicit user approval." }
        ]
      },
      {
        id: "t18",
        module: "M7: Advanced HTML, SEO & Access",
        title: "SEO Foundations",
        content: "SEO (Search Engine Optimization) ensures your website ranks highly on Google search results. HTML plays a vital role in SEO by providing clean structures and meta tags. Metadata is placed inside the <head> section of your HTML document, giving search bots technical descriptions of your page topic.",
        code: "<meta name=\"description\" content=\"A premium RPG code learning platform.\" />\n<link rel=\"canonical\" href=\"https://quest.com\" />",
        subtopics: [
          { heading: "Canonical URLs and Title tags", content: "The <title> tag defines the search result heading, making it the most important SEO tag. A canonical link (<link rel='canonical'>) tells search engine spiders which URL is the master version, preventing duplicate indexing penalties." },
          { heading: "Open Graph meta properties", content: "Open Graph tags are metadata properties starting with 'og:' (e.g. og:title, og:image). They define how your link preview cards look when shared on social media platforms like WhatsApp, Twitter, or Discord, increasing click-through rates." }
        ]
      },
      {
        id: "t19",
        module: "M7: Advanced HTML, SEO & Access",
        title: "Web Accessibility (A11y)",
        content: "Web accessibility (often abbreviated as A11y) is the practice of designing websites that are usable by everyone, including people with physical, visual, auditory, or cognitive disabilities. Accessible HTML relies on writing semantic code, providing alternative text assets, and implementing WAI-ARIA standards.",
        code: "<button aria-label=\"Close dialog overlay\">X</button>",
        subtopics: [
          { heading: "WAI-ARIA roles and attributes", content: "WAI-ARIA (Web Accessibility Initiative - Accessible Rich Internet Applications) is a set of attributes that extend HTML. They explain complex elements to screen readers where semantic tags fall short (e.g., setting aria-expanded='true' on a menu button)." },
          { heading: "Keyboard accessibility flows", content: "All interactive elements (links, buttons, form text boxes) must be reachable and clickable using only the keyboard Tab and Enter keys. Developers must preserve visible outline highlights so keyboard users see which element is active." }
        ]
      },
      {
        id: "t20",
        module: "M7: Advanced HTML, SEO & Access",
        title: "Responsive HTML",
        content: "Responsive web design ensures that a page displays beautifully across diverse screen sizes, including phones, tablets, and wide desktop monitors. Responsive design begins in HTML by setting up the viewport configuration metadata, followed by applying flexible widths on image and media elements.",
        code: "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />",
        subtopics: [
          { heading: "Why the Viewport tag is mandatory", content: "Without the viewport meta tag, mobile browsers assume they are displaying a desktop site. They render the page at a wide width (usually 980px) and scale it down, making text microscopic. The viewport tag forces the page to match the device width." },
          { heading: "Responsive image scaling", content: "To prevent images from overflowing small phone screens, assign them flexible styles. Setting max-width: 100% and height: auto ensures that images shrink automatically on small devices, remaining completely proportional." }
        ]
      },
      {
        id: "t21",
        module: "M7: Advanced HTML, SEO & Access",
        title: "Best Practices",
        content: "Writing professional HTML requires following clean code organization guidelines. Always write tags in lowercase, indent nested elements clearly using spaces or tabs, close all opened tags, validate syntax with testing tools, and optimize file sizes to achieve fast loading speeds.",
        code: "<!-- Bad: unclosed and uppercase -->\n<P><H1>Title\n\n<!-- Good: semantic and indented -->\n<h1>Title</h1>",
        subtopics: [
          { heading: "HTML Code validation", content: "Running your markup code through the W3C markup validator is a critical quality step. The validator flags syntax errors, unclosed tags, duplicate IDs, or nested violations that could cause layout breakages across different browser versions." },
          { heading: "Performance file optimization", content: "Fast load times improve user experience and SEO ranking. Optimize your page by lazy-loading offscreen images using loading='lazy', minifying raw HTML document code, and using compressed image formats like WebP." }
        ]
      },
      {
        id: "t22",
        module: "M7: Advanced HTML, SEO & Access",
        title: "Mini Projects Overview",
        content: "The best way to solidify your HTML knowledge is by building real projects from scratch. Focus on constructing basic layout structures, styling forms, and implementing semantic section trees. In World 6, you will be challenged to compile a mini portfolio website using these core layout structures.",
        code: "<!-- Structuring a page layout -->\n<header>Navigation</header>\n<main>Content Block</main>",
        subtopics: [
          { heading: "Structuring complex forms", content: "Build a registration form layout. Practice grouping inputs using <fieldset> and <legend> tags, organizing text boxes, selects, and checkboxes to master form elements and accessibility flows." },
          { heading: "Personal portfolio layout", content: "A personal portfolio site is a perfect initial project. Practice structuring headers, navigation menus, project lists, and footers, creating a complete semantic resume web page." }
        ]
      },
      {
        id: "t23",
        module: "M7: Advanced HTML, SEO & Access",
        title: "Interview Preparation",
        content: "When interviewing for front-end developer roles, be prepared to answer core structural HTML questions. Interviewers frequently test your understanding of block vs inline tags, semantic markup benefits, form GET vs POST transmission methods, W3C standards, SEO meta details, and web accessibility.",
        code: "Q: Explain block vs inline elements.\nA: Block takes full width; inline takes content width.",
        subtopics: [
          { heading: "Common technical questions", content: "What is the difference between local storage and session storage? What is the purpose of the alt text on images? Why is the viewport tag important? Be ready to explain these details clearly with code examples." },
          { heading: "Whiteboard coding structure", content: "Interviewers often ask candidates to write nested list grids or form layouts on a whiteboard. Practice writing clean, valid, indented semantic HTML tags without the help of a text editor autocomplete." }
        ]
      }
    ],
    quiz: [
      // 10 MCQs
      {
        id: "q1",
        question: "What does HTML stand for?",
        type: "mcq",
        options: ["HyperText Markup Language", "HighText Machine Language", "Hyperlink Text Markup", "Home Tool Markup Language"],
        correctAnswer: "HyperText Markup Language",
        difficulty: "easy"
      },
      {
        id: "q2",
        question: "Who is credited with creating HTML in 1991?",
        type: "mcq",
        options: ["Tim Berners-Lee", "Steve Jobs", "Bill Gates", "Brendan Eich"],
        correctAnswer: "Tim Berners-Lee",
        difficulty: "easy"
      },
      {
        id: "q3",
        question: "Which tag represents the highest priority, largest heading element?",
        type: "mcq",
        options: ["<h6>", "<h1>", "<head>", "<heading>"],
        correctAnswer: "<h1>",
        difficulty: "easy"
      },
      {
        id: "q4",
        question: "Which tag is used to define a standard paragraph?",
        type: "mcq",
        options: ["<p>", "<paragraph>", "<text>", "<lb>"],
        correctAnswer: "<p>",
        difficulty: "easy"
      },
      {
        id: "q5",
        question: "Which attribute specifies the destination URL inside an anchor link (<a>) tag?",
        type: "mcq",
        options: ["href", "src", "link", "url"],
        correctAnswer: "href",
        difficulty: "easy"
      },
      {
        id: "q6",
        question: "Which tag is used to embed an image into an HTML page?",
        type: "mcq",
        options: ["<img />", "<image>", "<pic>", "<src>"],
        correctAnswer: "<img />",
        difficulty: "easy"
      },
      {
        id: "q7",
        question: "Which tag represents a single list item inside an ordered or unordered list?",
        type: "mcq",
        options: ["<li>", "<list>", "<item>", "<ul>"],
        correctAnswer: "<li>",
        difficulty: "easy"
      },
      {
        id: "q8",
        question: "Which attribute value creates a checkbox option inside an <input> element?",
        type: "mcq",
        options: ["type=\"checkbox\"", "type=\"check\"", "type=\"toggle\"", "type=\"radio\""],
        correctAnswer: "type=\"checkbox\"",
        difficulty: "easy"
      },
      {
        id: "q9",
        question: "Which HTML5 semantic element represents the primary, unique content of a webpage?",
        type: "mcq",
        options: ["<main>", "<div>", "<header>", "<section>"],
        correctAnswer: "<main>",
        difficulty: "easy"
      },
      {
        id: "q10",
        question: "Which meta tag is crucial to ensure responsive, scaled rendering on mobile devices?",
        type: "mcq",
        options: ["viewport", "charset", "description", "author"],
        correctAnswer: "viewport",
        difficulty: "easy"
      },
      // 3 Matching questions
      {
        id: "q11",
        question: "Match the HTML tag to its correct purpose:",
        type: "matching",
        pairs: [
          { left: "<a>", right: "Anchor Link" },
          { left: "<img>", right: "Image Display" },
          { left: "<form>", right: "User Input Container" },
          { left: "<table>", right: "Tabular Data Grid" }
        ],
        difficulty: "medium"
      },
      {
        id: "q12",
        question: "Match the storage API or meta tag to its duration or purpose:",
        type: "matching",
        pairs: [
          { left: "Local Storage", right: "Permanent Browser Cache" },
          { left: "Session Storage", right: "Session-only Browser Cache" },
          { left: "Open Graph Tags", right: "Social Media Preview Data" },
          { left: "Canonical Tag", right: "Original Master URL Pointer" }
        ],
        difficulty: "medium"
      },
      {
        id: "q13",
        question: "Match the form submit method to its description:",
        type: "matching",
        pairs: [
          { left: "GET Method", right: "Appends inputs to URL query string" },
          { left: "POST Method", right: "Sends inputs in request body" },
          { left: "Required Attribute", right: "Blocks submission if field is empty" },
          { left: "Autofocus Attribute", right: "Focuses input field on page load" }
        ],
        difficulty: "medium"
      },
      // 2 Code-based questions
      {
        id: "q14",
        question: "Create a paragraph element (<p>) containing the text 'Hello World'.",
        type: "code",
        expected: "<p>Hello World</p>",
        validationCode: "input.replace(/\\s+/g, '').toLowerCase().includes('<p>helloworld</p>')",
        hint: "Use opening <p> and closing </p> tags with 'Hello World' inside.",
        difficulty: "hard"
      },
      {
        id: "q15",
        question: "Create a level 1 heading element (<h1>) containing the text 'Welcome'.",
        type: "code",
        expected: "<h1>Welcome</h1>",
        validationCode: "input.replace(/\\s+/g, '').toLowerCase().includes('<h1>welcome</h1>')",
        hint: "Use opening <h1> and closing </h1> tags with 'Welcome' inside.",
        difficulty: "hard"
      }
    ],
    rewards: {
      learningXP: 100,
      learningCoins: 50,
      xpPerCorrect: 10,
      coinsPerCorrect: 4,
      bonus: { xp: 100, coins: 50 },
      equipment: "Wooden Boots",
    },
  },
  {
    id: 2,
    pathId: "frontend",
    title: "World 2: CSS Fundamentals",
    isMiniProject: false,
    isBossWorld: false,
    questBrief: {
      objectives: [
        "Master CSS selectors, specificity, and cascading rules",
        "Understand the Box Model, layouts (Flexbox & Grid), and positioning",
        "Implement responsive web design using media queries and fluid units"
      ],
      resourceLabel: "MDN Web Docs — CSS Reference",
      resourceUrl: "https://developer.mozilla.org/en-US/docs/Web/CSS",
      estTime: "30 min",
      difficulty: "Easy"
    },
    storyDialogue: [
      { speaker: "Saint", text: "Welcome, traveler. Now we shall style our structures. Let us master the Cascade." },
    ],
    learningContent: [
      // MODULE 1: CSS Fundamentals & Selectors
      {
        id: "css-t1",
        module: "M1: CSS Basics & Syntax",
        title: "CSS Syntax & Add Methods",
        content: "CSS (Cascading Style Sheets) controls the presentation layer of the web, defining colors, margins, fonts, and responsive grid layouts. A CSS rule consists of a selector and a declaration block. There are three primary methods to inject CSS: Inline styles (via HTML style attribute), Internal styles (inside <style> tags in the head), and External stylesheets (linking a separate .css file). External stylesheets represent the industry best practice.",
        code: "/* CSS Syntax Example */\nselector {\n  property: value;\n}",
        subtopics: [
          { heading: "How the browser parses CSS", content: "The browser reads HTML to build the DOM (Document Object Model) tree and CSS to build the CSSOM (CSS Object Model) tree. It then combines these trees to form the render tree, calculating layouts and painting pixels on the viewport screen." },
          { heading: "The Cascade & History", content: "CSS was introduced in 1996 by the W3C to separate layout presentation from document structure. The word 'Cascading' means styles cascade down, applying rules based on source order, inheritance, and specificity weight." }
        ]
      },
      {
        id: "css-t2",
        module: "M1: CSS Basics & Syntax",
        title: "Selectors & Specificity Basics",
        content: "Selectors target HTML elements to apply styles. Basic selectors target by element tag name, class name (prefixed with a dot, e.g. .card), or unique ID (prefixed with a hash, e.g. #header). You can combine selectors using combinators: descendant selector (space), child selector (parent > child), adjacent sibling (parent + sibling), and general sibling (parent ~ sibling).",
        code: "/* Direct child selector */\n.nav-list > li {\n  display: inline-block;\n}",
        subtopics: [
          { heading: "Universal & Grouping Selectors", content: "The universal selector (*) targets every element. Grouping selectors allows you to apply the same declaration block to multiple elements by separating selectors with a comma (e.g. h1, h2, p { margin-bottom: 10px; })." },
          { heading: "Attribute Selectors", content: "Attribute selectors target elements based on their HTML attributes. For example, input[type='text'] targets text inputs, while a[href^='https'] styles secure external anchor links." }
        ]
      },
      {
        id: "css-t3",
        module: "M1: CSS Basics & Syntax",
        title: "Colors & Backgrounds",
        content: "CSS supports named colors (e.g. red), hexadecimal values (HEX, e.g. #ffffff), Red-Green-Blue (RGB, e.g. rgb(255,255,255)), and Hue-Saturation-Lightness (HSL). RGBA and HSLA add an alpha channel to control opacity. Background properties control background colors, background images, size (cover, contain), position, repeat, and scroll attachment.",
        code: "/* HSLA color with opacity */\n.overlay {\n  background-color: rgba(0, 0, 0, 0.75);\n}",
        subtopics: [
          { heading: "Understanding HEX and RGB math", content: "HEX values consist of three pairs of base-16 digits representing Red, Green, and Blue channels. RGB uses base-10 integers from 0 to 255. Both formats declare how to mix light colors on standard digital displays." },
          { heading: "Background attachment configurations", content: "By setting background-attachment: fixed, you lock the background image in place relative to the viewport. This creates a parallax-like scrolling effect as the page content moves over the locked background." }
        ]
      },
      // MODULE 2: The Box Model & Typography
      {
        id: "css-t4",
        module: "M2: Box Model & Typography",
        title: "The CSS Box Model",
        content: "Every HTML element is rendered as a rectangular box. The CSS Box Model defines the structure of this box, consisting of four layers: Content (the text or image), Padding (clear space inside the border), Border (the edge boundary line), and Margin (space outside, pushing other elements away).",
        code: "/* Box Model Spacing */\n.card {\n  margin: 20px;\n  padding: 15px;\n  border: 1px solid #ccc;\n}",
        subtopics: [
          { heading: "box-sizing: content-box vs border-box", content: "With content-box (default), padding and borders are added to the width of the box. Setting box-sizing: border-box forces padding and borders to be calculated inside the width, preventing unexpected layout overflows." },
          { heading: "Borders and Outlines", content: "Borders are calculated as part of the element's box model footprint. Outlines are drawn outside the border edge and do not take up space or affect layout flow, which is ideal for focus states." }
        ]
      },
      {
        id: "css-t5",
        module: "M2: Box Model & Typography",
        title: "Typography & Web Fonts",
        content: "Typography settings control font styles, families, sizes, weights, spacing, alignments, and decorations. You can load external font files locally or import web font libraries like Google Fonts. Web safe font stacks should always include fallback families to guarantee legible rendering.",
        code: "/* Typography styles */\np {\n  font-family: 'Outfit', sans-serif;\n  line-height: 1.6;\n  letter-spacing: 0.5px;\n}",
        subtopics: [
          { heading: "Font weights and sizes", content: "Font-size defines height scale, while font-weight defines boldness (100 to 900). Line-height sets line spacing, and text-transform controls capitalization states (uppercase, lowercase, capitalize)." },
          { heading: "Google Fonts integration", content: "Web fonts are loaded in HTML via <link> tags or in CSS using @import rules. Browsers download these font resources dynamically when loading the page." }
        ]
      },
      {
        id: "css-t6",
        module: "M2: Box Model & Typography",
        title: "Display, Visibility & Overflow",
        content: "The display property controls the element's rendering box type: block (takes full width, starts on a new line), inline (takes content width, flows inline), inline-block (flows inline but respects width/height), and none (hides element completely). Z-index manages stacking layers on positioned elements.",
        code: "/* Display & Stacking */\n.modal {\n  display: block;\n  position: fixed;\n  z-index: 999;\n}",
        subtopics: [
          { heading: "Display: none vs Visibility: hidden", content: "Display: none completely removes the element from the layout flow, freeing up its occupied space. Visibility: hidden hides the element visually, but the blank space remains occupied in the document tree." },
          { heading: "Overflow hidden, scroll, and auto", content: "Overflow properties determine what happens when content exceeds its box boundaries. overflow: hidden clips excess content. overflow: scroll forces scrollbars, and overflow: auto displays scrollbars only when content overflows." }
        ]
      },
      // MODULE 3: CSS Positioning & Layouts (Flexbox & Grid)
      {
        id: "css-t7",
        module: "M3: Positioning & Floats",
        title: "CSS Positioning Options",
        content: "The position property shifts elements out of the normal document flow. Options include static (default, follows normal flow), relative (positioned relative to normal flow, acts as absolute parent anchor), absolute (positioned relative to nearest non-static ancestor), fixed (locked relative to viewport window), and sticky (toggles relative/fixed based on scroll).",
        code: "/* Absolute child relative parent */\n.parent {\n  position: relative;\n}\n.child {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n}",
        subtopics: [
          { heading: "Understanding Sticky positioning", content: "sticky acts like a relative element until it reaches a specified scroll threshold, where it pins itself to the viewport like a fixed element until it exits its parent container boundaries." },
          { heading: "Traditional floats and clears", content: "Before flexbox and grid, developers floated elements left/right for layouts. Floated elements are removed from normal flow, requiring clear: both on subsequent elements to restore layout boundaries." }
        ]
      },
      {
        id: "css-t8",
        module: "M3: Positioning & Floats",
        title: "CSS Flexbox Layouts",
        content: "Flexbox (Flexible Box Layout) is a one-dimensional layout model designed for alignment and spacing along a single axis. Container properties control layout direction (flex-direction), wrapping (flex-wrap), main axis alignment (justify-content), cross axis alignment (align-items), and content wrapping alignments (align-content).",
        code: "/* Flexbox container */\n.container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}",
        subtopics: [
          { heading: "Flex Item properties", content: "Flex items can be configured individually: order (changes visual sequence), flex-grow (expand factor), flex-shrink (shrink factor), flex-basis (default base size), and align-self (overrides align-items for single item)." },
          { heading: "The flex shorthand property", content: "Instead of declaring grow, shrink, and basis separately, combine them using the flex shorthand (e.g. flex: 1 0 auto; representing flex-grow: 1, flex-shrink: 0, and flex-basis: auto)." }
        ]
      },
      {
        id: "css-t9",
        module: "M3: Positioning & Floats",
        title: "CSS Grid Layouts",
        content: "CSS Grid is a highly powerful two-dimensional layout system, managing columns and rows simultaneously. You define grid tracks on the container using grid-template-columns and grid-template-rows, and configure spacing gaps using the gap property.",
        code: "/* CSS Grid Layout */\n.gallery {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n}",
        subtopics: [
          { heading: "Grid placement tracks", content: "Items can span across rows and columns using grid-column and grid-row. For example, grid-column: 1 / 3 forces a card to stretch across columns 1 and 2, terminating at column line 3." },
          { heading: "Grid-template-areas", content: "You can map grid layouts visually by naming areas in strings (e.g. grid-template-areas: 'header header' 'nav main' 'footer footer'). Items are assigned to areas using grid-area: name." }
        ]
      },
      // MODULE 4: Responsive Design, Sizing & Transformations
      {
        id: "css-t10",
        module: "M4: Responsive Design & Transitions",
        title: "Sizing Units & Breakpoints",
        content: "Sizing units are absolute (px) or relative (%, em, rem, vh, vw, vmin, vmax). Absolute units remain fixed regardless of display. Relative units calculate dimensions relative to parent elements, root fonts, or viewport sizes. Viewport configuration meta tags are required to handle mobile scalings.",
        code: "/* Root scale rem units */\nhtml {\n  font-size: 16px;\n}\nh1 {\n  font-size: 2.5rem; /* 40px */\n}",
        subtopics: [
          { heading: "EM vs REM calculations", content: "em values calculate relative to the font-size of the element's parent. rem values calculate strictly relative to the root html element font-size, making page scaling highly consistent." },
          { heading: "Viewport Height and Width", content: "vh represents 1% of the viewport height, and vw represents 1% of the viewport width. Setting height: 100vh forces a section to cover the complete height of the device screen." }
        ]
      },
      {
        id: "css-t11",
        module: "M4: Responsive Design & Transitions",
        title: "Media Queries & Fluid Media",
        content: "Media queries declare conditions (like viewport width) to apply responsive CSS rules. Adaptive web design uses breakpoints to alter layouts. Media fluid styles (like max-width: 100% and height: auto) prevent images and video frames from overflowing screen tracks.",
        code: "/* Mobile responsive override */\n@media (max-width: 768px) {\n  .sidebar {\n    display: none;\n  }\n}",
        subtopics: [
          { heading: "Mobile-first vs Desktop-first design", content: "Mobile-first design writes base styles for small viewports and appends min-width media queries. Desktop-first writes desktop layouts as base rules and overrides using max-width queries." },
          { heading: "Responsive Typography", content: "Typography scales smoothly across devices by using relative units (rem) or CSS functions to calculate text sizing dynamically based on viewport widths." }
        ]
      },
      {
        id: "css-t12",
        module: "M4: Responsive Design & Transitions",
        title: "Transforms & Transitions",
        content: "CSS Transforms alter elements geometrically in 2D or 3D space: translate (shift), rotate (turn), scale (resize), and skew (tilt). CSS Transitions animate property changes smoothly over a specified duration rather than triggering instant changes on state updates.",
        code: "/* Hover transition animation */\n.btn {\n  transition: transform 0.3s ease-in-out;\n}\n.btn:hover {\n  transform: scale(1.05);\n}",
        subtopics: [
          { heading: "CSS Keyframe Animations", content: "Keyframe rules (@keyframes) define animations by setting CSS property values at specific percentages (e.g. 0%, 50%, 100%). Animations are activated on elements using properties like animation-name and duration." },
          { heading: "Performance Optimization (will-change)", content: "To prevent browser layout thrashing, apply will-change to elements undergoing heavy transformations. This shifts rendering to GPU layers, keeping frame rates high." }
        ]
      },
      // MODULE 5: Advanced Selector Math & CSS Functions
      {
        id: "css-t13",
        module: "M5: Specificity, Variables & Functions",
        title: "Pseudo Elements & Classes",
        content: "Pseudo-classes target elements under dynamic states (e.g. :hover, :focus, :active, :nth-child(n)). Pseudo-elements style specific parts of elements or generate content (e.g. ::before, ::after, ::first-line, ::first-letter).",
        code: "/* Pseudo element indicator */\n.link::after {\n  content: \" →\";\n  color: #d4af37;\n}",
        subtopics: [
          { heading: "nth-child formulas", content: "nth-child(n) matches child nodes based on their index. You can pass keywords (even, odd) or mathematical formulas like nth-child(3n+1) to target specific structural offsets." },
          { heading: "Generated content rules", content: "Pseudo-elements like ::before and ::after must include the content property (even if empty, e.g. content: '') to trigger browser layout rendering." }
        ]
      },
      {
        id: "css-t14",
        module: "M5: Specificity, Variables & Functions",
        title: "Specificity & Cascade Math",
        content: "CSS specificity decides which styles apply when multiple rules conflict. The browser calculates specificity weights based on selector types: inline styles (1000) > ID selectors (100) > class/attribute/pseudo-class selectors (10) > element/pseudo-element selectors (1).",
        code: "/* Selector weight: 111 */\n#container .menu li a {\n  color: red;\n}",
        subtopics: [
          { heading: "Resolving Cascade conflicts", content: "If two competing selectors have the exact same specificity weight, the cascade rule applies: the selector declared last (lowest down in the stylesheet) overrides the earlier one." },
          { heading: "Inheritance control tags", content: "Properties can be overridden or forced back to parent states using inheritance keywords: inherit (copy parent value), initial (apply default browser CSS value), and unset." }
        ]
      },
      {
        id: "css-t15",
        module: "M5: Specificity, Variables & Functions",
        title: "CSS Variables & Functions",
        content: "CSS Variables (custom properties) store design values like colors or sizes for reuse across stylesheets. Sizing functions calc(), min(), max(), and clamp() calculate dimensions dynamically, mixing different units on the fly.",
        code: "/* Variables & clamp */\n:root {\n  --primary-color: #3498db;\n}\n.card {\n  background: var(--primary-color);\n  width: clamp(280px, 45%, 600px);\n}",
        subtopics: [
          { heading: "calc() sizing operations", content: "calc() lets you run math inside CSS declarations, allowing you to combine absolute and relative values (e.g. width: calc(100% - 40px) to allocate padding margins)." },
          { heading: "Understanding clamp() boundaries", content: "clamp(minimum, preferred, maximum) restricts a value between hard floor and ceiling boundaries. It is widely used to scale typography size across screen ranges without media queries." }
        ]
      },
      // MODULE 6: Advanced Layouts, Accessibility & Systems
      {
        id: "css-t16",
        module: "M6: Systems & Advanced CSS",
        title: "Gradients, Shadows & Filters",
        content: "Gradients define smooth color transitions (linear, radial, conic). Shadows add text and box depth. Filters apply blur, brightness, contrast, and opacity overlays dynamically on elements.",
        code: "/* Shadow and filter effects */\n.card {\n  box-shadow: 0 10px 30px rgba(0,0,0,0.5);\n  filter: contrast(1.1);\n}",
        subtopics: [
          { heading: "Blend modes", content: "mix-blend-mode blends an element's content with its direct background parent. background-blend-mode blends background images with background colors in a container." },
          { heading: "Filter overlays", content: "CSS filters like blur() and brightness() modify the visual appearance of elements on the fly, commonly used for modal backdrops." }
        ]
      },
      {
        id: "css-t17",
        module: "M6: Systems & Advanced CSS",
        title: "Accessibility & Dark Mode",
        content: "Web accessibility (A11y) in CSS guarantees interfaces are usable by everyone. This includes maintaining proper color contrast, scaling typography, styling focus states, and creating dark modes using media queries.",
        code: "/* Dark theme query */\n@media (prefers-color-scheme: dark) {\n  body {\n    background: #111;\n    color: #eee;\n  }\n}",
        subtopics: [
          { heading: "Visible keyboard focus styling", content: "Never remove keyboard outlines (outline: none) without providing equivalent accessible focus states. Focus outlines are crucial for keyboard navigators to identify active links." },
          { heading: " prefers-reduced-motion query", content: "The prefers-reduced-motion media query checks system settings. If active, developers should disable transition durations and animations to accommodate motion-sensitive users." }
        ]
      },
      {
        id: "css-t18",
        module: "M6: Systems & Advanced CSS",
        title: "CSS Architecture & Frameworks",
        content: "CSS Architecture manages layout systems at scale using frameworks like BEM (Block, Element, Modifier), OOCSS, and SMACSS. Utility-first frameworks (like Tailwind CSS) or component frameworks (like Bootstrap) accelerate modern web development layouts.",
        code: "/* BEM Naming convention */\n.card__title--active {\n  color: #d4af37;\n}",
        subtopics: [
          { heading: "BEM structural convention", content: "BEM organizes classes into Blocks (independent parent), Elements (children of block, prefixed with double underscore), and Modifiers (styling flags, prefixed with double dashes)." },
          { heading: "Utility-first frameworks", content: "Tailwind CSS uses utility classes directly in HTML elements to declare styling. It bypasses custom CSS file writes, using pre-built theme tokens." }
        ]
      }
    ],
    quiz: [
      // 10 MCQs
      {
        id: "q1",
        question: "Which of the following selectors has the highest specificity weight?",
        type: "mcq",
        options: [
          "#menu-container .menu-item",
          ".menu-item a:hover",
          "div.navigation ul li a",
          "header nav"
        ],
        correctAnswer: "#menu-container .menu-item",
        difficulty: "easy"
      },
      {
        id: "q2",
        question: "How does display: none differ from visibility: hidden?",
        type: "mcq",
        options: [
          "display: none hides the element but preserves its space; visibility: hidden removes its space.",
          "display: none completely removes the element's layout space; visibility: hidden hides it but preserves the space.",
          "Both properties remove layout space, but visibility: hidden disables transitions.",
          "display: none is only used for images; visibility: hidden is only used for text elements."
        ],
        correctAnswer: "display: none completely removes the element's layout space; visibility: hidden hides it but preserves the space.",
        difficulty: "easy"
      },
      {
        id: "q3",
        question: "When box-sizing: border-box is applied to an element, what dimensions are included inside its declared width?",
        type: "mcq",
        options: [
          "Content width only",
          "Content width, padding, and borders",
          "Content width, padding, borders, and margins",
          "Content width and margins only"
        ],
        correctAnswer: "Content width, padding, and borders",
        difficulty: "easy"
      },
      {
        id: "q4",
        question: "Which relative CSS unit calculates dimensions strictly relative to the font-size of the root HTML element?",
        type: "mcq",
        options: ["em", "rem", "vh", "ex"],
        correctAnswer: "rem",
        difficulty: "easy"
      },
      {
        id: "q5",
        question: "If a flex container is configured with flex-direction: column, what is its main axis?",
        type: "mcq",
        options: ["Horizontal axis", "Vertical axis", "Diagonal axis", "Cross axis"],
        correctAnswer: "Vertical axis",
        difficulty: "easy"
      },
      {
        id: "q6",
        question: "In CSS, vertical margin collapsing occurs between which elements?",
        type: "mcq",
        options: [
          "Between horizontally aligned inline-block elements",
          "Between vertically adjacent block-level elements",
          "Between absolutely positioned container elements",
          "Between direct parent grid tracks"
        ],
        correctAnswer: "Between vertically adjacent block-level elements",
        difficulty: "easy"
      },
      {
        id: "q7",
        question: "What is a prerequisite for the z-index property to successfully stack an element?",
        type: "mcq",
        options: [
          "The display must be set to grid",
          "The position must be something other than static (e.g. relative, absolute, fixed, sticky)",
          "The element must contain an image tag with alt text",
          "The element must have box-sizing: content-box"
        ],
        correctAnswer: "The position must be something other than static (e.g. relative, absolute, fixed, sticky)",
        difficulty: "easy"
      },
      {
        id: "q8",
        question: "Which of the following parameters are accepted by the clamp() CSS sizing function?",
        type: "mcq",
        options: [
          "minimum, preferred, maximum values",
          "minimum and maximum values only",
          "scale factor and duration values",
          "selector and weight parameters"
        ],
        correctAnswer: "minimum, preferred, maximum values",
        difficulty: "easy"
      },
      {
        id: "q9",
        question: "Which CSS transform property value tilts or skews an element along the axes?",
        type: "mcq",
        options: ["rotate()", "scale()", "skew()", "translate()"],
        correctAnswer: "skew()",
        difficulty: "easy"
      },
      {
        id: "q10",
        question: "What does the 'B' stand for in the BEM architecture naming convention?",
        type: "mcq",
        options: ["Border", "Block", "Bootstrap", "Basis"],
        correctAnswer: "Block",
        difficulty: "easy"
      },
      // 3 Matching questions
      {
        id: "q11",
        question: "Match the CSS selector to its correct definition name:",
        type: "matching",
        pairs: [
          { left: "parent > child", right: "Direct Child Selector" },
          { left: "parent child", right: "Descendant Selector" },
          { left: "element.class", right: "Class Specific Selector" },
          { left: "[type='text']", right: "Attribute Selector" }
        ],
        difficulty: "medium"
      },
      {
        id: "q12",
        question: "Match the CSS position property value to its viewport behavior:",
        type: "matching",
        pairs: [
          { left: "position: absolute", right: "Positioned relative to nearest positioned ancestor" },
          { left: "position: fixed", right: "Positioned relative to the viewport, locked on scroll" },
          { left: "position: sticky", right: "Pins to viewport when scroll threshold is reached" },
          { left: "position: relative", right: "Positioned relative to its normal document flow location" }
        ],
        difficulty: "medium"
      },
      {
        id: "q13",
        question: "Match the alignment property to its layout behavior:",
        type: "matching",
        pairs: [
          { left: "align-self", right: "Aligns individual flex items along the cross axis" },
          { left: "justify-content", right: "Aligns flex items along the main axis of container" },
          { left: "align-items", right: "Aligns all flex items along the cross axis of container" },
          { left: "flex-grow", right: "Defines the expansion factor of a flex item" }
        ],
        difficulty: "medium"
      },
      // 2 Code-based questions
      {
        id: "q14",
        question: "Calculate the specificity weight of the selector 'nav.menu-bar ul li.active a'. Write your answer as count numbers separated by dashes in the format ID-Class-Element (e.g., '1-2-3').",
        type: "code",
        expected: "0-2-4",
        validationCode: "input.trim() === '0-2-4'",
        hint: "We have 0 IDs, 2 classes (.menu-bar and .active), and 4 element tags (nav, ul, li, a). Format: 0-2-4.",
        difficulty: "hard"
      },
      {
        id: "q14_2",
        question: "An element has CSS: width: 300px; padding: 20px 10px; border: 5px solid black; box-sizing: content-box;. What is the total calculated outer width of this element in pixels? (Write only the number, e.g., '350')",
        type: "code",
        expected: "330",
        validationCode: "input.trim() === '330'",
        hint: "Content width is 300px. Add the left & right padding (10px + 10px) and left & right border (5px + 5px) because box-sizing is content-box.",
        difficulty: "hard"
      }
    ],
    rewards: {
      learningXP: 120,
      learningCoins: 60,
      xpPerCorrect: 12,
      coinsPerCorrect: 5,
      bonus: { xp: 120, coins: 60 },
      equipment: "Style Gloves",
    },
  },
  {
    id: 3,
    pathId: "frontend",
    title: "World 3: JavaScript Basics",
    isMiniProject: false,
    isBossWorld: false,
    storyDialogue: [
      { speaker: "Saint", text: "Structure and style are not enough. A webpage needs behavior — and that is JavaScript's domain." },
    ],
    learningContent: [
      {
        id: "js-t1",
        module: "M1: JS Core",
        title: "What is JavaScript?",
        content: "JavaScript is the programming language of the web. While HTML builds structure and CSS adds style, JavaScript makes a page interactive — responding to clicks, updating content, validating forms.",
        subtopics: [
          { heading: "Where does JavaScript run?", content: "Inside the browser (client-side) for interactivity, and also on servers via Node.js (server-side) for backend logic." },
          { heading: "How do you add JS to a page?", content: "Using a <script> tag — either inline, or linking an external .js file with <script src='file.js'></script>." },
        ],
      },
      {
        id: "js-t2",
        module: "M2: Variables & Loops",
        title: "Variables: let, const, var",
        content: "Variables store data. 'let' allows reassignment, 'const' locks the value after assignment, and 'var' is the old way (avoid it in modern code due to scoping issues).",
        subtopics: [
          { heading: "Why avoid var?", content: "var is function-scoped, not block-scoped, which causes bugs inside loops and if-blocks. let/const are block-scoped and safer." },
          { heading: "When to use const vs let?", content: "Default to const. Only use let if you know the variable's value will change later (like a counter)." },
        ],
      },
    ],
    quiz: [
      { question: "Which keyword should you avoid in modern JavaScript?", type: "mcq", options: ["let", "const", "var", "function"], correctAnswer: "var", difficulty: "easy" },
      { question: "JavaScript is platform-independent.", type: "truefalse", options: ["True", "False"], correctAnswer: "True", difficulty: "easy" },
    ],
    rewards: {
      learningXP: 15, learningCoins: 8, xpPerCorrect: 5, coinsPerCorrect: 2,
      bonus: { xp: 25, coins: 12 }, equipment: "Logic Amulet",
    },
  },
  {
    id: 4,
    title: "World 4: TBD",
    pathId: "frontend",
    isMiniProject: false,
    isBossWorld: false,
    storyDialogue: [
      { speaker: "Saint", text: "Halfway through your journey. Stay focused." },
    ],
    learningContent: [
      { title: "Coming Soon", type: "text", content: "Content for World 4 will be added soon." },
    ],
    quiz: [
      {
        question: "Placeholder question for World 4?",
        type: "mcq",
        options: ["A", "B", "C", "D"],
        correctAnswer: "A",
        difficulty: "easy",
      },
    ],
    rewards: {
      learningXP: 10,
      learningCoins: 5,
      xpPerCorrect: 5,
      coinsPerCorrect: 2,
      bonus: { xp: 20, coins: 10 },
      equipment: "Focus Ring",
    },
  },
  {
    id: 5,
    title: "World 5: TBD",
    pathId: "frontend",
    isMiniProject: false,
    isBossWorld: false,
    storyDialogue: [
      { speaker: "Saint", text: "The final lessons before the trial. Listen well." },
    ],
    learningContent: [
      { title: "Coming Soon", type: "text", content: "Content for World 5 will be added soon." },
    ],
    quiz: [
      {
        question: "Placeholder question for World 5?",
        type: "mcq",
        options: ["A", "B", "C", "D"],
        correctAnswer: "A",
        difficulty: "easy",
      },
    ],
    rewards: {
      learningXP: 10,
      learningCoins: 5,
      xpPerCorrect: 5,
      coinsPerCorrect: 2,
      bonus: { xp: 20, coins: 10 },
      equipment: "Scholar's Hat",
    },
  },
  {
    id: 6,
    title: "World 6: The Trial",
    pathId: "frontend",
    isMiniProject: true,
    isBossWorld: false,
    storyDialogue: [{ speaker: "Saint", text: "Prove what you have learned. Build something real." }],
    projectBrief: "Build a small calculator using everything you've learned so far.",
    rewards: { xp: 100, coins: 50, equipment: "Apprentice Cloak" },
  },
  {
    id: 7,
    title: "World 7: Final Boss",
    pathId: "frontend",
    isMiniProject: false,
    isBossWorld: true,
    storyDialogue: [{ speaker: "Saint", text: "This is it. Defeat the guardian to open the final gate." }],
    bossQuestions: generateBossQuestions(),
    rewards: { xp: 2000, coins: 200, equipment: "Legendary Armor", certificate: true },
  },
];

// Helper: generates 40 dummy boss questions
function generateBossQuestions() {
  const difficulties = [
    ...Array(20).fill("easy"),
    ...Array(15).fill("medium"),
    ...Array(5).fill("hard"),
  ];
  return difficulties.map((diff, i) => ({
    question: `Boss Question ${i + 1} (${diff})`,
    type: "mcq",
    options: ["Option A", "Option B", "Option C", "Option D"],
    correctAnswer: "Option A",
    difficulty: diff,
  }));
}

export const damageMap = { easy: 2, medium: 3, hard: 3 };