import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface AnimationProps {
    animationPath: string;
    style?: React.CSSProperties;
    speed?: number
    loop?: boolean
}

const Animation: React.FC<AnimationProps> = (props) => {
    const { animationPath, style, speed, loop } = props;

    return (
        <DotLottieReact
            src={animationPath}
            loop ={loop ? loop : false}
            autoplay
            style={style}
            speed={speed}
            className='animals'
        />
    );
};

export default Animation