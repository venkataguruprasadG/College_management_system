This is the 2_Designs_UI_UX folder.

Prompt to build the website in bolt: 

Build a new web page using **Vite + Vanilla JavaScript + HTML + CSS**. Use the following guidelines so it matches the existing project style:

1. **Tech Stack**
   - Frontend: Vanilla JS, HTML, CSS
   - Build Tool: Vite
   - No frameworks like React, Vue, Angular.
   - No backend required for now.

2. **Design System**
   - Use the following CSS variables from the existing `style.css`:
     --primary-blue: #2563eb
     --primary-blue-dark: #1d4ed8
     --primary-blue-light: #3b82f6
     --secondary-purple: #7c3aed
     --secondary-green: #059669
     --secondary-orange: #ea580c
     --white: #ffffff
     --gray-50 to --gray-900
     --success: #10b981
     --warning: #f59e0b
     --error: #ef4444
   - Fonts: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif.
   - Maintain spacing, shadows, gradients, and transition variables as in the original project.

3. **Animations & Effects**
   - Include floating background shapes (`shape-1`, `shape-2`, `shape-3`) with blur and float animation.
   - Include floating icons with subtle opacity and floating animation.
   - Include slideUp, fade-in, bounce-in, and slide-in-right animations where appropriate.

4. **Layout**
   - Use the existing `.login-wrapper` grid layout as reference.
   - For forms, use `.form-panel`, `.input-wrapper`, `.login-btn` styles.
   - Include `.brand-panel` style for side panels if needed.
   - Ensure responsive behavior for 1024px, 768px, and 480px breakpoints.

5. **Components**
   - Buttons should use `.login-btn` or `.social-btn` styles.
   - Input fields should use `.input-wrapper` styles with focus, error, and success states.
   - Include role selector tabs `.role-tabs` if the page needs user roles.
   - Reuse `.toast` notifications for success/error/info messages.

6. **Navigation**
   - Pages should be simple HTML files linked via `<a>` tags.
   - Example: `index.html`, `register.html`, `landing.html`.

7. **JS Requirements**
   - Use ES Modules.
   - Separate page-specific JS files if needed (`register.js`, `landing.js`).
   - Include floating shapes and icons logic from main.js.

8. **Do Not Include**
   - Do not use React, Vue, or any framework.
   - Do not change the design system colors, fonts, or spacing.

Output the **full HTML and JS/CSS structure** for the page ready to drop into the Vite project.
