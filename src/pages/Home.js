import { useState } from "react"
import SimplePlane from "../components/SimplePlane"
import { HomePage, SimplePlaneContainer, H2, H1 } from "./home.style"

const Home = () => {

    return (
        <>
            <HomePage>
                <H2>Move the mouse</H2>
                <SimplePlaneContainer>
                    <SimplePlane />
                    <H1>curtain</H1>
                </SimplePlaneContainer>
            </HomePage>
        </>
    )
}

export default Home
