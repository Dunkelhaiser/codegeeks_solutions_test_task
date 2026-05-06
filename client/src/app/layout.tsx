import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { Metadata } from "next";
import ThemeRegistry from "@/components/ThemeRegistry";

export const metadata: Metadata = {
    title: "Event Management System",
    description: "An application for managing events",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <AppRouterCacheProvider>
                    <ThemeRegistry>{children}</ThemeRegistry>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
