# SunilP-PowerApps-Image
High-performance PCF component to solve the "91MB Payload" problem in Power Apps using modern Image formats and Lazy Loading.

![Microsoft Community](https://img.shields.io/badge/Microsoft%20Community-Super%20User-orange?style=for-the-badge&logo=microsoft)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)
![Power Apps](https://img.shields.io/badge/Platform-Power%20Apps-0078D4?style=for-the-badge&logo=power-apps)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript)

---

### 💡 The Solution
This PCF (Power Apps Control Framework) component replaces the standard Image control to drastically reduce app memory usage and loading times, specifically for image-heavy galleries like **Pabba Jewellers**.

- **Format Negotiation**: Automatically serves **AVIF** or **WebP** instead of heavy JPEGs based on browser support.
- **Smart Internal Sorting**: Internally re-prioritizes your image array so the most efficient format is loaded first, regardless of the input order.
- **Resolution Hinting**: Uses the `sizes` attribute to prevent the browser from downloading 4K source images for small gallery thumbnails.
- **Native Lazy Loading**: Built-in `loading="lazy"` to ensure off-screen images don't impact the initial app load.

> **Note:** This is an "Ultra-Light" component designed with a zero-dependency footprint to ensure maximum execution speed within the Power Apps player.

---

## ⬇️ Get Started

**Download the latest Power Platform solution package (ZIP) to optimize your app's image delivery:**

[![Download ZIP](https://img.shields.io/badge/Download-Solution-blue?style=for-the-badge&logo=github)](https://github.com/sunilpashikanti/SunilP-PowerApps-Image/releases/latest)
[![Release](https://img.shields.io/github/v/release/sunilpashikanti/SunilP-PowerApps-Image?style=for-the-badge&logo=github&color=brightgreen)](https://github.com/sunilpashikanti/SunilP-PowerApps-Image/releases/latest)
[![Total Downloads](https://img.shields.io/github/downloads/sunilpashikanti/SunilP-PowerApps-Image/total?style=for-the-badge&color=yellow)](https://github.com/sunilpashikanti/SunilP-PowerApps-Image/releases)

---

## ✨ Features

- **Automatic MIME Detection**: Sniffs the file extension from the URL to apply correct `image/avif` or `image/webp` headers.
- **Redundancy Filtering**: Intelligently handles the fallback `<img>` tag to avoid duplicate network requests.
- **Dynamic Sizing**: Full support for CSS `width`, `height`, and `object-fit` properties via Power Apps parameters.
- **Industry Priority**: Enforces the industry standard (AVIF > WebP > PNG/JPG) even if the data source is unorganized.

---

## 📦 What’s in the Solution

- **PCF Control**: `PowerImageUltraLight`
- **Manifest**: `ControlManifest.Input.xml` (Optimized properties)
- **Styles**: `PowerImage.css` (Performance-tuned CSS)

---

## 🚀 Installation

1. **Download** the solution zip from this repo: [PowerImageUltraLight_managed.zip](https://github.com/sunilpashikanti/SunilP-PowerApps-Image/releases/latest)
2. Go to:
   **Power Apps → Solutions → Import**
3. **Upload** the ZIP file and complete the import wizard.
4. Inside your Canvas App:
   **Insert → Get more components → Code → PowerImage Ultra-Light**

---

## 🔧 How It Works (Power Fx)

To use this in a Gallery, set the `ImageSources` property using the `JSON` function to pass your available formats:

```powerapps
// ImageSources Property
JSON([
    ThisItem.AvifUrl, 
    ThisItem.WebpUrl, 
    ThisItem.JpgUrl
])
