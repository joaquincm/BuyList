import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import ContentPasteIcon from 'material-ui/svg-icons/content/content-paste'
import MailIcon from 'material-ui/svg-icons/content/mail'
import FlatButton from 'material-ui/FlatButton'
import styled, { keyframes } from "styled-components"

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate360} 2s linear infinite;`;


export const TopBar = () => (
    <div>
        <AppBar style={styles.appBar} title={<span>Buy List</span>}

            iconElementLeft={
                <IconButton>
                    <Rotate>
                        <ContentPasteIcon style={styles.icono} />
                    </Rotate>
                </IconButton>
            }

            iconElementRight={
                <IconButton>
                    <MailIcon />
                </IconButton>
            }
        />
    </div>
)

const styles = {
    appBar: {
        textAlign: 'left'
    },
    icono: {
        color: 'white !important'
    }
}