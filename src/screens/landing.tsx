import { useState, useEffect } from "react";
import { formatDistanceToNow } from 'date-fns';
import axios from "axios";
import BottomSheet from "../components/bottomsheet";
import ResetBottomSheet from "../components/resetcount";
import Popup from "../components/popup";
import Dotlottieanimation from "../components/dotlottieanimation.tsx"
import logo from "../assets/images/logo.svg"
import avatar from "../assets/avatars/avatar8.png"
import { url } from "../constants/url"
import { splitTimeClean } from "../constants/functions.tsx";
const animals = "/animations/animals.lottie"


type userCallbackObject = {
    username: string,
    description: string,
    target: string,
    avatar: string,
    startDate: Date,
    token: string,
}

function Landing() {
    const readFromLocalStorage = (key: string) => {
        const value = localStorage.getItem(key);
        return JSON.parse(value || "null");
    };

    const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);
    const [isResetBottomSheetOpen, setResetBottomSheetOpen] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [timeClean, setTimeClean] = useState('');
    const [startDateFound, setStartDateFound] = useState(false)
    const [resetButtonClicked, setResetButtonClicked] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [avatarName, setAvatarName] = useState<string | null>(null);
    const [description, setDescription] = useState<string>("")
    const [targetDetails, setTargetDetails] = useState<{
        target: string;
        startDate: Date;
    } | undefined>(undefined);
    const [token, setToken] = useState(readFromLocalStorage('daysngapi_oxbz'))

    let neverTrue = false;

    if(neverTrue){
        setToken("Token")
    }

    const userCreatedCallback = (data: userCallbackObject) => {
        setAvatarName(data.avatar)
        setIsAuthenticated(true)
        setDescription(data.description)
        setTargetDetails({
            target: data.target,
            startDate: data.startDate
        })
        setStartDateFound(true)
        setStartTime(data.startDate)
    }

    const deleteAllLocalStorageItems = () => {
        localStorage.removeItem("daysngapi_token")
        localStorage.removeItem("cleanStartTime")
        localStorage.removeItem("mock_user")
        localStorage.removeItem("daysngapi_oxbz")
    }

    // const countRef = useRef(0);

    useEffect(() => {
        // if (countRef.current > 0) return;
        // countRef.current += 1;
        // console.log("UseEffect called maybe because token changed")

        const fetchData = async () => {
            try {
                if (token == null) {
                    setIsAuthenticated(false)
                    return;
                }

                else if (token) {
                    const time = new Date(token.startDate)
                    setAvatarName(token.avatar)
                    setIsAuthenticated(true)
                    setDescription(token.description)
                    setTargetDetails({
                        target: token.target,
                        startDate: time
                    })
                    setStartDateFound(true)
                    setStartTime(time)
                    return;
                }
            }
            catch (error) {
                console.error(error);
            }
        };
        fetchData();

    }, [token]);
    // console.log(token)

    const saveToLocalStorage = (key: string, value: any) => {
        localStorage.setItem(key, JSON.stringify(value));
    }

    const handleStart = async () => {
        setBottomSheetOpen(true)
    };

    const handleReset = async () => {
        // deleteAllLocalStorageItems()

        //We must authenticate first
        //Then delete from LS and save fresh ones
        if (token) {
            const tokenAuthenticationPayload = await axios.get(`${url}/authentication`, {
                headers: {
                    'Authorization': `${token.token}`,
                },
            });

            if (tokenAuthenticationPayload.data.message == "Invalid token") {
                console.log("Invalid token")
                return;
            }
            else if (tokenAuthenticationPayload.data.message == "Access granted") {
                const userId = tokenAuthenticationPayload.data.user

                await axios.post(`${url}/reset`, userId)
                    .then((res) => {
                        if (res.data.message == "Date reset successfully") {
                            setResetButtonClicked(true)
                            setResetBottomSheetOpen(true)

                            const updatedUser = res.data.updatedUser

                            setAvatarName(updatedUser.avatar)
                            setIsAuthenticated(true)
                            setDescription(updatedUser.description)
                            setTargetDetails({
                                target: updatedUser.target,
                                startDate: updatedUser.startDate
                            })
                            setStartDateFound(true)
                            // setStartTime(updatedUser.startDate)
                            const time = new Date(updatedUser.startDate)
                            setStartTime(time)

                            const newUpdatedUser = {
                                username: updatedUser.username,
                                description: updatedUser.description,
                                target: updatedUser.target,
                                avatar: updatedUser.avatar,
                                startDate: time,
                                token: token.token
                            }
                            // console.log("newUpdatedUser after reset -->", newUpdatedUser)

                            deleteAllLocalStorageItems()

                            saveToLocalStorage('daysngapi_oxbz', newUpdatedUser);
                        }
                        else if (res.data.message == "Something went wrong") {
                            alert("Something went wrong")
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
            else if (tokenAuthenticationPayload.data.message == "Access denied. No token provided") {
                console.log("Access denied. No token provided");
                setIsAuthenticated(false);
            }
            else alert("Something went wrong")
        }
        else alert("Nothing to reset fam")
    }

    const handleResetBottomSheetClosed = () => {
        setResetButtonClicked(false)
        setResetBottomSheetOpen(false)
    }

    useEffect(() => {
        if (!startTime) return;
        const interval = setInterval(() => {
            const now = new Date();
            const diffSeconds = Math.floor((now.getTime() - startTime.getTime()) / 1000);

            if (diffSeconds < 60) {
                setTimeClean(`${diffSeconds} second${diffSeconds === 1 ? '' : 's'}`);
            } else {
                let distance = formatDistanceToNow(startTime, { addSuffix: false });
                // Remove words: about, over, almost
                distance = distance.replace(/\b(about|over|almost)\s*/gi, '');
                setTimeClean(distance);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [startTime]);

    const { value, unit } = splitTimeClean(timeClean);

    return (
        <div className="flex-column-align-center-justify-between main-container">

            {avatarName ?
                <div className="flex-justify-between width100 navbar">
                    <img src={logo} alt="image" style={{ width: "55px" }} />
                    <img src={avatarName} alt="image" style={{ width: "38px", border: "2px solid #867070", borderRadius: '50%' }} />
                </div> :
                <div className="flex-justify-between width100 navbar">
                    <img src={logo} alt="image" style={{ width: "55px" }} />
                    <img src={avatar} alt="image" style={{ width: "38px", border: "2px solid #867070", borderRadius: '50%' }} />
                </div>
            }

            <div className="animal-animation-container flex-align-center">
                <Dotlottieanimation animationPath={animals} speed={1.8} />
            </div>

            {startDateFound ?
                <div className="flex-column-align-center duration-landing" onClick={() => setIsPopupOpen(true)}>
                    <h1 className="number">{value}</h1>
                    <p className="days">{unit}</p>
                    <p className="description">{description} free</p>
                </div>
                :
                <div className="flex-column-align-center duration-landing" onClick={() => setIsPopupOpen(true)}>
                    <h1 className="number">0</h1>
                    <p className="days">seconds</p>
                    <p className="description">Nothing yet</p>
                </div>}

            {isPopupOpen && <Popup targetDetails={targetDetails} isOpen={isPopupOpen} startDateFound={startDateFound} timeClean={timeClean} onClose={() => setIsPopupOpen(false)} />}

            <div className="flex-column-align-center width100">
                <button onClick={() => handleStart()}>Start</button>
                <button className="reset-button" onClick={handleReset}>Reset</button>
            </div>

            <BottomSheet
                isOpen={isBottomSheetOpen}
                startDateFound={startDateFound}
                timeClean={timeClean}
                isAuthenticated={isAuthenticated}
                onClose={() => setBottomSheetOpen(false)}
                userCreatedCallback={userCreatedCallback}
            />

            <ResetBottomSheet
                isOpen={isResetBottomSheetOpen}
                startDateFound={startDateFound}
                timeClean={timeClean}
                resetButtonClicked={resetButtonClicked}
                onClose={handleResetBottomSheetClosed}
            />
        </div>
    )
}

export default Landing