import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface AnimationProps {
    animationPath: string;
    style?: React.CSSProperties;
}

const Animation: React.FC<AnimationProps> = (props) => {
    const { animationPath, style } = props;

    return (
        <DotLottieReact
            src={animationPath}
            loop
            autoplay
            style={style}
            speed={1.4}
            className='animals'
        />
    );
};

export default Animation