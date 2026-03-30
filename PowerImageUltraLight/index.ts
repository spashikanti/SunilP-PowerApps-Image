import { IInputs, IOutputs } from "./generated/ManifestTypes";

interface IImageSource {
    url: string;
    type: string;
}

// Define the priority ranking
const PRIORITY_MAP: Record<string, number> = {
    'image/avif': 1,
    'image/webp': 2,
    'image/png': 3,
    'image/jpeg': 4,
    'image/gif': 5
};

export class PowerImageUltraLight implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _container: HTMLDivElement;

    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        this._container = container;
    }

    // Helper to get image type from URL extension
    private getMimeType(url: string): string {
        const extension = url.split('.').pop()?.toLowerCase();
        switch (extension) {
            case 'avif': return 'image/avif';
            case 'webp': return 'image/webp';
            case 'png': return 'image/png';
            case 'gif': return 'image/gif';
            default: return 'image/jpeg';
        }
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        const { ImageSources, AltText, Sizes, ImageWidth, ImageHeight } = context.parameters;

        this._container.innerHTML = "";
        if (!ImageSources.raw) return;

        try {
            const rawUrls: string[] = JSON.parse(ImageSources.raw);
            if (rawUrls.length === 0) return;

            // 1. Map URLs to their types and ranks / Sort by performance priority
            const sortedSources = rawUrls.map(url => ({
                url: url,
                type: this.getMimeType(url),
                rank: PRIORITY_MAP[this.getMimeType(url)] || 99
            })).sort((a, b) => a.rank - b.rank);

            const picture = document.createElement("picture");

            // 2. Only create <source> tags for MODERN formats (Rank < 3: AVIF/WebP).
            // Append <source> tags in the correct priority order (AVIF -> WebP -> JPG)
            sortedSources.filter(src => src.rank < 3).forEach(src => {
                const sourceTag = document.createElement("source");
                sourceTag.srcset = src.url;
                sourceTag.type = src.type;
                // This satisfies: "the sizes attribute reduces the number of pixels downloaded"
                if (Sizes.raw) sourceTag.sizes = Sizes.raw;
                picture.appendChild(sourceTag);
            });

            // 3. Find the best legacy fallback for the <img> tag (Rank >= 3: JPG/PNG)
            const fallback = sortedSources.find(s => s.rank >= 3) || sortedSources[0];

            // The safety net that completes the 'Ultra-Light' strategy
            const img = document.createElement("img");
            img.src = fallback.url;
            img.alt = AltText.raw || "";
            img.loading = "lazy";

            // Apply dynamic sizing, Explicitly apply the styles from your inputs
            img.style.width = ImageWidth.raw || "100%";
            img.style.height = ImageHeight.raw || "auto";
            img.style.objectFit = "cover";

            picture.appendChild(img);
            this._container.appendChild(picture);

        } catch (e) {
            console.error("PowerImage Ultra-Light: JSON error", e);
        }
    }

    public getOutputs(): IOutputs {
        // No outputs required for this visual-only component control
        return {};
    }
    public destroy(): void {
        // No cleanup needed for this stateless component control
        // For native HTML elements, the browser handles the cleanup automatically when the DOM node is removed.
    }
}