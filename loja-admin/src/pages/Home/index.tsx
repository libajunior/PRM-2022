import { useAuth } from "../../hook/useAuth"

export function HomePage() {

    const { user } = useAuth();

    return (
        <div id="home-page">
            <h1>Home Page</h1>

            <h3>{user?.email}</h3>
        </div>
    )
}