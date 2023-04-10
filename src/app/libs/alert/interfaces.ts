import { ReactNode } from "react";

export interface IAlert {
    children: ReactNode;
    classes:  "primary" | "secondary" | "success" | "warning" | "danger" | "info"
    dismissing?: IDismissing;
}

export interface IDismissing {
    isDismissible: boolean;
    classes: "alert-dismissible fade show";
    onEmitEvent: () => void;
}
