
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Kryptografia',
    icons: {
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%23808080"/></svg>',
    },
};

export default function PDFLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
        </>
    );
}
