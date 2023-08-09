import { Meta } from "@storybook/web-components";

import { TemplateResult, html } from "lit";

import "../ak-application-wizard-application-details";
import AkApplicationWizardApplicationDetails from "../ak-application-wizard-application-details";
import "../ak-application-wizard-authentication-method-choice";
import "../ak-application-wizard-context";
import "../ldap/ak-application-wizard-authentication-by-ldap";
import "../oauth/ak-application-wizard-authentication-by-oauth";
import "../proxy/ak-application-wizard-authentication-for-reverse-proxy";
import "../proxy/ak-application-wizard-authentication-for-single-forward-proxy";
import "../saml/ak-application-wizard-authentication-by-saml-configuration";
import "../saml/ak-application-wizard-authentication-by-saml-import";
import "./ak-application-context-display-for-test";
import {
    dummyAuthenticationFlowsSearch,
    dummyAuthorizationFlowsSearch,
    dummyCoreGroupsSearch,
    dummyCryptoCertsSearch,
    dummyHasJwks,
    dummyPropertyMappings,
    dummyProviderTypesList,
    dummySAMLProviderMappings,
} from "./samples";

const metadata: Meta<AkApplicationWizardApplicationDetails> = {
    title: "Elements / Application Wizard / Page 1",
    component: "ak-application-wizard-application-details",
    parameters: {
        docs: {
            description: {
                component: "The first page of the application wizard",
            },
        },
        mockData: [
            {
                url: "/api/v3/providers/all/types/",
                method: "GET",
                status: 200,
                response: dummyProviderTypesList,
            },
            {
                url: "/api/v3/core/groups/?ordering=name",
                method: "GET",
                status: 200,
                response: dummyCoreGroupsSearch,
            },

            {
                url: "/api/v3/crypto/certificatekeypairs/?has_key=true&include_details=false&ordering=name",
                method: "GET",
                status: 200,
                response: dummyCryptoCertsSearch,
            },
            {
                url: "/api/v3/flows/instances/?designation=authentication&ordering=slug",
                method: "GET",
                status: 200,
                response: dummyAuthenticationFlowsSearch,
            },
            {
                url: "/api/v3/flows/instances/?designation=authorization&ordering=slug",
                method: "GET",
                status: 200,
                response: dummyAuthorizationFlowsSearch,
            },
            {
                url: "/api/v3/propertymappings/scope/?ordering=scope_name",
                method: "GET",
                status: 200,
                response: dummyPropertyMappings,
            },
            {
                url: "/api/v3/sources/oauth/?has_jwks=true&ordering=name",
                method: "GET",
                status: 200,
                response: dummyHasJwks,
            },
            {
                url: "/api/v3/propertymappings/saml/?ordering=saml_name",
                method: "GET",
                status: 200,
                response: dummySAMLProviderMappings,
            },
            
        ],
    },
};

const LIGHT = "pf-t-light";
function injectTheme() {
    setTimeout(() => {
        if (!document.body.classList.contains(LIGHT)) {
            document.body.classList.add(LIGHT);
        }
    });
}

export default metadata;

const container = (testItem: TemplateResult) => {
    injectTheme();
    return html` <div style="background: #fff; padding: 1.0rem;">
        <style>
            li {
                display: block;
            }
            p {
                margin-top: 1em;
            }
        </style>
        ${testItem}
    </div>`;
};

export const DescribeApplication = () => {
    return container(
        html`<ak-application-wizard-context>
            <ak-application-wizard-application-details></ak-application-wizard-application-details>
            <hr />
            <ak-application-context-display-for-test></ak-application-context-display-for-test>
        </ak-application-wizard-context>`,
    );
};

export const ChooseAuthMethod = () => {
    return container(
        html`<ak-application-wizard-context>
            <ak-application-wizard-authentication-method-choice></ak-application-wizard-authentication-method-choice>
            <hr />
            <ak-application-context-display-for-test></ak-application-context-display-for-test>
        </ak-application-wizard-context>`,
    );
};

export const ConfigureLdap = () => {
    return container(
        html`<ak-application-wizard-context>
            <ak-application-wizard-authentication-by-ldap></ak-application-wizard-authentication-by-ldap>
            <hr />
            <ak-application-context-display-for-test></ak-application-context-display-for-test>
        </ak-application-wizard-context>`,
    );
};

export const ConfigureOauth2 = () => {
    return container(
        html`<ak-application-wizard-context>
            <ak-application-wizard-authentication-by-oauth></ak-application-wizard-authentication-by-oauth>
            <hr />
            <ak-application-context-display-for-test></ak-application-context-display-for-test>
        </ak-application-wizard-context>`,
    );
};

export const ConfigureReverseProxy = () => {
    return container(
        html`<ak-application-wizard-context>
            <ak-application-wizard-authentication-for-reverse-proxy></ak-application-wizard-authentication-for-reverse-proxy>
            <hr />
            <ak-application-context-display-for-test></ak-application-context-display-for-test>
        </ak-application-wizard-context>`,
    );
};

export const ConfigureSingleForwardProxy = () => {
    return container(
        html`<ak-application-wizard-context>
            <ak-application-wizard-authentication-for-single-forward-proxy></ak-application-wizard-authentication-for-single-forward-proxy>
            <hr />
            <ak-application-context-display-for-test></ak-application-context-display-for-test>
        </ak-application-wizard-context>`,
    );
};

export const ConfigureSamlManually = () => {
    return container(
        html`<ak-application-wizard-context>
            <ak-application-wizard-authentication-by-saml-configuration></ak-application-wizard-authentication-by-saml-configuration>
            <hr />
            <ak-application-context-display-for-test></ak-application-context-display-for-test>
        </ak-application-wizard-context>`,
    );
};


export const SamlImport = () => {
    return container(
        html`<ak-application-wizard-context>
            <ak-application-wizard-authentication-by-saml-import></ak-application-wizard-authentication-by-saml-import>
            <hr />
            <ak-application-context-display-for-test></ak-application-context-display-for-test>
        </ak-application-wizard-context>`,
    );
};
