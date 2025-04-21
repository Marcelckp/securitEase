// --- Third Party Imports ---
import { useEffect } from 'react';

export const useHotKey = () => {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            console.log('Key pressed:', e.key);
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                const dialog = document.getElementById(
                    "location-dialog"
                ) as HTMLDialogElement | null;
                if (dialog && typeof dialog.showModal === "function") {
                    dialog.showModal();
                    setTimeout(() => {
                        const input = document.getElementById(
                            "location-input"
                        ) as HTMLInputElement | null;
                        if (input) input.focus();
                    }, 0);
                }
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    // return;
};
