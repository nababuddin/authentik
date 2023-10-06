import { MessageLevel } from "@goauthentik/common/messages";
import { showMessage } from "@goauthentik/elements/messages/MessageContainer";

import { isSafari } from "./isSafari";

export function writeToClipboard(message: string, withMessage = false, level = MessageLevel.info, description?: string) {
    // Insecure origins may not have access to the clipboard. Show a message instead.

    const doWithMessage = () => showMessage({
        level,
        message,
        description,
    });

    if (!navigator.clipboard) {
        doWithMessage();
        return;
    }

    // Safari only allows navigator.clipboard.write with native clipboard items.
    if (isSafari()) {
        navigator.clipboard.write([
            new ClipboardItem({
                "text/plain": new Blob([message], {
                    type: "text/plain",
                }),
            }),
        ]);
    } else {
        navigator.clipboard.writeText(message);
    }

    if (withMessage) {
        doWithMessage();
    }
}
