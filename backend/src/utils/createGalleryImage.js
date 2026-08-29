import sharp from "sharp";
import path from "path";
import fs from "fs/promises";

const escapeXml = (value = "") => {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
};

const wrapText = (
    text,
    maxCharacters
) => {
    if (!text) {
        return [];
    }

    const words = String(text).trim().split(/\s+/);

    const lines = [];
    let currentLine = "";

    for (const word of words) {
        const testLine = currentLine
            ? `${currentLine} ${word}`
            : word;

        if (
            testLine.length <= maxCharacters
        ) {
            currentLine = testLine;
        } else {
            if (currentLine) {
                lines.push(currentLine);
            }

            currentLine = word;
        }
    }

    if (currentLine) {
        lines.push(currentLine);
    }

    return lines;
};

const createGalleryImage = async ({
    inputPath,
    outputPath,
    title = "",
    description = "",
}) => {
    if (!inputPath) {
        throw new Error(
            "Input image path is required."
        );
    }

    if (!outputPath) {
        throw new Error(
            "Output image path is required."
        );
    }

    const image = sharp(inputPath);

    const metadata = await image.metadata();

    const width = metadata.width || 1200;
    const height = metadata.height || 800;

    /*
    |--------------------------------------------------------------------------
    | Overlay
    |--------------------------------------------------------------------------
    */

    const overlayHeight = Math.min(
        Math.max(
            180,
            Math.round(height * 0.28)
        ),
        420
    );

    const horizontalPadding = Math.max(
        30,
        Math.round(width * 0.04)
    );

    const titleFontSize = Math.max(
        24,
        Math.round(width * 0.028)
    );

    const descriptionFontSize = Math.max(
        16,
        Math.round(width * 0.018)
    );

    const safeTitle = escapeXml(title);
    const safeDescription =
        escapeXml(description);

    /*
    |--------------------------------------------------------------------------
    | Text wrapping
    |--------------------------------------------------------------------------
    */

    const titleLines = wrapText(
        safeTitle,
        Math.max(
            20,
            Math.floor(width / 35)
        )
    );

    const descriptionLines = wrapText(
        safeDescription,
        Math.max(
            30,
            Math.floor(width / 55)
        )
    ).slice(0, 3);

    /*
    |--------------------------------------------------------------------------
    | Text positions
    |--------------------------------------------------------------------------
    */

    const titleLineHeight =
        titleFontSize * 1.2;

    const descriptionLineHeight =
        descriptionFontSize * 1.35;

    const descriptionHeight =
        descriptionLines.length *
        descriptionLineHeight;

    const titleHeight =
        titleLines.length *
        titleLineHeight;

    const totalTextHeight =
        titleHeight +
        descriptionHeight +
        20;

    const startY =
        height -
        Math.min(
            overlayHeight - 30,
            totalTextHeight + 20
        );

    /*
    |--------------------------------------------------------------------------
    | SVG text
    |--------------------------------------------------------------------------
    */

    let currentY = startY;

    const titleSvg = titleLines
        .map((line) => {
            currentY += titleLineHeight;

            return `
                <text
                    x="${horizontalPadding}"
                    y="${currentY}"
                    fill="white"
                    font-family="Arial, Helvetica, sans-serif"
                    font-size="${titleFontSize}px"
                    font-weight="700"
                >
                    ${line}
                </text>
            `;
        })
        .join("");

    currentY += 10;

    const descriptionSvg =
        descriptionLines
            .map((line) => {
                currentY +=
                    descriptionLineHeight;

                return `
                    <text
                        x="${horizontalPadding}"
                        y="${currentY}"
                        fill="white"
                        fill-opacity="0.88"
                        font-family="Arial, Helvetica, sans-serif"
                        font-size="${descriptionFontSize}px"
                    >
                        ${line}
                    </text>
                `;
            })
            .join("");

    /*
    |--------------------------------------------------------------------------
    | SVG
    |--------------------------------------------------------------------------
    */

    const svg = `
        <svg
            width="${width}"
            height="${height}"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient
                    id="bottomGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                >
                    <stop
                        offset="0%"
                        stop-color="black"
                        stop-opacity="0"
                    />

                    <stop
                        offset="100%"
                        stop-color="black"
                        stop-opacity="0.92"
                    />
                </linearGradient>
            </defs>

            <rect
                x="0"
                y="${height - overlayHeight}"
                width="${width}"
                height="${overlayHeight}"
                fill="url(#bottomGradient)"
            />

            ${titleSvg}

            ${descriptionSvg}
        </svg>
    `;

    /*
    |--------------------------------------------------------------------------
    | Ensure output directory exists
    |--------------------------------------------------------------------------
    */

    await fs.mkdir(
        path.dirname(outputPath),
        {
            recursive: true,
        }
    );

    /*
    |--------------------------------------------------------------------------
    | Generate composed image
    |--------------------------------------------------------------------------
    */

    await image
        .composite([
            {
                input: Buffer.from(svg),
                top: 0,
                left: 0,
            },
        ])
        .jpeg({
            quality: 90,
            progressive: true,
            mozjpeg: true,
        })
        .toFile(outputPath);

    return outputPath;
};

export default createGalleryImage;