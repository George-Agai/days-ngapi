import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface AnimationProps {
    animationPath: string;
    style?: React.CSSProperties;
    speed?: number
}

const Animation: React.FC<AnimationProps> = (props) => {
    const { animationPath, style, speed } = props;

    return (
        <DotLottieReact
            src={animationPath}
            loop
            autoplay
            style={style}
            speed={speed}
            className='animals'
        />
    );
};

export default Animation