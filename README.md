# Simostack — Vue Edition

A modular, single-page portfolio site built with **Vue.js**, designed to showcase professional projects and hands-on experience with modern web and cloud technologies.

## Overview

This site is statically deployed and uses Vue Router for client-side navigation. Blog content is pulled dynamically from a lightweight API hosted on a Raspberry Pi, with a serverless visitor counter powered by AWS Lambda and DynamoDB.

## Highlights

- **Vue 3 + Vite** frontend with modular components (e.g. `BaseModal`, `ProjectCard`)
- **Vue Router** for clean SPA routing
- **Self-hosted Blog API** delivering dynamic content from a Raspberry Pi
- **CI/CD via GitHub Actions**, deployed to AWS S3 + CloudFront
- **Serverless backend** (Lambda, API Gateway, DynamoDB) for lightweight telemetry

## Purpose

This project serves as a personal sandbox to grow deeper with Vue and full-stack integrations. Every element — from component structure to deployment pipeline — reflects an emphasis on modularity, maintainability, and real-world readiness.

## Author

**Simon Parker**  
[simostack.com](https://simostack.com)  
[github.com/Simodalstix](https://github.com/Simodalstix)
