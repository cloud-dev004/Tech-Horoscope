# Peratchi Manikandan | Personal Portfolio

A premium, high-performance personal portfolio built with React and Framer Motion. This project showcases my professional experience, featured projects, tech stack, and development philosophy through an immersive, cinematic user experience.

## ✨ Features

- **Cinematic 3D Animations**: Custom Framer Motion scroll animations and Parallax bridges.
- **Fully Responsive**: Pixel-perfect scaling from 1440px desktop down to 320px mobile.
- **Dark Theme Optimized**: High contrast typography and custom glow layouts.
- **Dynamic Projects Showcase**: Carousel style presentation with direct GitHub and Live URL links.
- **Secure Contact Form**: Serverless messaging via Web3Forms with strict Zod validation.
- **PDF Resume Viewer**: Seamless resume opening functionality built right in.

## 🛠️ Tech Stack

- **Core**: React 19, Vite
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion, GSAP
- **Validation**: Zod, React Hook Form
- **State**: Zustand
- **Icons**: Lucide React
- **Email Service**: Web3Forms API

## 🚀 Running Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add your Web3Forms access key:
   ```env
   VITE_WEB3FORMS_ACCESS_KEY=your_api_key_here
   ```
   *(See `.env.example` for reference)*

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 📦 Build for Production

To create an optimized production build:

```bash
npm run build
```
This command outputs the production-ready static files into the `dist/` directory.

## 🌍 Deployment

This Vite SPA is deployment-ready for standard platforms like:
- **Vercel**: Import the GitHub repo; the build settings (`npm run build`, `dist` directory) will configure automatically.
- **Netlify**: Same as above. Remember to set the `VITE_WEB3FORMS_ACCESS_KEY` environment variable in the dashboard.
- **GitHub Pages**: Ensure your `vite.config.js` `base` path is configured correctly.

## 📄 License

This project is licensed under the MIT License.
