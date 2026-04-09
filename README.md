# SunilP-PowerApps-Image
High-performance PCF component to solve the "91MB Payload" problem in Power Apps using modern Image formats and Lazy Loading.

![Microsoft Community](https://img.shields.io/badge/Microsoft%20Community-Super%20User-orange?style=for-the-badge&logo=microsoft)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)
![Power Apps](https://img.shields.io/badge/Platform-Power%20Apps-0078D4?style=for-the-badge&logo=power-apps)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript)

---

### 💡 The Solution
This PCF (Power Apps Control Framework) component replaces the standard Image control to drastically reduce app memory usage and loading times. It is specifically designed for image-heavy galleries where standard JPEG/PNG assets cause performance bottlenecks.

- **Format Negotiation**: Uses the HTML5 `<picture>` tag to serve **AVIF** or **WebP** automatically based on browser support.
- **Native Container Sizing**: The component automatically inherits dimensions (Width/Height) directly from the Power Apps canvas settings.
- **Native Lazy Loading**: Built-in `loading="lazy"` ensures off-screen images don't impact initial app load.
- **Zero-Dependency**: Built with an "Ultra-Light" footprint for maximum execution speed.

---

## ⬇️ Get Started

**Download the latest Power Platform solution package (ZIP) to optimize your app's image delivery:**

[![Download ZIP](https://img.shields.io/badge/Download-Solution-blue?style=for-the-badge&logo=github)](https://github.com/sunilpashikanti/SunilP-PowerApps-Image/releases/latest)
[![Release](https://img.shields.io/github/v/release/sunilpashikanti/SunilP-PowerApps-Image?style=for-the-badge&logo=github&color=brightgreen)](https://github.com/sunilpashikanti/SunilP-PowerApps-Image/releases/latest)

<video src="SunilP-PowerApps-Image.mp4" controls="controls" muted="muted" autoplay="autoplay" loop="loop" style="max-width: 100%;">
  Your browser does not support the video tag.
</video>

![PowerImage Demo](SunilP-PowerApps-Image.mp4)

---

## ✨ Features

- **No Complex Formulas**: Pass URLs directly as text properties, no JSON formatting or string concatenation required.
- **Auto-Sizing**: Respects the Width and Height properties of the control within the Power Apps Studio.
- **Fail-safe Fallback**: Always falls back to standard JPEG/PNG if modern formats aren't available.
- **Accessibility**: Built-in support for dynamic Alt-Text for screen readers.

---

## 📦 What’s in the Solution

- **Managed & Unmanaged ZIPs**: Both versions included for easy deployment.
- **Manifest**: `ControlManifest.Input.xml` (Optimized property schema)
- **Solution Name**: `SunilP Power Image Solution`
- **Unique Name**: `SunilP Power Image Solution`
- **Publisher**: `SunilP` (Prefix: `sunilp`)
- **Version**: `1.0`
- **Components**: PCF Control (`PowerImageUltraLight`)

---

## 🚀 Installation

1. **Download** the solution zip from the [Releases](https://github.com/sunilpashikanti/SunilP-PowerApps-Image/releases) page:
   - Use `SunilP Power Image Solution_managed.zip` for **Production/Test** environments.
   - Use `SunilP Power Image Solution.zip` for **Development** environments.
2. Go to **Power Apps → Solutions → Import**.
3. **Upload** the ZIP file and complete the import.
4. Inside your Canvas App:
   **Insert → Get more components → Code → SunilP PowerImage**.

---

## 🔧 How It Works (Power Fx)

Map your data source fields directly to the component properties in the property pane. 

```powerapps
// Example configuration in a Gallery
AVIFSource: ThisItem.AvifUrl
WebPSource: ThisItem.WebpUrl
JPEGSource: ThisItem.JpgUrl
AltText:    ThisItem.Title
```
## ⚙️ Input Parameters

| Property | Display Name | Required | Description |
| :--- | :--- | :--- | :--- |
| **AVIFSource** | AVIF Source | No | The URL for the .avif version (Best compression). |
| **WebPSource** | WebP Source | No | The URL for the .webp version (Modern standard). |
| **JPEGSource** | JPEG Source | **Yes** | The fallback URL (Standard JPEG/PNG). |
| **AltText** | Alt Text | No | Accessibility description for screen readers. |

> **Note on Dimensions:** This component is designed to be responsive. Use the standard **Width** and **Height** handles or properties in the Power Apps property pane to resize the image; the internal logic handles the scaling automatically.

---

## 🏗️ Architecture Detail
The component follows the **"Performance First"** principle:
1. **Multi-Source Stack:** It builds a prioritized HTML5 stack using the `<picture>` element.
2. **Browser Intelligence:** The browser automatically chooses the first supported format in this order: **AVIF > WebP > JPEG**.
3. **Container Sync:** The TypeScript `updateView` lifecycle detects the `allocatedWidth` and `allocatedHeight` from the Power Apps host and scales the image internally with `object-fit: cover` for a seamless UI.

---

## 🧰 Troubleshooting

**❗ Image not showing up**
- Verify the URL is publicly accessible or has the correct CORS headers for your Power Apps domain.
- Ensure the **JPEG Source** is provided, as it is a required field for the fallback logic.

**❗ Browser still loading JPEG instead of AVIF**
- Open **DevTools (F12) → Network** tab. If the browser is older (e.g., legacy Edge), it will default to the JPEG fallback.
- Check the **Type** column in DevTools to verify if `webp` or `avif` is being served to modern browsers.

**❗ Layout Shift (Jumping Content)**
- To prevent layout shift, ensure the control has a fixed size in your Gallery. This reserves the space on the canvas before the image finishes downloading.

---

## 🤝 Contributing
Contributions are welcome!
- File **Issues** for bugs or feature requests.
- Submit **Pull Requests** for performance optimizations or new format support.

---

## 🤝 Community & Contribution
As a **Power Platform Super User**, I build these components to solve real-world architectural bottlenecks. Whether it's optimizing payload sizes or enhancing UI responsiveness, I'm always looking for better patterns. If you have ideas or optimizations, feel free to open a Pull Request!

# 👤 Author

<table style="border: none;">
  <tr>
    <td style="border: none;">
      <strong>Sunil Kumar Pashikanti</strong><br>
      <em>Principal Architect | Microsoft Power Platform Super User</em><br><br>

[![Community](https://img.shields.io/badge/Community-View%20Profile-indigo?style=for-the-badge&logo=microsoft)](https://community.powerplatform.com/profile/?userid=8077d18b-7b47-ee11-be6d-6045bdebe084)
&nbsp;
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/sunil-kumar-pashikanti/)
&nbsp;
[![Blog](https://img.shields.io/badge/Blog-Blogger-FF5722?style=for-the-badge&logo=blogger)](http://sunilpashikanti.blogspot.com)
&nbsp;
[![Website](https://img.shields.io/badge/Portfolio-Visit-yellow?style=for-the-badge&logo=google-chrome)](https://sunilpashikanti.com)

</td>
  </tr>
</table>

**Support the Project:** If this solution helped you, please consider giving it a ⭐ to help others find it!
