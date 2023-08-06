The Satosa Auth0 Action is used to present users that login through Auth0 to acknowledge a document before accessing your service. This is particularly useful for presenting legal documents, like terms of service, to your users upon login and collecting a record of their acknowledgement.

## Prerequisites

1. An Auth0 account and tenant. [Sign up for free](https://auth0.com/signup).
2. An account with Satosa. [Sign up for free](https://satosa.com)
3. A document in Satosa you want to collect acknowledgement for. [Read our getting started guide](https://docs.satosa.com)

## Set up Satosa

To configure the integration with Satosa

1. [Create an Organization](https://docs.satosa.com/docs/getting-started/#creating-your-organization)
2. [Create a Document](https://docs.satosa.com/docs/getting-started/#creating-your-first-document)
3. [Configure your Action](https://docs.satosa.com/docs/getting-started/#creating-your-first-document)

## Add the Auth0 Action

**Note:** Once the Action is successfully deployed, all logins for your tenant will be processed by this integration. Before activating the integration in production, [install and verify this Action on a test tenant](https://auth0.com/docs/get-started/auth0-overview/create-tenants/set-up-multiple-environments).

1. Select **Add Integration** (at the top of this page).
1. Read the necessary access requirements, and select **Continue**.
1. Configure the integration using the following fields:
    * [Auth0 Custom Domain](https://auth0.com/docs/customize/custom-domains)
        * *Note: Only if you're using custom domains for Auth0* 
    * Auth0 Domain
    * Callback URL
        * A URL to send your users to after acknowledging your document
        * This will default to continue login
    * [Satosa Organization ID](https://docs.satosa.com/docs/getting-started#hosting-your-document)
    * [Satosa Document ID](https://docs.satosa.com/docs/getting-started#hosting-your-document)
    * Satosa Service URL
        * Will just default to the public Satosa API
    * Satosa Hosted URL
        * Will just default to the public Satosa Hosted Document Page
1. Add the integration to your Library by selecting **Create**.
1. In the modal that appears, select the **Add to flow** link.
1. Drag the Action into the desired location in the flow.
1. Select **Apply Changes**.

## Results

Learn about how Satosa collected your users' interactions with your documents here:
[https://docs.satosa.com/docs/getting-started#collecting-user-interactions](https://docs.satosa.com/docs/getting-started#collecting-user-interactions)

## Troubleshooting

Refer to our docs for additional information about troubleshooting:
[https://docs.satosa.com](https://docs.satosa.com/docs/getting-started#hosting-your-document)
