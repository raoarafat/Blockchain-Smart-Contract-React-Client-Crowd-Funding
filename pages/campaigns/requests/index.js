import React, { Component } from 'react';
import Layout from '../../../components/layout';
import Link from 'next/link';
import Campaign from '../../../ethereum/campaign';
import { Button, Table } from 'semantic-ui-react';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component {
  async getInitialProps() {
    console.log('getInitialProps');
    const { address } = this.props.query;
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestCount().call();
    const approversCount = await campaign.methods.approversCount().call();

    const requests = await Promise.all(
      Array(requestCount)
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        })
    );

    return { address, requests, requestCount, approversCount };
  }

  renderRows() {
    if (!this.props.requests || this.props.requests.length === 0) {
      return null; // Or you could return a placeholder or message if no requests are found
    }

    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={this.props.address}
          approversCount={this.props.approversCount}
        />
      );
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <h3>Requests</h3>
        {this.props.address && (
          <Link route={`/campaigns/${this.props.address}/requests/new`}>
            <Button primary floated="right" style={{ marginBottom: 10 }}>
              Add Request
            </Button>
          </Link>
        )}
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
        <div>Found {this.props.requestCount} requests.</div>
      </Layout>
    );
  }
}

export default RequestIndex;
