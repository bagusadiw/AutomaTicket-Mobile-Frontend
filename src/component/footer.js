import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
export default class FooterTabs extends Component {
  render() {
    return (
      <Footer>
        <FooterTab style={{backgroundColor: '#4267b2'}}>
          <Button vertical>
            <Icon name="home" />
            <Text>Home</Text>
          </Button>
          <Button vertical>
            <Icon name="apps" />
            <Text>Category</Text>
          </Button>
          <Button vertical>
            <Icon name="person" />
            <Text>Account</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}