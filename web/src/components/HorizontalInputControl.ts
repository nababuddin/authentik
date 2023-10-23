import { AKElement } from "@goauthentik/elements/Base";

import { type TemplateResult, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { map } from "lit/directives/map.js";

import PFForm from "@patternfly/patternfly/components/Form/form.css";
import PFFormControl from "@patternfly/patternfly/components/FormControl/form-control.css";
import PFBase from "@patternfly/patternfly/patternfly-base.css";

const akFormGroupStyle = css`
    .pf-c-form__group {
        display: grid;
        grid-template-columns:
            var(--pf-c-form--m-horizontal__group-label--md--GridColumnWidth)
            var(--pf-c-form--m-horizontal__group-control--md--GridColumnWidth);
    }
    .pf-c-form__group-label {
        padding-top: var(--pf-c-form--m-horizontal__group-label--md--PaddingTop);
    }
`;

type Help = string | TemplateResult;

export class HorizontalInputControl<T> extends AKElement {
    @property()
    label = "";

    @property({ type: Boolean })
    required = false;

    static get styles() {
        return [PFBase, PFForm, PFFormControl, akFormGroupStyle];
    }

    @property({ attribute: false })
    errorMessages: string[] = [];

    @property({ type: String })
    help?: string;

    @property({ type: Array })
    richhelp?: TemplateResult;

    @property({ type: String })
    name?: string;

    firstUpdated() {
        this.dataset.akInputControl = "true";
    }
    
    renderHelp() {
        return html`${[
            this.help ? html`<p class="pf-c-form__helper-text">${this.help}</p>` : nothing,
            this.richhelp ? this.richhelp : nothing,
        ]}`;
    }

    renderControl() {
        throw new Error("Override in child classes");
    }

    get akValue(): T {
        throw new Error("Override in child classes");
    }

    render() {
        // It really wants to re-arrange the function calls. Don't let it.
        // prettier-ignore
        return html`<div class="pf-c-form pf-c-form__group">
            <div class="pf-c-form__group-label">
                <label class="pf-c-form__label">
                    <span class="pf-c-form__label-text">${this.label}</span>
                    ${this.required
                        ? html`<span class="pf-c-form__label-required" aria-hidden="true">*</span>`
                        : nothing}
                </label>
            </div>
            <div class="pf-c-form__group-control">
                ${this.renderControl()} 
                ${this.renderHelp()}
                <div class="pf-c-form__horizontal-group">
                    ${map(
                        this.errorMessages,
                        (message) =>
                            html`<p
                                class="pf-c-form__helper-text pf-m-error"
                                aria-live="polite"
                            ></p>`
                    )}
                </div>
            </div>
        </div>`;
    }
}

export default HorizontalInputControl;
