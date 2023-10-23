import { css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { Ref, createRef, ref } from "lit/directives/ref.js";

import HorizontalInputControl from "../HorizontalInputControl";

type Pair = [string, string];

const selectStyles = css`
    select[multiple] {
        min-height: 15rem;
    }
`;

@customElement("ak-input-select-multiple")
export class AkInputSelectMultiple extends HorizontalInputControl<string[]> {
    static get styles() {
        return [...super.styles, selectStyles];
    }

    @property({ attribute: false })
    options: Pair[] = [];

    @property({ attribute: false })
    values: string[] = [];

    selectRef: Ref<HTMLSelectElement> = createRef();

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    get akValue() {
        return this.values;
    }

    handleChange(ev: Event) {
        if (ev.type === "change") {
            ev.stopPropagation();
            this.values = Array.from(this.selectRef.value!.querySelectorAll("option"))
                .filter(option => option.selected)
                .map(option => option.value);
            this.dispatchEvent(new CustomEvent("ak-select", { detail: this.values }));
        }
    }

    renderControl() {
        return html`<select
            part="select"
class="pf-c-form-control"
name=${ifDefined(this.name)}
            multiple
            ${ref(this.selectRef)}
            @change=${this.handleChange}
        >
            ${map(
                this.options,
                ([value, label]) =>
                    html`<option value=${value} ?selected=${this.values.includes(value)}>
                        ${label}
                    </option>`
            )}
        </select>`;
    }
}

export default AkInputSelectMultiple;
