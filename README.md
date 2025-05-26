# Vue Simostack

![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![Static Site](https://img.shields.io/badge/Static%20Site-blueviolet?style=for-the-badge)
![Raspberry Pi](https://img.shields.io/badge/Raspberry%20Pi-A22846?style=for-the-badge&logo=raspberry-pi&logoColor=white)

This is my personal static website, completely rebuilt with **Vue.js**. It now features **Vue Router** for smooth navigation and integrates with a **blog API** hosted on my **Raspberry Pi** for dynamic content.

---

## What It Does

- **Vue.js Frontend:** The entire site is built using Vue.js for a modern and responsive user experience.
- **Vue Router:** Handles client-side routing, giving it a single-page application feel.
- **Static Site Deployment:** Uses **GitHub Actions** for automated CI/CD, deploying the site to **GitHub Pages** (or your chosen static host) with every push.
- **Raspberry Pi Blog API:** Blog posts are fetched from a custom backend API running on my Raspberry Pi, allowing for easy updates.

---

## Get It Running

### Prerequisites

You'll need Node.js and npm (or Yarn) installed.

### Installation

1.  Clone the repository:
    ```bash
    git clone [https://github.com/Simodalstix/vue-simostack.git](https://github.com/Simodalstix/vue-simostack.git)
    cd vue-simostack
    ```
2.  Install dependencies:

    ```bash
    npm install

    ```

3.  Run the development server:

    ```bash
    npm run serve

    ```

This will typically start the site at `http://localhost:8080`.

---

## Blog API

The blog content comes from a custom API hosted on my **Raspberry Pi**.
