// pages/index.js or pages/index.tsx (or whichever file you are using for the page)
import React, { Component } from 'react';
import factory from '../ethereum/factory';
import { Button, Card } from 'semantic-ui-react';
import Layout from '../components/layout';
import { Link } from '../routes';

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
          ></link>
          <h3>Open Campaigns</h3>
          {this.renderCampaigns()}
          <Link route="/campaigns/new" legacyBehavior={true}>
            <a>
              <Button
                floated="right"
                content="Create Campaign"
                icon="add circle"
                primary
              />
            </a>
          </Link>
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex; // Ensure the component is exported as default
