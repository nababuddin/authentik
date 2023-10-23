import "@goauthentik/elements/messages/MessageContainer";
import { Meta } from "@storybook/web-components";

import { TemplateResult, html, render } from "lit";

import "./ak-input-select-multiple";
import AkInputSelectMultiple from "./ak-input-select-multiple";

const metadata: Meta<AkInputSelectMultiple> = {
    title: "Components / Multi-Select",
    component: "ak-input-select-multiple",
    parameters: {
        docs: {
            description: {
                component: "A stylized component for selecting multiple values from a list",
            },
        },
    },
};

export default metadata;

const container = (testItem: TemplateResult) =>
    html` <div style="background: #fff; padding: 2em">
        <style>
            li {
                display: block;
            }
            p {
                margin-top: 1em;
            }
        </style>

        ${testItem}

        <div id="message-pad" style="margin-top: 1em"></div>
    </div>`;

const testOptions = [
    ["funky", "Option One: Funcky"],
    ["strange", "Option Two: Strange"],
    ["weird", "Option Three: Weird"],
];

export const Default = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const displayChange = (ev: any) => {
        const component: AkInputSelectMultiple | null = document.querySelector(
            'ak-input-select-multiple[name="ak-test-select-multiple"]'
        );

        const results = html`
            <p>Results from event:</p>
            <ul style="list-style-type: disc">
                ${ev.detail.map((v: string) => html`<li>${v}</li>`)}
            </ul>
            <p>Results from component:</p>
            <ul style="list-style-type: disc">
                ${component!.akValue.map((v: string) => html`<li>${v}</li>`)}
            </ul>
        `;

        render(results, document.getElementById("message-pad")!);
    };

    return container(
        html`<ak-input-select-multiple
            name="ak-test-select-multiple"
            label="Choose Your Flavor"
            @ak-select=${displayChange}
            help="This is a test. This is only a test."
            .options=${testOptions}
            .values=${["weird"]}
        ></ak-input-select-multiple>`
    );
};
