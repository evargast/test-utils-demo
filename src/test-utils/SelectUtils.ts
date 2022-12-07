import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

class Select {
    trigger: HTMLElement;

    constructor(selectTrigger: HTMLElement) {
        this.trigger = selectTrigger;
    }

    async click(): Promise<void> {
        await userEvent.click(this.trigger);
    }

    /**
     * Supports KeyboardEvent.key and KeyboardEvent.code.
     * @param key KeyboardEvent.key should wrap the desired key in {}, i.e. {Shift}.
     * @param key KeyboardEvent.code should wrap the desired key in [], i.e. [ShiftLeft].
     */
    async keyPress(key: string): Promise<void> {
        await userEvent.keyboard(key);
    }

    async getOptions(): Promise<HTMLElement[]> {
        await this.click();
        const listbox = screen.getByRole("listbox");
        return within(listbox).getAllByRole("option");
    }

    async selectItem(targetText: string): Promise<void> {
        await this.click();
        await userEvent.click(screen.getByText(targetText));
    }
}

export { Select };
