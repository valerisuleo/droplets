import styled from 'styled-components';

const HeroContainer = styled.div<{
    variant: string;
    imageSrc?: string;
    backgroundColor?: string;
}>`
    background-color: ${({ variant, backgroundColor }) =>
        variant === 'background' ? backgroundColor : 'transparent'};
    background-image: ${({ variant, imageSrc }) =>
        variant === 'image' && `url(${imageSrc})`};
    background-size: cover;
    background-position: center;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50vh;
    padding: 0 20px;
`;

export default HeroContainer;
