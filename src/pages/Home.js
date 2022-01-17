import SimplePlane from "../components/SimplePlane"
import { HomePage, SimplePlaneContainer, H2, H1 } from "./home.style"

const Home = () => {
    return (
        <>
            <HomePage>
                <H2>Hover over the image</H2>
                <SimplePlaneContainer>
                    <SimplePlane />
                    <H1>curtain</H1>
                </SimplePlaneContainer>
            </HomePage>
        </>
    )
}

export default Home
