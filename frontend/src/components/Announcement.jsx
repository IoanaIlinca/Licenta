import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

const Container = styled.div`
  background-color: darkgrey;
  color: white;
  height: 30px;
  display: flex;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  position: relative;
`

class Announcement extends PureComponent {
    render() {
        return (
            <Container>
                Super deal!
            </Container>
        );
    }
}

Announcement.propTypes = {};

export default Announcement;