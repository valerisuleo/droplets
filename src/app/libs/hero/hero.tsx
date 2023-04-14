import { IHero } from './interfaces';
import HeroContainer from './hero-styles';

const Hero = ({ variant, imageSrc, backgroundColor, children }: IHero) => {
    return (
        <HeroContainer
            variant={variant}
            imageSrc={imageSrc}
            backgroundColor={backgroundColor}
        >
            {children}
        </HeroContainer>
    );
};

export default Hero;
