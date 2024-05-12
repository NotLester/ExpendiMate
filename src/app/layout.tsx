import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/providers/query-provider";
import { SheetProvider } from "@/providers/sheet-provider";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "ExpendiMate",
	description: "Your new app to manage your expenses and income.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={inter.className}>
					<SheetProvider />
					<Toaster />
					<QueryProvider>{children}</QueryProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}

