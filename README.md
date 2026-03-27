# Emplora Frontend

Emplora is an open-source platform dedicated to enhancing workplace transparency in Nigeria. By providing a space for reviewing and rating employers, we empower job seekers with authentic insights and encourage organizations to maintain high workplace standards. This project is built collaboratively by the **Loeth** community.

---

## 🚀 Getting Started

To get a local copy up and running, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone git@github.com:LoethTechnology/Emplora-Frontend.git
   ```
2. **Install dependencies:**
   ```bash
   cd Emplora-Frontend/
   npm install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```
4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the result.

---

## 📂 Project Structure

This project uses the **Next.js App Router** architecture. Understanding the directory layout is key to contributing effectively:

### `app/` (Core Routing)
The `app` directory uses **Route Groups** (folders in parentheses like `(auth)`) to organize routes without affecting the URL path.

- **`(auth)/`**: Handles authentication-related pages.
  - `login/`: The sign-in page.
  - `register/`: The sign-up page.

- **`(dashboard)/`**: Contains protected routes for authenticated users.
  - `dashboardHome/`: The user's main overview.
  - `setting/`: User profile and account preferences.

- **`(public)/`**: Routes accessible to everyone.
  - `about/`: Information about the Emplora mission.
  - `contact/`: Support and contact forms.

- **`layout.tsx`**: The root layout that wraps all pages.
- **`globals.css`**: Global Tailwind CSS styles.

### `components/` (Reusable UI)
Small, modular UI elements are stored here to keep the code DRY (Don't Repeat Yourself).
- **`buttons/`**: Standardized buttons like `registerBtn` and `signInBtn`.
- **`navbar/`**: The primary navigation component.
- **`footer/`**: The site-wide footer component.

### Other Directories
- **`images/`**: Static assets organized by page (e.g., `home/`, `about/`).
- **`docs/`**: Project documentation, including the MVP specification and Figma design links.

---

## 🤝 How to Contribute

We welcome contributions from developers of all skill levels!

### 1. Identify a Task
Check the GitHub Issues or the MVP document in the `docs/` folder to see what needs to be built.

### 2. Branching Strategy
- Always create a new branch from `dev` for your features or fixes.
- Use descriptive names: `feature/add-login-validation` or `fix/navbar-mobile-padding`..

### 3. Coding Standards
- **Consistency:** Follow the existing project structure and naming conventions.
- **Components:** If a UI element is used more than once, create a reusable component in the `components/` folder.
- **Styling:** We use **Tailwind CSS**. Avoid writing inline styles or custom CSS unless absolutely necessary.

### 4. Submitting Your Changes
1. **Commit your changes:** Use clear, concise commit messages.
2. **Push to GitHub:** Push your branch to the origin repository.
3. **Open a Pull Request (PR):** Target the `dev` branch. Provide a detailed description of what you changed and why.

---

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information (if applicable).

---
*Built with ❤️ by the Loeth Community.*
