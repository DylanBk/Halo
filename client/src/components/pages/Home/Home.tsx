import Header from "../../layout/Header";
import Feed from "../../layout/Feed";
import { useEffect } from "react";

const Home = () => {
    useEffect(() => {
        document.title = 'Halo - Your Feed'
    }, []);

    return (
        <div>
            <title>Halo - Your Feed</title>
            <Header />

            <main className="flex flex-col items-center py-8 pt-28">
                <Feed />
            </main>
        </div>
    );
};

export default Home;