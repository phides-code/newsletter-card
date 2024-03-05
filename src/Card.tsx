import { useCallback, useState } from 'react';
import styled from 'styled-components';

interface CardProps {
    isMobile: boolean;
}

const Card = ({ isMobile }: CardProps) => {
    const [email, setEmail] = useState<string>('');
    const [checkbox, setCheckbox] = useState<boolean>(false);

    const mobile = isMobile.toString();

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        return emailRegex.test(email);
    };

    const disableButton: boolean = email == '' || !checkbox;

    const handleEmailChange = useCallback(
        (ev: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(ev.target.value);
        },
        []
    );

    const resetForm = useCallback(() => {
        setEmail('');
        setCheckbox(false);
    }, []);

    const handleCheckboxToggle = useCallback(
        (ev: React.ChangeEvent<HTMLInputElement>) => {
            setCheckbox(ev.target.checked);
        },
        []
    );

    const handleSubmit = useCallback(
        (ev: React.FormEvent<HTMLFormElement>) => {
            ev.preventDefault();

            let message = '';

            if (validateEmail(email)) {
                resetForm();
                message = 'Thank you!';
            } else {
                message = 'Invalid email';
            }

            window.alert(message);
        },
        [email, resetForm]
    );

    const Header = () => (
        <StyledHeader>Level Up Your Frontends Skills</StyledHeader>
    );

    const Subheader = () => (
        <StyledSubheader>
            Sign up for our free newsletter to receive weekly coding challenges
            that will help you improve DesktopWrapper frontend development
            skills.
        </StyledSubheader>
    );

    const DisclaimerText = () => (
        <StyledDisclaimerText>
            By checking this box, you agree to receive our weekly newsletter
            containing coding challenges, tips, and other related content. You
            may unsubscribe from the newsletter at any time
        </StyledDisclaimerText>
    );

    const SubscribeButton = () => (
        <StyledSubscribeButton type='submit' disabled={disableButton}>
            Subscribe
        </StyledSubscribeButton>
    );

    return (
        <Wrapper $mobile={mobile}>
            <Header />
            <Subheader />
            <FormContainer $mobile={mobile}>
                <form onSubmit={handleSubmit}>
                    <EmailForm $mobile={mobile}>
                        <EmailInput
                            type='email'
                            placeholder='Enter your email address'
                            onChange={handleEmailChange}
                            value={email}
                        />
                        {isMobile && <SmallGap />}
                        <SubscribeButton />
                    </EmailForm>
                    <Disclaimer>
                        <label>
                            <input
                                type='checkbox'
                                onChange={handleCheckboxToggle}
                                checked={checkbox}
                            />
                        </label>
                        <DisclaimerText />
                    </Disclaimer>
                </form>
            </FormContainer>
        </Wrapper>
    );
};

interface StyledComponentProps {
    $mobile: string;
}

const Wrapper = styled.div<StyledComponentProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 5px;
    max-width: 50rem;
    box-shadow: 6px 5px 0px 2px #f0f2fd;

    margin: ${(props) => (props.$mobile === 'true' ? '0 0.5rem' : '0 5rem')};
    padding: ${(props) =>
        props.$mobile === 'true' ? '0.5rem 1rem' : '2rem 4rem'};
`;

const StyledHeader = styled.div`
    font-size: x-large;
    text-align: center;
`;

const StyledSubheader = styled.div`
    text-align: center;
    font-size: small;
    margin: 0.8rem 0;
`;

const FormContainer = styled.div<StyledComponentProps>`
    margin: ${(props) => (props.$mobile === 'true' ? undefined : '0 1rem')};
`;

const SmallGap = styled.div`
    padding: 0.2rem 0;
`;

const EmailForm = styled.div<StyledComponentProps>`
    display: ${(props) => (props.$mobile === 'true' ? 'flex' : 'grid')};
    grid-template-columns: ${(props) =>
        props.$mobile === 'true' ? undefined : '3fr 1fr'};
    gap: ${(props) => (props.$mobile === 'true' ? undefined : '1rem')};
    flex-direction: ${(props) =>
        props.$mobile === 'true' ? 'column' : undefined};
    align-items: center;
    margin: 0 0 0.6rem 0;
    min-height: ${(props) => (props.$mobile === 'true' ? undefined : '2.8rem')};
`;

const EmailInput = styled.input`
    border: 1px solid lightgrey;
    border-radius: 5px;
    width: calc(100% - 0.5rem);
    padding: 1rem 0 1rem 0.5rem;
    &:hover {
        border: 1px solid blue;
    }
`;

const StyledSubscribeButton = styled.button`
    width: 100%;
    color: white;
    background-color: black;
    border-radius: 5px;
    border: none;
    padding: 1rem 1rem;
    &:hover {
        background-color: blue;
    }
    &:disabled {
        background-color: darkgray;
    }
`;

const Disclaimer = styled.div`
    width: 100%;
    display: flex;
`;

const StyledDisclaimerText = styled.span`
    margin-left: 0.4rem;
    font-size: x-small;
`;

export default Card;
