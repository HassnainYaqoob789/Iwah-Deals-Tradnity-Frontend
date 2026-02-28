# Project Setup Guide

This guide helps you get started with installing, running, and building the project on **Windows (CMD)**.

---

## 🚀 Getting Started

### 1️⃣ Install Dependencies

Open **Command Prompt** and run:

```bash
npm i --force
```

This forces the installation of all required dependencies.

---

### 2️⃣ Start the Development Server

Run the following command in **CMD**:

```cmd
cmd /C "set NODE_OPTIONS=--openssl-legacy-provider && npm start"
```

This sets the OpenSSL legacy provider temporarily and starts the development server.

---

### 3️⃣ Build the Application for Production

To generate a production build:

```cmd
cmd /C "set NODE_OPTIONS=--openssl-legacy-provider && npm run build"
```
After build configure build by referencing video 

```cmd
https://alisonstechno.sharepoint.com/:v:/s/Tradnity/ESbso9MZrrpJu5eBIaTXjCsBtGQaMBu9oFlgbdcgqOy-gw?e=iKzMo3
```
---

## 📝 Notes

- These commands are for **Windows Command Prompt** (`cmd.exe`).
- If you're using **PowerShell**, use:

```powershell
$env:NODE_OPTIONS="--openssl-legacy-provider"; npm start
```

- On **Linux/macOS**, use:

```bash
NODE_OPTIONS=--openssl-legacy-provider npm start
```

> The `--openssl-legacy-provider` flag is necessary for compatibility with certain Node.js versions (especially 17+).

---
