import { Body, Button, Container, Column, Head, Heading, Hr, Html, Img, Link, Preview, Row, Section, Text } from '@react-email/components';
import * as React from 'react';
import TwContainer from '../components/twContainer';
import config from '../config';

  
export const AuthCodeEmail = ({

    code,

}) => {

    const previewText = `Verify your email`;
    
    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <TwContainer>
            
                <Body className="bg-white my-auto mx-auto font-sans">
                    <Container className="border border-solid border-[#eaeaea] rounded-[0.7rem] my-[40px] mx-auto p-[20px] w-[465px] text-center">

                        <Img className="mx-auto w-24 mb-8" src="/logo.png" alt="Tip.dev Logo" />

                        <Text className="text-black text-[32px] leading-[24px] font-bold">
                            Verify your email
                        </Text>

                        <Text className="text-zinc-500 text-[16px] leading-[12px]">
                            Please use the code below to continue on Tip.dev
                        </Text>

                        <Container className="border border-solid bg-zinc-100 font-code border-[#eaeaea] rounded-[0.7rem] my-[40px] mx-auto p-[20px] w-[465px] text-center">
                            <Text className="text-black text-[32px] leading-[24px]">
                                {code}
                            </Text>
                        </Container>

                    </Container>
                </Body>

            </TwContainer>
        </Html>
    );
};
  
export default AuthCodeEmail;