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
        const { AVIFSource, WebPSource, JPEGSource, AltText } = context.parameters;

        // 1. Get allocated dimensions from the Power Apps container
        const ImageWidth = context.mode.allocatedWidth !== -1 ? `${context.mode.allocatedWidth}px` : "100%";
        const ImageHeight = context.mode.allocatedHeight !== -1 ? `${context.mode.allocatedHeight}px` : "100%";

        this._container.innerHTML = "";
        //if (!ImageSources.raw) return;

        try {
            // 2. Build the HTML String for the Picture element
            // We use a template literal to keep it clean
            this._container.innerHTML = `
                <picture style="width: ${ImageWidth}; height: ${ImageHeight}; display: block;">
                    ${AVIFSource.raw ? `<source srcset="${AVIFSource.raw}" type="image/avif" alt="${AltText.raw}">` : ""}
                    ${WebPSource.raw ? `<source srcset="${WebPSource.raw}" type="image/webp" alt="${AltText.raw}">` : ""}
                    <img 
                        src="${JPEGSource.raw}" 
                        alt="${AltText.raw}" 
                        loading="lazy" 
                        style="width: 100%; height: 100%; object-fit: cover; display: block;"
                    />
                </picture>
            `;

            this._container.style.width = ImageWidth;
            this._container.style.height = ImageHeight;
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