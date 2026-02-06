#  AI Cover Letter Generator

> A Next.js SaaS application that uses Google Gemini AI to generate personalized, professional cover letters by analyzing your PDF resume and a specific job description.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Gemini AI](https://img.shields.io/badge/Google%20Gemini-2.5%20Flash-orange)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-3.4-cyan)

## Features

* **PDF Parsing**: secure server-side extraction of text from PDF resumes using `pdf2json` (no external OCR APIs needed).
* **AI-Powered Writing**: Utilizes Google's **Gemini 1.5 Flash** model to write context-aware cover letters.
* **Smart Context Integration**: Dynamically maps candidate skills from the resume to the specific requirements in the Job Description.
* **Modern UI**: Built with Tailwind CSS, featuring loading states, gradients, and a "Copy to Clipboard" utility.
* **Secure Architecture**: API keys are protected server-side; file processing happens in memory.

---

## Tech Stack

* **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **AI Model**: [Google Generative AI SDK](https://www.npmjs.com/package/@google/generative-ai) (Gemini 1.5 Flash)
* **PDF Processing**: [pdf2json](https://www.npmjs.com/package/pdf2json)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)

---

## Getting Started

Follow these steps to set up the project locally.

### 1. Prerequisites
* Node.js (v18 or higher)
* A Google AI Studio API Key (Free)

