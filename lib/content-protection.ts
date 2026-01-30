import crypto from "crypto";

/**
 * Generate a signed URL for content access
 * Expires after a specified duration
 */
export function generateSignedUrl(
    contentId: string,
    userId: string,
    expiresIn: number = 3600 // 1 hour default
): string {
    const secret = process.env.NEXTAUTH_SECRET || "fallback-secret";
    const expiresAt = Date.now() + expiresIn * 1000;

    // Create signature
    const data = `${contentId}:${userId}:${expiresAt}`;
    const signature = crypto
        .createHmac("sha256", secret)
        .update(data)
        .digest("hex");

    // Build URL
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3001";
    const url = new URL(`${baseUrl}/api/content/stream`);
    url.searchParams.set("id", contentId);
    url.searchParams.set("user", userId);
    url.searchParams.set("expires", expiresAt.toString());
    url.searchParams.set("signature", signature);

    return url.toString();
}

/**
 * Verify a signed URL
 */
export function verifySignedUrl(
    contentId: string,
    userId: string,
    expiresAt: string,
    signature: string
): boolean {
    const secret = process.env.NEXTAUTH_SECRET || "fallback-secret";

    // Check expiration
    if (Date.now() > parseInt(expiresAt)) {
        return false;
    }

    // Verify signature
    const data = `${contentId}:${userId}:${expiresAt}`;
    const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(data)
        .digest("hex");

    return signature === expectedSignature;
}

/**
 * Generate watermark text for content
 * Includes username, IP, and timestamp
 */
export function generateWatermarkText(
    username: string,
    ipAddress: string,
    timestamp?: Date
): string {
    const date = timestamp || new Date();
    const dateStr = date.toISOString().split("T")[0];
    const timeStr = date.toTimeString().split(" ")[0];

    return `${username} • ${ipAddress} • ${dateStr} ${timeStr}`;
}

/**
 * Generate DRM key for content encryption
 */
export function generateDRMKey(): { keyId: string; key: string } {
    const keyId = crypto.randomBytes(16).toString("hex");
    const key = crypto.randomBytes(32).toString("base64");

    return { keyId, key };
}

/**
 * Encrypt content with AES-256
 */
export function encryptContent(content: Buffer, key: string): Buffer {
    const algorithm = "aes-256-cbc";
    const keyBuffer = Buffer.from(key, "base64");
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, keyBuffer, iv);
    const encrypted = Buffer.concat([cipher.update(content), cipher.final()]);

    // Prepend IV to encrypted data
    return Buffer.concat([iv, encrypted]);
}

/**
 * Decrypt content with AES-256
 */
export function decryptContent(encryptedContent: Buffer, key: string): Buffer {
    const algorithm = "aes-256-cbc";
    const keyBuffer = Buffer.from(key, "base64");

    // Extract IV from beginning
    const iv = encryptedContent.slice(0, 16);
    const encrypted = encryptedContent.slice(16);

    const decipher = crypto.createDecipheriv(algorithm, keyBuffer, iv);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);

    return decrypted;
}

/**
 * Check if user has access to content
 */
export async function checkContentAccess(
    userId: string,
    contentId: string,
    prisma: any
): Promise<{ hasAccess: boolean; reason?: string }> {
    // Get content
    const content = await prisma.content.findUnique({
        where: { id: contentId },
        include: { creator: true },
    });

    if (!content) {
        return { hasAccess: false, reason: "Content not found" };
    }

    // Check if user is the creator
    if (content.creatorId === userId) {
        return { hasAccess: true };
    }

    // Check visibility
    if (content.visibility === "PUBLIC") {
        return { hasAccess: true };
    }

    if (content.visibility === "SUBSCRIBERS") {
        // Check if user has active subscription
        const subscription = await prisma.subscription.findFirst({
            where: {
                fanId: userId,
                creatorId: content.creatorId,
                active: true,
                expiresAt: { gt: new Date() },
            },
        });

        if (subscription) {
            return { hasAccess: true };
        }

        return { hasAccess: false, reason: "Subscription required" };
    }

    if (content.visibility === "PPV") {
        // Check if user has purchased
        const purchase = await prisma.purchase.findFirst({
            where: {
                fanId: userId,
                contentId,
                unlocked: true,
            },
        });

        if (purchase) {
            // Check view limit
            if (content.viewLimit && purchase.viewCount >= content.viewLimit) {
                return { hasAccess: false, reason: "View limit reached" };
            }

            return { hasAccess: true };
        }

        return { hasAccess: false, reason: "Purchase required" };
    }

    return { hasAccess: false, reason: "Access denied" };
}

/**
 * Track content view
 */
export async function trackContentView(
    userId: string,
    contentId: string,
    prisma: any
): Promise<void> {
    // Update purchase view count
    await prisma.purchase.updateMany({
        where: {
            fanId: userId,
            contentId,
        },
        data: {
            viewCount: { increment: 1 },
        },
    });

    // Update content total views
    await prisma.content.update({
        where: { id: contentId },
        data: {
            currentViews: { increment: 1 },
        },
    });
}
